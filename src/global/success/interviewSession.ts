import { InterviewSession } from "@prisma/client";
import * as Utils from "@utils";

const sessionCreated = Utils.Response.Success(
  "Interview session is created successfully"
);

const sendOneSession = (msg: InterviewSession) => {
  return Utils.Response.Success<InterviewSession>(msg);
};

const sendManySessions = (msg: InterviewSession[]) => {
  return Utils.Response.Success<InterviewSession[]>(msg);
};

const sessionDeleted = Utils.Response.Success(
  "Interview session with given id is deleted"
);

export { sessionCreated, sendOneSession, sendManySessions, sessionDeleted };
