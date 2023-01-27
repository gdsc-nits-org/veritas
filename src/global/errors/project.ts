import * as Utils from "@utils";

const projectNotFound = Utils.Response.Error("Project does not exist", 404);
const projectExists = Utils.Response.Error(
  "Project name is already in Use",
  403
);

const projectNotCreated = Utils.Response.Error("Error while creating project");
const projectUpdateFail = Utils.Response.Error("Error while updateing project");
const projectsFetchFail = Utils.Response.Error("Error while fetching projects");
const projectDeleteFail = Utils.Response.Error("Failed to delete project");

const invalidProjectId = Utils.Response.Error("Invalid Project Id", 401);
const invalidLink = Utils.Response.Error("Invalid Link", 401);
const invalidTag = Utils.Response.Error("Invalid Tag", 401);
const invalidBannerImageURL = Utils.Response.Error(
  "Invalid URL for Banner Image",
  401
);
const invalidLogoImageURL = Utils.Response.Error(
  "Invalid URL for Logo Image",
  401
);
const invalidName = Utils.Response.Error("Invalid Project Name", 401);
const invalidDescription = Utils.Response.Error(
  "Invalid Project Description",
  401
);
const invalidStatus = Utils.Response.Error("Invalid Project Status", 401);
const invalidTechnology = Utils.Response.Error("Invalid Technology", 401);
const invalidMentorList = Utils.Response.Error("Invalid Mentor List", 401);
const invalidContributorList = Utils.Response.Error(
  "Invalid Contributor List",
  401
);

export {
  projectNotFound,
  projectExists,
  projectNotCreated,
  projectUpdateFail,
  projectsFetchFail,
  projectDeleteFail,
  invalidProjectId,
  invalidLink,
  invalidTag,
  invalidBannerImageURL,
  invalidLogoImageURL,
  invalidDescription,
  invalidName,
  invalidStatus,
  invalidTechnology,
  invalidMentorList,
  invalidContributorList,
};
