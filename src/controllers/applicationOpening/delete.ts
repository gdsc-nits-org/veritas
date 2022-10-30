import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const deleteApplciationOpening: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { applicationOpeningId } = req.params;

  const applicationOpeningExists = await prisma.applicationOpening.count({
    where: {
      id: applicationOpeningId,
    },
  });

  if (!applicationOpeningExists) {
    return next(Errors.ApplicationOpening.applicationOpeningNotFound);
  }

  await prisma.applicationOpening.delete({
    where: {
      id: applicationOpeningId,
    },
  });

  res.json(Success.ApplicationOpening.applicationOpeningDeleted);
};

export { deleteApplciationOpening };
