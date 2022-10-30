import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

const declareNewChapter: Interfaces.Controller.Async = async (
  _req,
  res,
  next
) => {
  const latestChapter = await prisma.chapter.findFirst({
    orderBy: {
      year: "desc",
    },
  });

  if (!latestChapter!.transition) {
    return next(Errors.Chapter.chapterAlreadyTransitioned);
  }

  await prisma.chapter.update({
    where: {
      year: latestChapter!.year,
    },
    data: {
      transition: false,
    },
  });

  res.json(Success.Chapter.chapterTransitioned);
};

export { declareNewChapter };
