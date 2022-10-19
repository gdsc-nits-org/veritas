import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

// ROOT = /event/:eventId/session

router.get("/", Controllers.Session.getAllSessionsOfTheEvent);

router.get(
  "/:sessionId",
  Middlewares.Session.checkSessionExist,
  Controllers.Session.getSessionsOfTheEvent
);

router.post(
  "/new",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Controllers.Session.createNewSession
);

router.post(
  "/:sessionId/attend",
  Middlewares.Person.checkPersonalEmail,
  Middlewares.Person.checkExists,
  Middlewares.Session.checkSessionExist,
  Middlewares.Session.checkAlreadyAttended,
  Middlewares.Session.checkSessionEndTime,
  Controllers.Session.attendSession
);

router.patch(
  "/:sessionId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Middlewares.Session.checkSessionExist,
  Controllers.Session.updateSession
);

router.delete(
  "/:sessionId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("HEAD"),
  Middlewares.Session.checkSessionExist,
  Controllers.Session.deleteSession
);

export default router;
