import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Utils from "@utils";
import * as Errors from "@errors";

const searchMember: Interfaces.Controller.Async = async (req, res, next) => {
  const { scholarId } = req.query;

  // Scholar ID Check
  if (!(typeof scholarId === "string")) {
    return next(Errors.Student.invalidScholarID);
  }

  if (!Utils.ScholarId.validateScholarId(scholarId)) {
    return next(Errors.Student.invalidScholarID);
  }

  // Find
  const member = await prisma.clubMember.findFirst({
    where: { scholarId },
    select: {
      student: {
        select: {
          scholarId: true,
          branch: true,
          degree: true,
          person: {
            select: {
              personalEmailId: true,
              firstName: true,
              middleName: true,
              lastName: true,
              dateOfBirth: true,
              gender: true,
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
          instituteEmailId: true,
        },
      },
      contributions: {
        select: {
          name: true,
        },
      },
      image: true,
      linkedInUrl: true,
      githubUrl: true,
      facebookUrl: true,
    },
  });

  const tenures = await prisma.tenure.findMany({
    where: {
      scholarId,
    },
    orderBy: {
      startYear: "desc",
    },
    select: {
      position: true,
      isModerator: true,
      isHead: true,
      role: true,
      startYear: true,
    },
  });

  res.json(Utils.Response.Success({ ...member, tenures }));
};

export { searchMember };
