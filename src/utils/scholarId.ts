import * as Constants from "@constants";
import { validate } from "./validate";

function validateScholarId(scholarId: string) {
  if (!validate(scholarId, Constants.Validation.scholarId)) {
    return false;
  }

  const year = new Date().getFullYear();
  const registrationYear = parseInt(scholarId.substring(0, 2));

  if (registrationYear > year % 100) {
    return false;
  }

  return true;
}

export { validateScholarId };
