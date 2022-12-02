import { validate } from "./validate";

import * as Constants from "@constants";

function stringValidate(url: string) {
  return validate(url, Constants.Validation.string);
}

export { stringValidate };
