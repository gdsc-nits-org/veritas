import { projectExists, projectNotCreated } from "@errors/project";
import { prisma } from "@utils/prisma";
import { ClubMember, Project } from "@prisma/client";
import { Request, Response } from "express";
import success from "@success/success";

export const createProject = async (req: Request, res: Response) => {
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

  if (await prisma.project.findFirst({ where: { name } }))
    return res.json(projectExists);

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
  if (!project) return res.json(projectNotCreated);

  return res.json(success(project));
};
