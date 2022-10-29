import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Utils from "@utils";
import { Mode } from "@prisma/client";

const interviewModeCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const mode = req.body.mode as string;

  if (!mode) {
    return next();
  }

  if (mode && typeof mode === "string" && mode.trim() in Mode) {
    return next();
  }

  return next(Errors.InterviewSession.invalidMode);
};

const interviewUrlCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const url = req.body.url as string;

  if (!url) {
    return next();
  }

  if (url && typeof url === "string" && Utils.Url.urlValidate(url.trim())) {
    return next();
  }
  return next(Errors.InterviewSession.invalidUrl);
};

const interviewVenueCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const venue = req.body.venue as string;

  if (!venue) {
    return next();
  }

  if (venue && typeof venue === "string") {
    return next();
  }

  return next(Errors.InterviewSession.invalidVenue);
};

const interviewDateCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  let interviewDate = req.body.interviewDate as Date;

  if (!interviewDate) {
    return next();
  }

  interviewDate = new Date(interviewDate);

  if (
    interviewDate &&
    interviewDate instanceof Date &&
    !isNaN(interviewDate.getDate())
  ) {
    return next();
  }

  return next(Errors.InterviewSession.invalidDate);
};

const interviewQuestionsCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const questions = req.body.questions as Array<string>;

  if (!questions) {
    return next();
  }

  if (!(questions instanceof Array)) {
    return next(Errors.InterviewSession.invalidQuestions);
  }

  questions.forEach((question) => {
    if (typeof question !== "string") {
      return next(Errors.InterviewSession.invalidQuestions);
    }
  });

  return next();
};

export {
  interviewModeCheck,
  interviewUrlCheck,
  interviewVenueCheck,
  interviewDateCheck,
  interviewQuestionsCheck,
};
