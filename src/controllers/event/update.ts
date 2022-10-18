import { prisma } from "@utils/prisma";

import { Event } from "@prisma/client";
import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import * as Success from "@success";
import * as Errors from "@errors";

const updateEvent: Interfaces.Controller.Async = async (req, res, next) => {
  const { eventId } = req.params;

  const { description, domain, mode, tags, url, venue } = req.body as Event;

  /**
   * Check if event exist
   */
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return next(Errors.Event.eventNotFound);
  }

  /**
   * Event update
   */
  await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      description,
      domain,
      mode,
      tags: Utils.Tags.appendWithoutDuplicates(event.tags, tags),
      url,
      venue,
    },
  });

  return res.json(Success.Event.eventUpdatedSuccesfully);
};

export { updateEvent };
