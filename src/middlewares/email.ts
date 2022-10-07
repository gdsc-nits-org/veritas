import * as Interfaces from "@interfaces";
import * as Constants from "@constants";
import * as Errors from "@errors";

const check: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { personalEmailId } = req.body;

  if (!personalEmailId || !Constants.Validation.email.test(personalEmailId)) {
    return next(Errors.Person.invalidEmailID);
  }

  next();
};

export { check };
