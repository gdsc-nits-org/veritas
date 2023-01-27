import * as Utils from "@utils";

const eventNotFound = Utils.Response.Error(
  "Event with the given id not found.",
  404
);
const eventAlreadyExist = Utils.Response.Error(
  "Event with same name already exist in this GDSC Chapter.",
  409
);
const eventNotCreated = Utils.Response.Error("Event not created.", 500);
const eventNotUpdated = Utils.Response.Error("Event couldn't be updated.", 500);
const alreadyRSVP = Utils.Response.Error("Already RSVP'd for the event.", 409);
const eventEnded = Utils.Response.Error("Event has ended.", 403);
const organizerDoesntExist = Utils.Response.Error(
  "Organizer with given scholar ID doesn't exist.",
  404
);

export {
  eventNotFound,
  eventAlreadyExist,
  eventNotCreated,
  eventNotUpdated,
  alreadyRSVP,
  eventEnded,
  organizerDoesntExist,
};
