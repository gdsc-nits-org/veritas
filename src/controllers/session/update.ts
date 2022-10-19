import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

/**
 * @description `speakers` should be updated array of email ids of speakers and same for `topics`
 */
const updateSession: Interfaces.Controller.Async = async (req, res) => {
  const { startTime, endTime, speakers, topics, status } =
    req.body as Interfaces.Session.CreateSessionBody;

  const { sessionId } = req.params;

  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      topics,
      status,
      speakers: {
        connect: speakers.map((speak) => ({ personalEmailId: speak })),
      },
    },
  });

  return res.json(Success.Session.sessionUpdatedSuccessfully);
};

export { updateSession };
