import * as Utils from "@utils";

const invalidScholarID = Utils.Response.Error("Invalid Scholar ID", 401);
const invalidInstituteEmail = Utils.Response.Error(
  "Invalid Institute Email",
  401
);
const invalidDegree = Utils.Response.Error("Invalid Degree", 401);
const invalidBranch = Utils.Response.Error("Invalid Branch", 401);

const studentNotFound = Utils.Response.Error("Student Not Found", 404);
const studentAlreadyExists = Utils.Response.Error(
  "Student Already Exists",
  403
);

export {
  invalidScholarID,
  invalidInstituteEmail,
  invalidDegree,
  invalidBranch,
  studentNotFound,
  studentAlreadyExists,
};
