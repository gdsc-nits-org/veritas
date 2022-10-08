import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Utils from "@utils";
import * as Errors from "@errors";

const searchStudent: Interfaces.Controller.Async = async (req, res, next) => {
  const { scholarId } = req.query;

  // Scholar ID Check
  if (!(typeof scholarId === "string")) {
    return next(Errors.Student.invalidScholarID);
  }

  if (!Utils.ScholarId.validateScholarId(scholarId)) {
    return next(Errors.Student.invalidScholarID);
  }

  // Find
  const student = await prisma.student.findFirst({
    where: { scholarId },
    select: {
      scholarId: true,
      person: {
        select: {
          personalEmailId: true,
          firstName: true,
          middleName: true,
          lastName: true,
          gender: true,
          dateOfBirth: true,
          phoneNumber: true,
          attendedSessions: {
            select: {
              name: true,
              event: {
                select: {
                  name: true,
                },
              },
              startTime: true,
              endTime: true,
            },
          },
          speakerForSession: {
            select: {
              name: true,
              event: {
                select: {
                  name: true,
                },
              },
              startTime: true,
              endTime: true,
            },
          },
        },
      },
      branch: true,
      degree: true,
    },
  });

  res.json(Utils.Response.Success(student));
};

export { searchStudent };
