import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

import {
  ApplicationOpeningStatus,
  ApplicationPurpose,
  Domain,
} from "@prisma/client";
import { prisma } from "@utils/prisma";

const createApplicationOpening: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  let { purpose, domain, description, title } =
    req.body as Interfaces.ApplicationOpening.createApplicationOpeningBody;

  if (!purpose || !domain || !description || !title) {
    return next(Errors.ApplicationOpening.missingFields);
  }

  purpose = purpose?.trim() as ApplicationPurpose;
  domain = domain?.trim() as Domain;
  title = title?.trim();

  description = description.map((para) => para?.trim());

  await prisma.applicationOpening.create({
    data: {
      domain,
      purpose,
      status: ApplicationOpeningStatus.OPEN,
      title,
      description,
    },
  });

  res.json(Success.ApplicationOpening.applicationOpeningCreated);
};

export { createApplicationOpening };
