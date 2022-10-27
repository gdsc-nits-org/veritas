import * as Utils from "@utils";

const notAStudent = Utils.Response.Error("Not a Student of NIT Silchar", 403);

const isClubMember = Utils.Response.Error("Already a club member", 403);

const invalidResumeUrl = Utils.Response.Error("Invalid resume link", 406);

const pendingApplicationExists = Utils.Response.Error(
  "A submitted application is pending",
  409
);

export {
  notAStudent,
  isClubMember,
  invalidResumeUrl,
  pendingApplicationExists,
};
