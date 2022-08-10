import { projectNotFound, projectsFetchFail } from "@errors/project";
import success from "@success/success";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

export const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  if (!projects) return res.json(projectsFetchFail);
  return res.json(success(projects));
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return res.json(projectNotFound);
  return res.json(success(project));
};
