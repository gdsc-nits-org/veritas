import { ApplicationOpening } from "@prisma/client";
import * as Utils from "@utils";

const applicationOpeningCreated = Utils.Response.Success(
  "Opening for applications is created"
);

const sendOneApplicationOpening = (msg: ApplicationOpening) => {
  return Utils.Response.Success<ApplicationOpening>(msg);
};

const sendManyApplicationOpenings = (msg: ApplicationOpening[]) => {
  return Utils.Response.Success<ApplicationOpening[]>(msg);
};

const applicationOpeningDeleted = Utils.Response.Error(
  "Application opening is deleted"
);

export {
  applicationOpeningCreated,
  sendOneApplicationOpening,
  sendManyApplicationOpenings,
  applicationOpeningDeleted,
};
