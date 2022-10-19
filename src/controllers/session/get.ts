import { prisma } from "@utils/prisma";

import * as Utils from "@utils";
import * as Interfaces from "@interfaces";

const getAllSessionsOfTheEvent: Interfaces.Controller.Async = async (
  req,
  res
) => {
  const { eventId } = req.params;

  const sessions = await prisma.session.findMany({
    where: { eventId },
    include: {
      attendees: {
        select: {
          _count: true,
        },
      },
      speakers: {
        select: {
          _count: true,
        },
      },
      event: {
        select: {
          name: true,
          description: true,
          chapter: {
            select: {
              year: true,
            },
          },
        },
      },
    },
  });

  return res.json(Utils.Response.Success(sessions));
};

const getSessionsOfTheEvent: Interfaces.Controller.Async = async (req, res) => {
  const { eventId, sessionId } = req.params;

  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      eventId,
    },
    include: {
      attendees: {
        select: {
          _count: true,
        },
      },
      speakers: {
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
          personalEmailId: true,
          gender: true,
          phoneNumber: true,
        },
      },
      event: {
        select: {
          name: true,
          description: true,
          chapter: {
            select: {
              year: true,
            },
          },
          domain: true,
          level: true,
          mode: true,
          venue: true,
          url: true,
        },
      },
    },
  });

  return res.json(Utils.Response.Success(session));
};

const getSessionAttendance: Interfaces.Controller.Async = async (req, res) => {
  const { sessionId } = req.params;

  const sessionAttendance = await prisma.session.findMany({
    where: {
      id: sessionId,
    },
    select: {
      attendees: {
        select: {
          firstName: true,
          lastName: true,
          middleName: true,
          personalEmailId: true,
          phoneNumber: true,
          gender: true,
        },
      },
      name: true,
      status: true,
    },
  });

  return res.json(Utils.Response.Success(sessionAttendance));
};

export {
  getAllSessionsOfTheEvent,
  getSessionsOfTheEvent,
  getSessionAttendance,
};
