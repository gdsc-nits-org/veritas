import * as Interfaces from "@interfaces";
import * as Success from "@success";
import * as Errors from "@errors";
import { prisma } from "@utils/prisma";

const deleteApplication: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const applicationId = req.params.applicationId as string;

  const applicationExists = await prisma.application.count({
    where: {
      id: applicationId,
    },
  });

  if (!applicationExists) {
    return next(Errors.Application.applicationNotFound);
  }

  await prisma.application.delete({
    where: {
      id: applicationId,
    },
  });

  res.json(Success.Application.applicationDeleted);
};

export { deleteApplication };
