import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Success from "@success";

import {
  ApplicationOpeningStatus,
  ApplicationPurpose,
  Domain,
} from "@prisma/client";
import { prisma } from "@utils/prisma";

const updateApplicationOpening: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  let { description, domain, purpose, title, status } =
    req.body as Interfaces.ApplicationOpening.updateApplicationOpeningBody;

  const { applicationOpeningId } = req.params;

  domain = domain?.trim() as Domain | undefined;
  purpose = purpose?.trim() as ApplicationPurpose | undefined;
  title = title?.trim();
  status = status?.trim() as ApplicationOpeningStatus | undefined;

  description = description?.map((para) => para.trim());

  const applicationOpeningExists = await prisma.applicationOpening.count({
    where: {
      id: applicationOpeningId,
    },
  });

  if (!applicationOpeningExists) {
    return next(Errors.ApplicationOpening.applicationOpeningNotFound);
  }

  const updatedApplicationOpening = await prisma.applicationOpening.update({
    where: {
      id: applicationOpeningId,
    },
    data: {
      description,
      domain,
      purpose,
      title,
      status,
    },
  });

  res.json(
    Success.ApplicationOpening.sendOneApplicationOpening(
      updatedApplicationOpening
    )
  );
};

export { updateApplicationOpening };
