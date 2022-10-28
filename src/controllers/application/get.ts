import * as Interfaces from "@interfaces";
import * as Success from "@success";
import * as Errors from "@errors";
import { prisma } from "@utils/prisma";

const getallApplications: Interfaces.Controller.Async = async (
  _req,
  res,
  _next
) => {
  const applications = await prisma.application.findMany();

  res.json(Success.Application.sendAllApplications(applications));
};

const getOneApplication: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const applicationId = req.params.applicationId as string;

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
    },
    include: {
      interviews: true,
    },
  });

  if (!application) {
    return next(Errors.Application.applicationNotFound);
  }

  res.json(Success.Application.sendOneApplication(application));
};

export { getallApplications, getOneApplication };
