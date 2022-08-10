import { Router } from "express";

import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.EventController.getAllEvents);
router.get("/:eventId", Controllers.EventController.getEvent);

export default router;
