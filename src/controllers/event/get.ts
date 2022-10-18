import { prisma } from "@utils/prisma";

import * as Utils from "@utils";
import * as Interfaces from "@interfaces";

const getEvent: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });

  return res.json(Utils.Response.Success(event));
};

const getAllEvents: Interfaces.Controller.Async = async (req, res) => {
  const { page, amount } = req.query;

  const events = await prisma.event.findMany({
    skip: page ? parseInt(amount as string) * parseInt(page as string) : 0,
    take: amount ? parseInt(amount as string) : 0,
  });

  return res.json(Utils.Response.Success(events));
};

export { getEvent, getAllEvents };
