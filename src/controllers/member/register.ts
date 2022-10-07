import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Utils from "@utils";
import * as Errors from "@errors";
import * as Success from "@success";
import { MemberDomain, Role } from "@prisma/client";

const register: Interfaces.Controller.Async = async (req, res, next) => {
  const {
    scholarId,
    password,
    image,
    domain,
    role,
    linkedInUrl,
    githubUrl,
    discordId,
    facebookUrl,
  } = req.body as Interfaces.Member.RegisterBody;

  let { year } = req.body as Interfaces.Member.RegisterBody;

  //---- Checks-----

  // Scholar ID checked by middleware
  // Password checked by middleware

  // Image
  if (!Utils.Url.urlValidate(image)) {
    return next(Errors.Member.invalidImageUrl);
  }

  // Domain
  if (!domain || typeof domain !== "string" || !(domain in MemberDomain)) {
    return next(Errors.Member.invalidDomain);
  }

  // Role
  if (!role || typeof role !== "string" || !(role in Role)) {
    return next(Errors.Member.invalidRole);
  }

  // Socials
  if (
    !Utils.Url.urlValidate(linkedInUrl) ||
    !Utils.Url.urlValidate(githubUrl) ||
    (facebookUrl && !Utils.Url.urlValidate(facebookUrl)) ||
    (discordId && !Utils.Discord.validateDiscordId(discordId))
  ) {
    return next(Errors.Member.invalidImageUrl);
  }

  // Year
  if (!year || year > new Date().getFullYear()) {
    year = new Date().getFullYear();
  }

  //--- Register ----

  await prisma.$transaction(async (prisma) => {
    await prisma.clubMember.create({
      data: {
        student: {
          connect: {
            scholarId,
          },
        },
        password,
        image,
        linkedInUrl,
        githubUrl,
        facebookUrl: facebookUrl ?? null,
        discordId: discordId ?? null,
        isAdmin: false,
      },
    });

    await prisma.tenure.create({
      data: {
        member: {
          connect: {
            scholarId,
          },
        },
        startYear: year!,
        domain,
        isModerator: false,
        isHead: false,
        position: "MEMBER",
        role,
      },
    });
  });

  res.json(Success.Member.registerSuccessful);
};

export { register };
