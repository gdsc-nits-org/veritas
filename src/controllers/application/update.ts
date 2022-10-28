import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";
import { InterviewApplicationStatus } from "@prisma/client";

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description updates atrributes of the application with the given application id
 *
 */

const updateApplication: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  let { applicationStatus } =
    req.body as Interfaces.Application.updateApplicationBody;

  const applicationId = req.params.applicationId;

  applicationStatus = applicationStatus?.trim() as InterviewApplicationStatus;

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
    },
  });

  if (!application) {
    return next(Errors.Application.applicationNotFound);
  }

  const updatedApplication = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      applicationStatus: applicationStatus || application.applicationStatus,
    },
  });

  res.json(Success.Application.applicationUpdated(updatedApplication));
};

export { updateApplication };
