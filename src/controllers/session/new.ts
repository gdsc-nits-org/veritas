import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

/**
 * @description `speakers` will be array of email id of speakers
 */
const createNewSession: Interfaces.Controller.Async = async (req, res) => {
  const { name, startTime, endTime, topics, year, speakers, resources } =
    req.body as Interfaces.Session.CreateSessionBody;

  const { eventId } = req.params;

  await prisma.session.create({
    data: {
      event: {
        connect: {
          id: eventId,
        },
      },
      endTime: new Date(endTime),
      startTime: new Date(startTime),
      name,
      topics,
      year,
      resources,
      status: new Date(startTime) > new Date() ? "UPCOMING" : "ONGOING",
      speakers: {
        connect: speakers.map((speak) => ({ personalEmailId: speak })),
      },
    },
  });

  return res.json(Success.Session.sessionCreatedSuccessfully);
};

export { createNewSession };
