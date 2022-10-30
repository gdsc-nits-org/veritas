import * as Constants from "@constants";
import { validate } from "./validate";

function validatePersonalEmailId(personalEmailId: string) {
  return validate(personalEmailId, Constants.Validation.email);
}

function validateInstituteEmailId(instituteEmailId: string) {
  return validate(instituteEmailId, Constants.Validation.instituteEmail);
}

export { validatePersonalEmailId, validateInstituteEmailId };
