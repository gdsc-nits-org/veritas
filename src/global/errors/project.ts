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

export {
  projectNotFound,
  projectExists,
  projectNotCreated,
  projectUpdateFail,
  projectsFetchFail,
  projectDeleteFail,
};
