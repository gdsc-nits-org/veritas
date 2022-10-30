import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

const rsvpForEvent: Interfaces.Controller.Async = async (req, res) => {
  const { personalEmailId } = req.body as Interfaces.Event.EventRSVPBody;

  const { eventId } = req.params;

  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      registrations: {
        connect: {
          personalEmailId,
        },
      },
    },
  });

  return res.json(Success.Event.successfullyRsvpToEvent);
};

export { rsvpForEvent };
