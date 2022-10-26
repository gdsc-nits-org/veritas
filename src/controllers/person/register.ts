import { Gender } from "@prisma/client";
import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Constants from "@constants";
import * as Utils from "@utils";
import * as Success from "@success";

const register: Interfaces.Controller.Async = async (req, res, next) => {
  const {
    personalEmailId,
    gender,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    phoneNumber,
  } = req.body as Interfaces.Person.RegisterBody;

  //----Checks-----

  // Personal Email ID Already Checked By Middleware

  // Gender
  if (!gender || !(gender in Gender)) {
    return next(Errors.Person.invalidGender);
  }

  // Name
  if (!firstName || !Constants.Validation.name.test(firstName)) {
    return next(Errors.Person.invalidName);
  }

  // Date Of Birth
  if (!dateOfBirth || !Utils.Date.checkDateValidity(dateOfBirth)) {
    console.log(dateOfBirth);
    return next(Errors.Person.invalidDOB);
  }

  // Phone Number
  if (!phoneNumber) {
    return next(Errors.Person.invalidNumber);
  }

  for (let i = 0; i < phoneNumber.length; i++) {
    if (
      !phoneNumber[i] ||
      !Constants.Validation.phoneNumber.test(phoneNumber[i])
    ) {
      return next(Errors.Person.invalidNumber);
    }
  }

  //----Register-----
  await prisma.person.create({
    data: {
      personalEmailId,
      gender,
      firstName,
      middleName: middleName ?? null,
      lastName: lastName ?? null,
      dateOfBirth: new Date(dateOfBirth),
      phoneNumber,
    },
  });

  // Send Email

  res.json(Success.Person.registerSuccessful);
};

export { register };
