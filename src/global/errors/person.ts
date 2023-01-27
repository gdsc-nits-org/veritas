import * as Utils from "@utils";

const invalidEmailID = Utils.Response.Error("Invalid Email ID", 401);
const invalidGender = Utils.Response.Error("Invalid Gender", 401);
const invalidName = Utils.Response.Error("Invalid Name", 401);
const invalidDOB = Utils.Response.Error("Invalid DOB", 401);
const invalidNumber = Utils.Response.Error("Invalid Phone Number", 401);

const personNotFound = Utils.Response.Error("Person Not Found.", 404);
const personAlreadyExists = Utils.Response.Error("Person Already Exists.", 403);

export {
  invalidEmailID,
  invalidGender,
  invalidName,
  invalidDOB,
  invalidNumber,
  personNotFound,
  personAlreadyExists,
};
