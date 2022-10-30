import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const createApplicaton: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const applicationBody: Interfaces.Application.createApplicatonBody = req.body;

  let { answers, applicationOpeningId, applicantId, message, resume } =
    applicationBody;

  if (!answers || !applicationOpeningId || !applicantId || !resume) {
    return next(Errors.Application.missingFields);
  }

  answers = answers.map((answer) => answer.trim());

  applicantId = applicantId.trim();
  applicationOpeningId = applicationOpeningId.trim();
  message = message?.trim();
  resume = resume.trim();

  const isStudent = await prisma.student.count({
    where: {
      scholarId: applicantId,
    },
  });

  if (!isStudent) {
    return next(Errors.Application.notAStudent);
  }

  const applicationOpeningExists = await prisma.applicationOpening.count({
    where: {
      id: applicationOpeningId,
    },
  });

  if (!applicationOpeningExists) {
    return next(Errors.Application.applicationOpeningNotFound);
  }

  const isClubMember = await prisma.clubMember.count({
    where: {
      scholarId: applicantId,
    },
  });

  if (isClubMember) {
    return next(Errors.Application.isClubMember);
  }

  const pendingApplications = await prisma.application.count({
    where: {
      AND: [
        {
          applicationStatus: "PENDING",
        },
        {
          applicantId: applicantId,
        },
      ],
    },
  });

  if (pendingApplications) {
    return next(Errors.Application.pendingApplicationExists);
  }

  await prisma.application.create({
    data: {
      answers: answers,
      message: message,
      resume: resume,
      applicationStatus: "PENDING",
      applicationDate: new Date(),
      applicant: {
        connect: {
          scholarId: applicantId,
        },
      },
      applicationOpening: {
        connect: {
          id: applicationOpeningId,
        },
      },
    },
  });

  res.json(Success.Application.applicationCreated);
};

export { createApplicaton };
