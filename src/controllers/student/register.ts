import { Branch, Degree } from "@prisma/client";
import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

const register: Interfaces.Controller.Async = async (req, res, next) => {
  const { scholarId, personalEmailId, instituteEmailId, degree, branch } =
    req.body as Interfaces.Student.RegisterBody;

  //------- Checks ---------

  // Personal Email ID checked by middleware
  // Scholar ID checked by middleware
  // Institute Email ID checked by middleware

  // Degree
  if (!degree || !(degree in Degree)) {
    return next(Errors.Student.invalidDegree);
  }

  // Branch
  if (!branch || !(branch in Branch)) {
    return next(Errors.Student.invalidBranch);
  }

  //------- Register ---------
  await prisma.student.create({
    data: {
      scholarId,
      person: {
        connect: {
          personalEmailId,
        },
      },
      instituteEmailId,
      branch,
      degree,
    },
  });

  res.json(Success.Student.registerSuccessful);
};

export { register };
