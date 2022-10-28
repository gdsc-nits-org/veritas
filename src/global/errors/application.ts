import * as Utils from "@utils";

const notAStudent = Utils.Response.Error("Not a Student of NIT Silchar", 403);

const isClubMember = Utils.Response.Error("Already a club member", 403);

const invalidResumeUrl = Utils.Response.Error("Invalid resume link", 406);

const pendingApplicationExists = Utils.Response.Error(
  "A submitted application is pending",
  409
);

const applicationNotFound = Utils.Response.Error(
  "Application does not exist to update",
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

export {
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
};
