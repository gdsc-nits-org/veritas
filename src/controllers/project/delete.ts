import * as Errors from "@errors";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import { prisma } from "@utils/prisma";

const deleteProject: Interfaces.Controller.Async = async (req, res, next) => {
  const { id } = req.params;
  if (!(await prisma.project.findFirst({ where: { id } })))
    return next(Errors.Project.projectNotFound);
  //TODO:check authorisation
  const project = await prisma.project.delete({ where: { id } });
  if (!project) return res.json();
  return res.json(Utils.Response.Success(project));
};

export { deleteProject };
