import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";
import { ClubMember, Project } from "@prisma/client";

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
  } = req.body as Project;
  const {
    contributors,
    mentors,
  }: { contributors: ClubMember; mentors: ClubMember } = req.body;

  if (!(await prisma.project.findFirst({ where: { name } })))
    return next(Errors.Project.projectNotFound);

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name,
      description,
      bannerImageUrl,
      logoImageUrl,
      status,
      tags,
      links,
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
