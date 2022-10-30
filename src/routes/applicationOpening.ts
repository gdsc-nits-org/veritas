import { Router } from "express";

import * as Middlewares from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.post(
  "/new",
  Middlewares.ApplicationOpening.DomainCheck,
  Middlewares.ApplicationOpening.applicationOpeningPurposeCheck,
  Middlewares.ApplicationOpening.applicationOpeningTitleCheck,
  Middlewares.ApplicationOpening.applicationOpeningDescriptionCheck,
  Controllers.ApplicationOpening.createApplicationOpening
);

export default router;
