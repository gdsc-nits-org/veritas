import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";
import { prisma } from "@utils/prisma";
import { Domain } from "@prisma/client";

const createApplicaton: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const applicationBody: Interfaces.Application.createApplicatonBody = req.body;

  let { answers, domain, applicantId, message, resume } = applicationBody;

  answers = answers.map((answer) => answer.trim());

  domain = domain.trim() as Domain;
  applicantId = applicantId.trim();
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
      domain: domain,
      message: message,
      resume: resume,
      applicationStatus: "PENDING",
      applicationDate: new Date(),
      applicant: {
        connect: {
          scholarId: applicantId,
        },
      },
    },
  });

  res.json(Success.Application.applicationCreated);
};

export { createApplicaton };
