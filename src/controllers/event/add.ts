import { prisma } from "@utils/prisma";

import { Event } from "@prisma/client";
import * as Interfaces from "@interfaces";
import * as Success from "@success";
import * as Errors from "@errors";

const createEvent: Interfaces.Controller.Async = async (req, res, next) => {
  const {
    description,
    domain,
    level,
    mode,
    name,
    tags,
    type,
    year,
    venue,
    url,
  } = req.body as Event;

  /**
   * Check whether event with same name, year and type exist. If exists then return error.
   */
  const eventExist = await prisma.event.findFirst({
    where: {
      name,
      year,
      type,
    },
  });

  if (eventExist) {
    return next(Errors.Event.eventAlreadyExist);
  }

  /**
   * Create event
   */
  await prisma.event.create({
    data: {
      name,
      description,
      domain,
      level,
      mode,
      tags,
      type,
      year,
      venue,
      url,
    },
  });

  return res.json(Success.Event.eventCreatedSuccesfully);
};

export { createEvent };
