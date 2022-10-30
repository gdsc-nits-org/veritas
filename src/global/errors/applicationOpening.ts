import * as Utils from "@utils";

const missingFields = Utils.Response.Error(
  "One or multiple fields are missing",
  400
);

const invalidPurpose = Utils.Response.Error(
  "Invalid Application opnening purpose",
  406
);

const invalidTitle = Utils.Response.Error(
  "Invalid Application opening title",
  406
);

const invalidDescription = Utils.Response.Error(
  "Invalid Applciation opening description",
  406
);

const invalidDomain = Utils.Response.Error(
  "Invalid Applciation opening domain",
  406
);

export {
  missingFields,
  invalidPurpose,
  invalidTitle,
  invalidDescription,
  invalidDomain,
};
