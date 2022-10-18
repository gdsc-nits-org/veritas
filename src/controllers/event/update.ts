import { prisma } from "@utils/prisma";

import * as Utils from "@utils";
import * as Interfaces from "@interfaces";
import * as Success from "@success";

/**
 * @description `organizers` should be the complete list or organizer list in the updated event too.
 */
const updateEvent: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  const { description, domain, mode, tags, url, venue, organizers } =
    req.body as Interfaces.Event.EventBody;

  /**
   * Check if event exist
   */
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });

  /**
   * Event update
   */
  await prisma.event.update({
    where: {
      id: event!.id,
    },
    data: {
      description,
      domain,
      mode,
      tags: Utils.Tags.appendWithoutDuplicates(event!.tags, tags),
      url,
      venue,
      organizers: {
        connect: organizers.map((org) => ({ scholarId: org })),
      },
    },
  });

  return res.json(Success.Event.eventUpdatedSuccesfully);
};

export { updateEvent };
