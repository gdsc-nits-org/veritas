import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";

const deleteProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { projectId } = req.params;
  if (!projectId) {
    return next(Errors.Project.invalidProjectId);
  }
  if (!(await prisma.project.findFirst({ where: { id: projectId } })))
    return next(Errors.Project.projectNotFound);

  const project = await prisma.project.delete({ where: { id: projectId } });
  if (!project) return res.json();
  return res.json(Utils.Response.Success(project));
};

export { deleteProject };
