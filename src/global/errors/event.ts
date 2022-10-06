import * as Utils from "@utils";

const eventNotFound = Utils.Response.Error("Event with the given id not found.", 404);

export { eventNotFound };
