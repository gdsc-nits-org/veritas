import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

const checkSessionExist: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { eventId, sessionId } = req.params;

  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      eventId,
    },
  });

  if (!session) {
    return next(Errors.Session.sessionNotFound);
  } else {
    return next();
  }
};

const checkAlreadyAttended: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { personalEmailId } = req.body as Interfaces.Session.AttendSessionBody;

  const { sessionId } = req.params;

  if (
    (await prisma.session.count({
      where: {
        id: sessionId,
        attendees: {
          some: {
            personalEmailId,
          },
        },
      },
    })) > 0
  ) {
    return next(Errors.Session.alreadyAttended);
  } else {
    return next();
  }
};

const checkSessionEndTime: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { sessionId } = req.params;

  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
    },
  });

  if (session!.endTime < new Date()) {
    return next(Errors.Session.sessionEnded);
  } else {
    return next();
  }
};

export { checkSessionExist, checkAlreadyAttended, checkSessionEndTime };
