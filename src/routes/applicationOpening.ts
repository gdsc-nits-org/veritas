import { Router } from "express";

import * as Middlewares from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.get("/", Controllers.ApplicationOpening.getAllApplicationOpenings);

router.get(
  "/:applicationOpeningId",
  Controllers.ApplicationOpening.getOneApplicationOpening
);

router.post(
  "/new",
  Middlewares.ApplicationOpening.DomainCheck,
  Middlewares.ApplicationOpening.applicationOpeningPurposeCheck,
  Middlewares.ApplicationOpening.applicationOpeningTitleCheck,
  Middlewares.ApplicationOpening.applicationOpeningDescriptionCheck,
  Controllers.ApplicationOpening.createApplicationOpening
);

router.patch(
  "/:applicationOpeningId",
  Middlewares.ApplicationOpening.DomainCheck,
  Middlewares.ApplicationOpening.applicationOpeningPurposeCheck,
  Middlewares.ApplicationOpening.applicationOpeningStatusCheck,
  Middlewares.ApplicationOpening.applicationOpeningTitleCheck,
  Middlewares.ApplicationOpening.applicationOpeningDescriptionCheck,
  Controllers.ApplicationOpening.updateApplicationOpening
);

export default router;
