import * as Utils from "@utils";

const invalidImageUrl = Utils.Response.Error("Invalid Image URL", 401);
const invalidPassword = Utils.Response.Error(
  "Password needs to have 1 Capital, 1 Digit, 1 Special Character, and a total 8-20 characters both inclusive",
  401
);
const invalidDomain = Utils.Response.Error("Invalid Domain", 401);
const invalidRole = Utils.Response.Error("Invalid Role", 401);
const invalidSocials = Utils.Response.Error("Invalid Social Links", 401);

const memberNotFound = Utils.Response.Error("Member Not Found", 404);
const memberAlreadyExists = Utils.Response.Error("Member Already Exists", 404);

export {
  invalidImageUrl,
  invalidPassword,
  invalidDomain,
  invalidRole,
  invalidSocials,
  memberNotFound,
  memberAlreadyExists,
};
