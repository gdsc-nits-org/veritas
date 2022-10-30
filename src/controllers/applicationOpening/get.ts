import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const getAllApplicationOpenings: Interfaces.Controller.Async = async (
  _req,
  res
) => {
  const applicationOpenings = await prisma.applicationOpening.findMany();

  res.json(
    Success.ApplicationOpening.sendManyApplicationOpenings(applicationOpenings)
  );
};

const getOneApplicationOpening: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { applicationOpeningId } = req.params;

  const applicationOpening = await prisma.applicationOpening.findFirst({
    where: {
      id: applicationOpeningId,
    },
    include: {
      applications: true,
    },
  });

  if (!applicationOpening) {
    return next(Errors.ApplicationOpening.applicationOpeningNotFound);
  }

  res.json(
    Success.ApplicationOpening.sendOneApplicationOpening(applicationOpening)
  );
};

export { getAllApplicationOpenings, getOneApplicationOpening };
