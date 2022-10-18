import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

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

export { checkEventExist };
