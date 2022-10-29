import * as Utils from "@utils";

const missingFields = Utils.Response.Error(
  "one or multiple fields are missing to create a session",
  400
);

const applicationNotFound = Utils.Response.Error(
  "Appliation with given application id not found",
  404
);

const invalidMode = Utils.Response.Error(
  "Given interview mode is not acceptable",
  406
);

const invalidUrl = Utils.Response.Error(
  "Given interview url is not acceptable",
  406
);

const invalidVenue = Utils.Response.Error(
  "Given interview venue is not acceptable",
  406
);

const invalidDate = Utils.Response.Error(
  "Given interview Date is not acceptable",
  406
);

const invalidQuestions = Utils.Response.Error(
  "Given interview Questions are not accpetable",
  406
);

export {
  missingFields,
  invalidMode,
  invalidUrl,
  invalidVenue,
  invalidDate,
  invalidQuestions,
  applicationNotFound,
};
