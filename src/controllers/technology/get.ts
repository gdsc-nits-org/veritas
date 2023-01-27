import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import * as Interfaces from "@interfaces";

const getAllTechnologies: Interfaces.Controller.Async = async (
  _req,
  res,
  next
) => {
  const technologies = await prisma.technology.findMany();

  if (!technologies) {
    return next(Errors.Technology.technologyNotFound);
  }
  return res.json(Utils.Response.Success(technologies));
};

const getTechnologyByNameOrId: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { technologyNameOrId: nameOrId } = req.params;
  if (!nameOrId) {
    return next(Errors.Technology.invalidName);
  }

  const technology = await prisma.technology.findFirst({
    where: {
      OR: [{ id: nameOrId }, { name: nameOrId }],
    },
  });

  if (!technology) {
    return next(Errors.Technology.technologyNotFound);
  }
  return res.json(Utils.Response.Success(technology));
};

const getTechnologyByProjectId: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { projectId } = req.params;

  if (!projectId || typeof projectId !== "string") {
    return next(Errors.Project.invalidProjectId);
  }

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    include: {
      technologies: true,
    },
  });
  if (!project) return next(Errors.Project.projectNotFound);

  const technologies = project.technologies;

  if (!technologies) {
    return next(Errors.Technology.technologyNotFound);
  }
  return res.json(Utils.Response.Success(technologies));
};

export {
  getAllTechnologies,
  getTechnologyByNameOrId,
  getTechnologyByProjectId,
};
