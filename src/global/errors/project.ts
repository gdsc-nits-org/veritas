import error from "./error";

const projectNotFound = error("Project does not exist");
const projectExists = error("Project name is already in Use");
const projectNotCreated = error("Error while creating project");
const projectUpdateFail = error("Error while updateing project");
const projectsFetchFail = error("Error while fetching projects");
const projectDeleteFail = error("Failed to delte project");

export {
  projectNotFound,
  projectExists,
  projectNotCreated,
  projectUpdateFail,
  projectsFetchFail,
  projectDeleteFail,
};
