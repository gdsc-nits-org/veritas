import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Utils from "@utils";

const searchPerson: Interfaces.Controller.Async = async (req, res, next) => {
  const { email } = req.query;

  // Email Check
  if (!(typeof email === "string")) {
    return next(Errors.Person.invalidEmailID);
  }

  if (!Utils.Email.validatePersonalEmailId(email)) {
    return next(Errors.Person.invalidEmailID);
  }

  // Find
  const person = await prisma.person.findFirst({
    where: {
      personalEmailId: email,
    },
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
  });

  res.json(Utils.Response.Success(person));
};

export { searchPerson };
