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
          scholarId: true,
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

  const totalEvents = await prisma.event.count();

  const events = await prisma.event.findMany({
    skip: page ? parseInt(amount as string) * parseInt(page as string) : 0,
    take: amount ? parseInt(amount as string) : totalEvents,
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

  console.log(events);

  return res.json(Utils.Response.Success(events));
};

const getEventRegistrations: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  const eventRegistrations = await prisma.event.findMany({
    where: {
      id: eventId,
    },
    select: {
      registrations: {
        select: {
          firstName: true,
          lastName: true,
          middleName: true,
          personalEmailId: true,
          phoneNumber: true,
        },
      },
      id: true,
      name: true,
      description: true,
      type: true,
    },
  });

  return res.json(Utils.Response.Success(eventRegistrations));
};

export { getEvent, getAllEvents, getEventRegistrations };
