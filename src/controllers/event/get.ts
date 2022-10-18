import { prisma } from "@utils/prisma";

import * as Utils from "@utils";
import * as Interfaces from "@interfaces";

const getEvent: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      organizers: {
        select: {
          facebookUrl: true,
          githubUrl: true,
          linkedInUrl: true,
          discordId: true,
          image: true,
          student: {
            include: {
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                  middleName: true,
                  phoneNumber: true,
                  personalEmailId: true,
                  gender: true,
                  dateOfBirth: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return res.json(Utils.Response.Success(event));
};

const getAllEvents: Interfaces.Controller.Async = async (req, res) => {
  const { page, amount } = req.query;

  const events = await prisma.event.findMany({
    skip: page ? parseInt(amount as string) * parseInt(page as string) : 0,
    take: amount ? parseInt(amount as string) : 0,
    include: {
      registrations: {
        select: {
          _count: true,
        },
      },
      organizers: {
        select: {
          student: {
            include: {
              person: {
                select: {
                  firstName: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return res.json(Utils.Response.Success(events));
};

const getEventRegistrations: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  const eventRegistrations = await prisma.event.findMany({
    where: {
      id: eventId,
    },
    include: {
      registrations: {
        select: {
          firstName: true,
          lastName: true,
          middleName: true,
          personalEmailId: true,
          phoneNumber: true,
        },
      },
    },
  });

  return res.json(Utils.Response.Success(eventRegistrations));
};

export { getEvent, getAllEvents, getEventRegistrations };
