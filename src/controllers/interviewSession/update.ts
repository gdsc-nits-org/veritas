import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

import { Mode } from "@prisma/client";
import { prisma } from "@utils/prisma";

const updateInterviewSession: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  let { mode, questions, url, venue } =
    req.body as Interfaces.InterviewSession.updateInterviewSessionBody;
  const { interviewDate } =
    req.body as Interfaces.InterviewSession.updateInterviewSessionBody;

  const { interviewSessionId } = req.params;

  mode = mode?.trim() as Mode;
  url = url?.trim();
  venue = venue?.trim();

  questions = questions?.map((question) => question.trim());

  const interviewSession = await prisma.interviewSession.count({
    where: {
      id: interviewSessionId,
    },
  });

  if (!interviewSession) {
    return next(Errors.InterviewSession.applicationNotFound);
  }

  const updatedInterviewSession = await prisma.interviewSession.update({
    where: {
      id: interviewSessionId,
    },
    data: {
      mode,
      url,
      interviewDate: interviewDate && new Date(interviewDate),
      questions,
      venue,
    },
  });

  res.json(Success.InterviewSession.sendOneSession(updatedInterviewSession));
};

export { updateInterviewSession };
