import * as Utils from "@utils";

const eventCreatedSuccesfully = Utils.Response.Success(
  "Event created successfully."
);
const eventUpdatedSuccesfully = Utils.Response.Success(
  "Event updated successfully."
);

const eventDeletedSuccessfully = Utils.Response.Success(
  "Event deleted successfully."
);

export {
  eventCreatedSuccesfully,
  eventUpdatedSuccesfully,
  eventDeletedSuccessfully,
};
