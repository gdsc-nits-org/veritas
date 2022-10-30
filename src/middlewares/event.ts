import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

/**
 * @description Checks whether event with the given `eventId` exists
 */
const checkEventExist: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { eventId } = req.params;

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return next(Errors.Event.eventNotFound);
  } else {
    return next();
  }
};

/**
 * @description Check whether the user with given `personalEmailId` already registered for the event with `eventId`
 */
const checkAlreadyRegistered: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { personalEmailId } = req.body as Interfaces.Event.EventRSVPBody;

  const { eventId } = req.params;

  if (
    (await prisma.event.count({
      where: {
        id: eventId,
        registrations: {
          some: { personalEmailId },
        },
      },
    })) > 0
  ) {
    return next(Errors.Event.alreadyRSVP);
  } else {
    return next();
  }
};

const checkEventEnded: Interfaces.Middleware.Async = async (
  req,
  _res,
  next
) => {
  const { eventId } = req.params;

  const lastSession = await prisma.session.findFirst({
    where: {
      eventId,
    },
    orderBy: {
      endTime: "desc",
    },
  });

  if (!lastSession) return next();

  if (lastSession.endTime < new Date()) {
    return next(Errors.Event.eventEnded);
  } else {
    return next();
  }
};

const checkScholarId: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { organizers } = req.body as Interfaces.Event.EventBody;

  for await (const org of organizers) {
    const doesScholarIdExist = await prisma.clubMember.findFirst({
      where: {
        scholarId: org,
      },
    });

    if (!doesScholarIdExist) {
      return next(Errors.Event.organizerDoesntExist);
    }
  }

  return next();
};

export {
  checkEventExist,
  checkAlreadyRegistered,
  checkEventEnded,
  checkScholarId,
};
