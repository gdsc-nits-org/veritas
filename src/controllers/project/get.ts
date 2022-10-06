import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";

const getAllProjects: Interfaces.Controller.Async = async (_req, res, next) => {
  const projects = await prisma.project.findMany();
  if (!projects) return next(Errors.Project.projectsFetchFail);
  return res.json(Utils.Response.Success(projects));
};

const getProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return next(Errors.Project.projectNotFound);
  return res.json(Utils.Response.Success(project));
};

export { getAllProjects, getProject };
