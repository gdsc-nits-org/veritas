import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import { ApplicationPurpose, Domain } from "@prisma/client";

const DomainCheck: Interfaces.Middleware.Sync = (req, _res, next) => {
  const domain = req.body?.domain as Domain;

  if (!domain) {
    return next();
  }

  if (domain && typeof domain === "string" && domain.trim() in Domain) {
    return next();
  }

  return next(Errors.ApplicationOpening.invalidDomain);
};

const applicationOpeningPurposeCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const purpose = req.body.purpose as ApplicationPurpose;
  if (!purpose) {
    return next();
  }

  if (
    purpose &&
    typeof purpose === "string" &&
    purpose.trim() in ApplicationPurpose
  ) {
    return next();
  }

  return next(Errors.ApplicationOpening.invalidPurpose);
};

const applicationOpeningTitleCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const title = req.body.title as string;

  if (!title) {
    return next();
  }

  if (title && typeof title === "string") {
    return next();
  }

  next(Errors.ApplicationOpening.invalidTitle);
};

const applicationOpeningDescriptionCheck: Interfaces.Middleware.Sync = (
  req,
  _res,
  next
) => {
  const description = req.body.description as string[];

  if (!description) {
    return next();
  }

  if (!(description instanceof Array)) {
    return next(Errors.ApplicationOpening.invalidDescription);
  }

  description.forEach((para) => {
    if (typeof para !== "string") {
      return next(Errors.ApplicationOpening.invalidDescription);
    }
  });

  return next();
};

export {
  DomainCheck,
  applicationOpeningPurposeCheck,
  applicationOpeningTitleCheck,
  applicationOpeningDescriptionCheck,
};
