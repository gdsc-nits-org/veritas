import * as Interfaces from "@interfaces";
import * as Constants from "@constants";

// Lesser index = higher authority
function authLevel(level: Interfaces.Auth.Permission) {
  return Constants.Auth.PERMISSION_LEVEL.indexOf(level);
}

export { authLevel };
