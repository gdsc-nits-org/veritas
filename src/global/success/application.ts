import { Application } from "@prisma/client";
import * as Utils from "@utils";

const applicationCreated = Utils.Response.Error("Application submitted", 200);

const applicationUpdated = (updatedApplication: Application) => {
  return Utils.Response.Success<Application>(updatedApplication);
};

export { applicationCreated, applicationUpdated };
