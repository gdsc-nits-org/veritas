import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const getAllInterviewSessions: Interfaces.Controller.Async = async (
  _req,
  res
) => {
  const interviewSessions = await prisma.interviewSession.findMany();

  res.json(Success.InterviewSession.sendManySessions(interviewSessions));
};

const getOneInterviewSession: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { interviewSessionId } = req.params;

  const interviewSession = await prisma.interviewSession.findFirst({
    where: {
      id: interviewSessionId,
    },
  });

  if (!interviewSession) {
    return next(Errors.InterviewSession.interviewSessionNotFound);
  }

  res.json(Success.InterviewSession.sendOneSession(interviewSession));
};

export { getAllInterviewSessions, getOneInterviewSession };
