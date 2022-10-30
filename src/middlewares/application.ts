import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Utils from "@utils";
import { InterviewApplicationStatus } from "@prisma/client";

const applicationStatusCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const applicationStatus = req.body
    .applicationStatus as InterviewApplicationStatus;

  if (!applicationStatus) {
    return next();
  }

  if (
    applicationStatus &&
    typeof applicationStatus === "string" &&
    applicationStatus.trim() in InterviewApplicationStatus
  ) {
    return next();
  }

  return next(Errors.Application.invalidApplicationStatus);
};

const applicantIdCheck: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const applicantId = req.body.applicantId as string;

  if (!applicantId) {
    return next();
  }

  if (
    applicantId &&
    typeof applicantId === "string" &&
    Utils.ScholarId.validateScholarId(applicantId.trim())
  ) {
    return next();
  }

  return next(Errors.Application.invalidApplicantId);
};

const applicationOpeningIdCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const applicationOpeningId = req.body.applicationOpeningId as string;

  if (!applicationOpeningId) {
    return next();
  }

  if (applicationOpeningId && typeof applicationOpeningId === "string") {
    return next();
  }

  return next(Errors.Application.invalidApplicationOpeningId);
};

const applicantAnswersCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const answers = req.body.answers as string[];

  if (!answers) {
    return next();
  }

  if (!(answers instanceof Array)) {
    return next(Errors.Application.invalidAnswers);
  }

  answers.forEach((answer) => {
    if (!answer || typeof answer !== "string") {
      return next(Errors.Application.invalidAnswers);
    }
  });

  return next();
};

const resumeLinkCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const resume = req.body.resume as string;

  if (!resume) {
    return next();
  }

  if (
    resume &&
    typeof resume === "string" &&
    Utils.Url.urlValidate(resume.trim())
  ) {
    return next();
  }

  return next(Errors.Application.invalidResumeUrl);
};

const applicantMessageCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const message = req.body.message as string;

  if (!message) {
    return next();
  }

  if (message && typeof message === "string") {
    return next();
  }
  return next(Errors.Application.invalidMessage);
};

export {
  applicationStatusCheck,
  applicantIdCheck,
  applicationOpeningIdCheck,
  applicantAnswersCheck,
  resumeLinkCheck,
  applicantMessageCheck,
};
