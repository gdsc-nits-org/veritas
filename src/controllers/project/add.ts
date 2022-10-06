import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import { ClubMember, Project } from "@prisma/client";
import * as Interfaces from "@interfaces";

const createProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { name, description, bannerImageUrl, logoImageUrl, status, tags, links } =
    req.body as Project;

  const { contributors, mentors }: { contributors: ClubMember; mentors: ClubMember } = req.body;

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
    },
  });

  if (!project) {
    return next(Errors.Project.projectNotCreated);
  }

  return res.json(Utils.Response.Success(project));
};

export { createProject };
