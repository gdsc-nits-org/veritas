import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Event.getAllEvents);
router.get("/:eventId", Controllers.Event.getEvent);
router.post(
  "/new",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Controllers.Event.createEvent
);
router.post(
  "/:eventId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission(),
  Controllers.Event.updateEvent
);

export default router;
