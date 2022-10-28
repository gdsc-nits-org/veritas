import * as Utils from "@utils";

const missingFields = Utils.Response.Error(
  "one or multiple fields are missing to create an application",
  400
);

const notAStudent = Utils.Response.Error("Not a Student of NIT Silchar", 403);

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

const invalidDomain = Utils.Response.Error("Invalid Domain", 406);

const invalidApplicationStatus = Utils.Response.Error(
  "Invalid Application status",
  406
);

const invalidApplicantId = Utils.Response.Error("Invalid Applicant Id", 406);

const invalidAnswers = Utils.Response.Error("Invalid Applicant answers", 406);

const invalidMessage = Utils.Response.Error("Invalid Applicant message", 406);

const invalidPurpose = Utils.Response.Error("Invalid Application purpose", 406);

export {
  missingFields,
  notAStudent,
  isClubMember,
  invalidResumeUrl,
  pendingApplicationExists,
  applicationNotFound,
  invalidDomain,
  invalidApplicationStatus,
  invalidApplicantId,
  invalidAnswers,
  invalidMessage,
  invalidPurpose,
};
