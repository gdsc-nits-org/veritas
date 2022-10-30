import * as Interfaces from "@interfaces";
import * as Success from "@success";
import * as Errors from "@errors";
import { prisma } from "@utils/prisma";

const getallApplications: Interfaces.Controller.Async = async (_req, res) => {
  const applications = await prisma.application.findMany();

  res.json(Success.Application.sendApplications(applications));
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
      applicationOpening: true,
    },
  });

  if (!application) {
    return next(Errors.Application.applicationNotFound);
  }

  res.json(Success.Application.sendOneApplication(application));
};

const getLoggedInUsersApplication: Interfaces.Controller.Async = async (
  req,
  res
) => {
  const { adminScholarId } = req.body as Interfaces.Auth.SigninBody;

  const applications = await prisma.application.findMany({
    where: {
      applicantId: adminScholarId,
    },
    include: {
      interviews: true,
    },
  });

  res.json(Success.Application.sendApplications(applications));
};

export { getallApplications, getOneApplication, getLoggedInUsersApplication };
