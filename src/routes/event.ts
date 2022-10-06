import { Router } from "express";

import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Event.getAllEvents);
router.get("/:eventId", Controllers.Event.getEvent);

export default router;
