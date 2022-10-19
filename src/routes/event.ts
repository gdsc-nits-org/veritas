import { Router } from "express";

import * as Routes from "@routes";
import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

router.get("/", Controllers.Event.getAllEvents);

router.get(
  "/:eventId/registrations",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Middlewares.Event.checkEventExist,
  Controllers.Event.getEventRegistrations
);

router.get(
  "/:eventId",
  Middlewares.Event.checkEventExist,
  Controllers.Event.getEvent
);

router.post(
  "/new",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Controllers.Event.createEvent
);

router.post(
  "/:eventId/rsvp",
  Middlewares.Person.checkPersonalEmail,
  Middlewares.Person.checkExists,
  Middlewares.Event.checkEventExist,
  Middlewares.Event.checkAlreadyRegistered,
  Controllers.Event.rsvpForEvent
);

router.use(
  "/:eventId/session",
  Middlewares.Event.checkEventExist,
  Routes.Session
);

router.patch(
  "/:eventId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Middlewares.Event.checkEventExist,
  Controllers.Event.updateEvent
);

router.delete(
  "/:eventId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("HEAD"),
  Middlewares.Event.checkEventExist,
  Controllers.Event.deleteEvent
);

export default router;
