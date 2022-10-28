import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

router.get("/", Controllers.Application.getallApplications);

router.get("/:applicationId", Controllers.Application.getOneApplication);

router.post(
  "/new",
  Middlewares.Application.applicantIdCheck,
  Middlewares.Application.resumeLinkCheck,
  Middlewares.Application.DomainCheck,
  Middlewares.Application.applicantAnswersCheck,
  Middlewares.Application.applicantMessageCheck,
  Controllers.Application.createApplicaton
);

router.patch(
  "/:applicationId",
  Middlewares.Application.applicationStatusCheck,
  Controllers.Application.updateApplication
);

export default router;
