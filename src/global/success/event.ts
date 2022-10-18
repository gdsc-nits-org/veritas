import * as Utils from "@utils";

const eventCreatedSuccesfully = Utils.Response.Success(
  "Event created successfully."
);
const eventUpdatedSuccesfully = Utils.Response.Success(
  "Event updated successfully."
);

export { eventCreatedSuccesfully, eventUpdatedSuccesfully };
