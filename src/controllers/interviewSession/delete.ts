import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const deleteInterviewSession: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { interviewSessionId } = req.params;

  const interviewSessionExists = await prisma.interviewSession.count({
    where: {
      id: interviewSessionId,
    },
  });

  if (!interviewSessionExists) {
    return next(Errors.InterviewSession.interviewSessionNotFound);
  }

  await prisma.interviewSession.delete({
    where: {
      id: interviewSessionId,
    },
  });

  res.json(Success.InterviewSession.sessionDeleted);
};

export { deleteInterviewSession };
