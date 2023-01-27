import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";
import { ClubMember, Project, Technology } from "@prisma/client";

export const updateProject: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { projectId } = req.params;
  const {
    name,
    description,
    bannerImageUrl,
    logoImageUrl,
    status,
    tags,
    links,
    domains,
  } = req.body as Project;
  const {
    technologies,
    contributors,
    mentors,
  }: {
    technologies: Technology;
    contributors: ClubMember;
    mentors: ClubMember;
  } = req.body;

  if (!(await prisma.project.findFirst({ where: { id: projectId } })))
    return next(Errors.Project.projectNotFound);
  // --- checks----
  if (name !== undefined && (typeof name !== "string" || !name.length)) {
    return next(Errors.Project.invalidName);
  }
  if (
    description !== undefined &&
    (typeof description !== "string" || description.length)
  ) {
    return next(Errors.Project.invalidDescription);
  }
  if (
    logoImageUrl !== undefined &&
    (typeof logoImageUrl !== "string" || !Utils.Url.urlValidate(logoImageUrl))
  ) {
    return next(Errors.Project.invalidLogoImageURL);
  }
  if (
    bannerImageUrl !== undefined &&
    (typeof bannerImageUrl !== "string" ||
      !Utils.Url.urlValidate(bannerImageUrl))
  ) {
    return next(Errors.Project.invalidBannerImageURL);
  }

  if (status !== undefined && !Utils.Project.validateProjectStatus(status)) {
    return next(Errors.Project.invalidStatus);
  }

  // ---- array checks ---
  if (
    tags !== undefined &&
    (!tags.length ||
      !Array.isArray(links) ||
      typeof links === "string" ||
      !tags.length ||
      tags.some((tag) => !Utils.Tag.tagValidate(tag)))
  ) {
    return next(Errors.Project.invalidTag);
  }
  if (
    links !== undefined &&
    (!Array.isArray(links) ||
      !links.length ||
      typeof links === "string" ||
      links.some((link) => !Utils.Url.urlValidate(link)))
  ) {
    return next(Errors.Project.invalidLink);
  }
  if (
    domains !== undefined &&
    (!Array.isArray(domains) ||
      !domains.length ||
      typeof domains === "string" ||
      domains.some((domain) => !Utils.Domain.validateDomain(domain)))
  ) {
    return next(Errors.Domain.invalidDomain);
  }
  // ---- relations check -----
  if (
    technologies !== undefined &&
    !(Array.isArray(technologies) && typeof technologies !== "string")
  ) {
    return next(Errors.Project.invalidTechnology);
  }

  if (technologies) {
    for await (const technology of technologies) {
      if (!(await Utils.Technology.validateTechnology(technology))) {
        return next(Errors.Technology.technologyNotFound);
      }
    }
  }

  if (
    mentors !== undefined &&
    !(Array.isArray(mentors) && typeof mentors !== "string")
  ) {
    return next(Errors.Project.invalidMentorList);
  }
  if (mentors) {
    for await (const mentor of mentors) {
      if (!(await Utils.ClubMember.validateClubMember(mentor))) {
        return next(Errors.Member.memberNotFound);
      }
    }
  }

  if (
    contributors !== undefined &&
    !(Array.isArray(contributors) && typeof contributors !== "string")
  ) {
    return next(Errors.Project.invalidContributorList);
  }
  if (contributors) {
    for await (const contributor of contributors) {
      if (!(await Utils.ClubMember.validateClubMember(contributor))) {
        return next(Errors.Member.memberNotFound);
      }
    }
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name,
      description,
      bannerImageUrl,
      logoImageUrl,
      status,
      tags,
      domains,
      links,
      technologies: {
        set: technologies,
      },
      contributors: {
        set: contributors,
      },
      mentors: {
        set: mentors,
      },
    },
  });

  if (!project) {
    return next(Errors.Project.projectUpdateFail);
  }

  return res.json(Utils.Response.Success(project));
};
