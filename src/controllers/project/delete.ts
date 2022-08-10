import { projectNotFound } from "@errors/project";
import success from "@success/success";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!(await prisma.project.findFirst({ where: { id } })))
    return res.json(projectNotFound);
  //TODO:check authorisation
  const project = await prisma.project.delete({ where: { id } });
  if (!project) return res.json();
  return res.json(success(project));
};
