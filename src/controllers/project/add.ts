import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import { ClubMember, Project, Technology } from "@prisma/client";
import * as Interfaces from "@interfaces";

const createProject: Interfaces.Controller.Async = async (req, res, next) => {
  const {
    name,
    description,
    bannerImageUrl,
    logoImageUrl,
    status,
    tags,
    links,
  } = req.body as Project;

  const {
    contributors,
    mentors,
    technologies,
  }: {
    contributors: ClubMember;
    mentors: ClubMember;
    technologies: Technology[];
  } = req.body;

  if (!name || typeof name !== "string") {
    return next(Errors.Project.invalidName);
  }
  if (!description || typeof description !== "string") {
    return next(Errors.Project.invalidDescription);
  }
  if (
    !logoImageUrl ||
    typeof logoImageUrl !== "string" ||
    !Utils.Url.urlValidate(logoImageUrl)
  ) {
    return next(Errors.Project.invalidLogoImageURL);
  }
  if (
    !bannerImageUrl ||
    typeof bannerImageUrl !== "string" ||
    !Utils.Url.urlValidate(bannerImageUrl)
  ) {
    return next(Errors.Project.invalidBannerImageURL);
  }
  if (
    !status ||
    typeof status !== "string" ||
    !Utils.Project.validateProjectStatus(status)
  ) {
    return next(Errors.Project.invalidStatus);
  }
  if (
    !tags ||
    !Array.isArray(links) ||
    typeof links === "string" ||
    !tags.length ||
    tags.some((tag) => !Utils.Tag.tagValidate(tag))
  ) {
    return next(Errors.Project.invalidLink);
  }
  if (
    !links ||
    !Array.isArray(links) ||
    typeof links === "string" ||
    links.some((link) => !Utils.Url.urlValidate(link))
  ) {
    return next(Errors.Project.invalidLink);
  }

  if (
    technologies &&
    !(Array.isArray(technologies) && typeof technologies !== "string")
  ) {
    return next(Errors.Project.invalidTechnology);
  }

  for await (const technology of technologies) {
    if (!(await Utils.Technology.validateTechnology(technology))) {
      return next(Errors.Technology.technologyNotFound);
    }
  }

  if (mentors && !(Array.isArray(mentors) && typeof mentors !== "string")) {
    return next(Errors.Project.invalidMentorList);
  }
  for await (const mentor of mentors) {
    if (!(await Utils.ClubMember.validateClubMember(mentor))) {
      return next(Errors.Member.memberNotFound);
    }
  }

  if (
    contributors &&
    !(Array.isArray(contributors) && typeof contributors !== "string")
  ) {
    return next(Errors.Project.invalidContributorList);
  }
  for await (const contributor of contributors) {
    if (!(await Utils.ClubMember.validateClubMember(contributor))) {
      return next(Errors.Member.memberNotFound);
    }
  }

  if (await prisma.project.findFirst({ where: { name } }))
    return next(Errors.Project.projectExists);

  const project = await prisma.project.create({
    data: {
      name,
      description,
      bannerImageUrl,
      logoImageUrl,
      status,
      tags: tags.map((t) => t.toLowerCase()),
      links,
      contributors: {
        connect: contributors,
      },
      mentors: {
        connect: mentors,
      },
      technologies: {
        connect: technologies,
      },
    },
  });

  if (!project) {
    return next(Errors.Project.projectNotCreated);
  }

  return res.json(Utils.Response.Success(project));
};

export { createProject };
