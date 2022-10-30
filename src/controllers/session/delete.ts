import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Success from "@success";

const deleteSession: Interfaces.Controller.Async = async (req, res) => {
  const { sessionId } = req.params;

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  return res.json(Success.Session.sessionDeletedSuccessfully);
};

export { deleteSession };
