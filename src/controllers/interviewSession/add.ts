import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

import { Mode } from "@prisma/client";
import { prisma } from "@utils/prisma";

const createInterviewSession: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  let { mode, questions, url, venue } =
    req.body as Interfaces.InterviewSession.createInterviewSessionBody;

  const { interviewDate } =
    req.body as Interfaces.InterviewSession.createInterviewSessionBody;

  const { applicationId } = req.params;

  if (!interviewDate || !mode || !venue || !questions) {
    return next(Errors.InterviewSession.missingFields);
  }

  mode = mode.trim() as Mode;
  url = url?.trim();
  venue = venue.trim();

  questions = questions.map((question) => question.trim());

  const applicationsExists = await prisma.application.count({
    where: {
      id: applicationId,
    },
  });

  if (!applicationsExists) {
    return next(Errors.InterviewSession.applicationNotFound);
  }

  await prisma.interviewSession.create({
    data: {
      interviewDate,
      mode,
      venue,
      questions,
      url,
      interviewApplication: {
        connect: {
          id: applicationId,
        },
      },
    },
  });

  res.json(Success.InterviewSession.sessionCreated);
};

export { createInterviewSession };
