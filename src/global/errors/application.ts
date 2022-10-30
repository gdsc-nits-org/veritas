import * as Utils from "@utils";

const missingFields = Utils.Response.Error(
  "one or multiple fields are missing to create an application",
  400
);

const notAStudent = Utils.Response.Error("Not a Student of NIT Silchar", 403);

const applicationOpeningNotFound = Utils.Response.Error(
  "application opening with given id not found",
  404
);

const isClubMember = Utils.Response.Error("Already a club member", 403);

const invalidResumeUrl = Utils.Response.Error("Invalid resume link", 406);

const pendingApplicationExists = Utils.Response.Error(
  "A submitted application is pending",
  409
);

const applicationNotFound = Utils.Response.Error(
  "Application does not exist with given application id",
  404
);

const invalidApplicationStatus = Utils.Response.Error(
  "Invalid Application status",
  406
);

const invalidApplicantId = Utils.Response.Error("Invalid Applicant Id", 406);

const invalidAnswers = Utils.Response.Error("Invalid Applicant answers", 406);

const invalidMessage = Utils.Response.Error("Invalid Applicant message", 406);

const invalidApplicationOpeningId = Utils.Response.Error(
  "Invalid Application opening id",
  406
);

export {
  missingFields,
  notAStudent,
  applicationOpeningNotFound,
  isClubMember,
  invalidResumeUrl,
  pendingApplicationExists,
  applicationNotFound,
  invalidApplicationStatus,
  invalidApplicantId,
  invalidAnswers,
  invalidMessage,
  invalidApplicationOpeningId,
};
