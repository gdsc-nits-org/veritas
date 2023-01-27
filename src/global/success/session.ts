import * as Utils from "@utils";

const sessionCreatedSuccessfully = Utils.Response.Success(
  "Session creation successful."
);

const sessionUpdatedSuccessfully = Utils.Response.Success(
  "Session updation successful."
);

const sessionDeletedSuccessfully = Utils.Response.Success(
  "Session deletion successful."
);

const sessionAttendanceSuccessful = Utils.Response.Success(
  "Attendance for session is marked."
);

export {
  sessionCreatedSuccessfully,
  sessionUpdatedSuccessfully,
  sessionDeletedSuccessfully,
  sessionAttendanceSuccessful,
};
