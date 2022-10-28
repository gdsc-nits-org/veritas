import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";
import { Interview } from "@prisma/client";

const getAllProjects: Interfaces.Controller.Async = async (_req, res, next) => {
  const projects = await prisma.project.findMany();
  if (!projects) return next(Errors.Project.projectsFetchFail);
  return res.json(Utils.Response.Success(projects));
};

const getProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { projectId } = req.params;
  console.log(req.path);
  if (!projectId) {
    return next(Errors.Project.invalidProjectId);
  }
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    return next(Errors.Project.projectNotFound);
  }
  return res.json(Utils.Response.Success(project));
};

const getProjectApplications: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { projectId } = req.params;
  const applications: Interview[] = [];

  if (!projectId) {
    return next(Errors.Project.invalidProjectId);
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return next(Errors.Project.projectNotFound);

  const sessions = await prisma.interviewSession.findMany({
    where: { projectId },
    include: {
      interviewApplications: true,
    },
  });
  //TODO: replace with sessesion error
  if (!sessions) return next(Errors.Session.sessionNotFound);

  sessions.forEach((session) => {
    applications.concat(session.interviewApplications);
  });

  return res.json(Utils.Response.Success(applications));
};

export { getAllProjects, getProject, getProjectApplications };
