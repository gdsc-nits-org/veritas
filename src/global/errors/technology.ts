import * as Utils from "@utils";
const technologyAlreadyExists = Utils.Response.Error(
  "Technology with name already exists",
  403
);
const technologyNotFound = Utils.Response.Error(
  "Technology Does Not Exist",
  404
);

const technologyNotCreated = Utils.Response.Error(
  "Failed to create technology"
);
const technologyNotUpdated = Utils.Response.Error(
  "Failed to update technology"
);
const technologyNotDeleted = Utils.Response.Error(
  "Failed to delete technology"
);

const invalidName = Utils.Response.Error("Incorrect Name Value", 401);
const invalidIcon = Utils.Response.Error("Incorrect Icon Value", 401);

export {
  technologyAlreadyExists,
  technologyNotFound,
  technologyNotCreated,
  technologyNotUpdated,
  technologyNotDeleted,
  invalidIcon,
  invalidName,
};
