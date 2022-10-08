import * as Interfaces from "@interfaces";
import * as Success from "@success";
import { prisma } from "@utils/prisma";

const promote: Interfaces.Controller.Async = async (req, res) => {
  const { scholarId, domain, role, year, isHead, position, isModerator } =
    req.body as Interfaces.Core.PromoteBody;

  //-----Checks-----

  // All checks done in middleware

  //---- Promote-----
  await prisma.$transaction(async (prisma) => {
    await prisma.tenure.create({
      data: {
        member: {
          connect: {
            scholarId,
          },
        },
        chapter: {
          connectOrCreate: {
            where: {
              year: year!,
            },
            create: {
              year: year!,
            },
          },
        },
        domain,
        isModerator: isModerator!,
        isHead: isHead!,
        position: position!,
        role,
      },
    });
  });

  res.json(Success.Core.promotionSuccessful);
};

export { promote };
