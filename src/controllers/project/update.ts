import { projectNotFound, projectUpdateFail } from "@errors/project";
import { prisma } from "@utils/prisma";
import { ClubMember, Prisma, Project } from "@prisma/client";
import { Request, Response } from "express";
import success from "@success/success";

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
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
    return res.json(projectNotFound);

  const project = await prisma.project.update({
    where: { id },
    data: {
      name,
      description,
      bannerImageUrl,
      logoImageUrl,
      status,
      tags,
      links,
      contributors: {
        connect: contributors,
      },
      mentors: {
        connect: mentors,
      },
    },
  });
  if (!project) return res.json(projectUpdateFail);

  return res.json(success(project));
};
