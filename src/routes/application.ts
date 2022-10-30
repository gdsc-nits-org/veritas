import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";
import interviewSession from "./interviewSession";

const router: Router = Router({ mergeParams: true });

router.get("/", Controllers.Application.getallApplications);

router.get(
  "/myApplications",
  Controllers.Application.getLoggedInUsersApplication
);

router.get("/:applicationId", Controllers.Application.getOneApplication);

router.post(
  "/new",
  Middlewares.Application.applicantIdCheck,
  Middlewares.Application.applicationOpeningIdCheck,
  Middlewares.Application.resumeLinkCheck,
  Middlewares.Application.applicantAnswersCheck,
  Middlewares.Application.applicantMessageCheck,
  Controllers.Application.createApplicaton
);

router.patch(
  "/:applicationId",
  Middlewares.Application.applicationStatusCheck,
  Controllers.Application.updateApplication
);

router.delete("/:applicationId", Controllers.Application.deleteApplication);

router.use("/:applicationId/interviewSession/", interviewSession);

export default router;
