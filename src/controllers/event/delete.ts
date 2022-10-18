import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

const deleteEvent: Interfaces.Controller.Async = async (req, res) => {
  const { eventId } = req.params;

  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  return res.json(Success.Event.eventDeletedSuccessfully);
};

export { deleteEvent };
