import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";
import { Interview } from "@prisma/client";

const getAllProjects: Interfaces.Controller.Async = async (req, res, next) => {
  const { minimal } = req.query;
  let projects;

  if (typeof minimal === "string") {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        logoImageUrl: true,
      },
    });
  } else {
    projects = await prisma.project.findMany({
      include: {
        technologies: true,
        mentors: Utils.Project.displayableMemberDetails,
        contributors: Utils.Project.displayableMemberDetails,
      },
    });
  }

  if (!projects) return next(Errors.Project.projectsFetchFail);
  return res.json(Utils.Response.Success(projects));
};

const getProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { projectId } = req.params;

  if (!projectId) {
    return next(Errors.Project.invalidProjectId);
  }
  const project = await prisma.project.findFirst({
    where: { id: projectId },
    include: {
      technologies: true,
      mentors: Utils.Project.displayableMemberDetails,
      contributors: Utils.Project.displayableMemberDetails,
    },
  });
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

  const project = await prisma.project.findFirst({ where: { id: projectId } });
  if (!project) return next(Errors.Project.projectNotFound);

  const sessions = await prisma.interviewSession.findMany({
    where: { projectId },
    include: {
      interviewApplications: true,
    },
  });

  if (!sessions) return next(Errors.Session.sessionNotFound);

  sessions.forEach((session) => {
    applications.concat(session.interviewApplications);
  });

  return res.json(Utils.Response.Success(applications));
};

export { getAllProjects, getProject, getProjectApplications };
