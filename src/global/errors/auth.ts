import * as Utils from "@utils";

const unauthorizedAccess = Utils.Response.Error("Unauthorized Access", 403);

const chapterStillInTransition = Utils.Response.Error(
  "Chapter in transition",
  403
);
const noChapterInTransition = Utils.Response.Error(
  "No Chapter in transition",
  403
);
const chapterOver = Utils.Response.Error(
  "Your GDSC Chapter is already over",
  403
);

const invalidAdminScholarID = Utils.Response.Error(
  "Invalid Admin Scholar ID",
  401
);
const invalidAdminPassword = Utils.Response.Error(
  "Invalid Admin Password",
  401
);

const incorrectPassword = Utils.Response.Error("Incorrect Admin Password", 401);

export {
  unauthorizedAccess,
  chapterStillInTransition,
  noChapterInTransition,
  chapterOver,
  incorrectPassword,
  invalidAdminScholarID,
  invalidAdminPassword,
};
