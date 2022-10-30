import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

const attendSession: Interfaces.Controller.Async = async (req, res) => {
  const { personalEmailId } = req.body as Interfaces.Session.AttendSessionBody;

  const { sessionId } = req.params;

  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      attendees: {
        connect: {
          personalEmailId,
        },
      },
    },
  });

  return res.json(Success.Session.sessionAttendanceSuccessful);
};

export { attendSession };
