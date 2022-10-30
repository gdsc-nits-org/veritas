import { validate } from "./validate";

import * as Constants from "@constants";

function urlValidate(url: string) {
  return validate(url, Constants.Validation.url);
}

export { urlValidate };
