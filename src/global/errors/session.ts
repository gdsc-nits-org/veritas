import * as Utils from "@utils";

const sessionNotFound = Utils.Response.Error(
  "No session exists with the given event ID and session ID.",
  404
);

const alreadyAttended = Utils.Response.Error(
  "Session attendance already marked.",
  409
);

const sessionEnded = Utils.Response.Error(
  "Session is no longer available.",
  403
);

const speakerDoesntExist = Utils.Response.Error(
  "Speaker with given Email ID doesn't exist.",
  403
);

export { sessionNotFound, alreadyAttended, sessionEnded, speakerDoesntExist };
