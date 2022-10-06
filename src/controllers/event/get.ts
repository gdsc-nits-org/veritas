import { Request, Response } from "express";
import { prisma } from "@utils/prisma";

import * as Errors from "@errors";
import * as Utils from "@utils";

async function getEvent(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return res.json(Errors.Event.eventNotFound);
    }

    return res.json(Utils.Response.Success(event));
  } catch (err) {
    console.log(err);
    return res.json(Errors.System.serverError);
  }
}

async function getAllEvents(req: Request, res: Response) {
  try {
    const { page, amount } = req.query;

    const events = await prisma.event.findMany({
      skip: page ? parseInt(amount as string) * parseInt(page as string) : 0,
      take: amount ? parseInt(amount as string) : 0,
    });

    return res.json(Utils.Response.Success(events));
  } catch (err) {
    console.log(err);
    return res.json(Errors.System.serverError);
  }
}

export { getEvent, getAllEvents };
