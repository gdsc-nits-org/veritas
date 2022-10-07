import * as Constants from "@constants";

import { validate } from "./validate";

function passwordValidate(password: string) {
  return validate(password, Constants.Validation.password);
}

export { passwordValidate };
