import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

// ROOT = application/:applicationId/interviewSession

router.post(
  "/new",
  Middlewares.InterviewSession.interviewModeCheck,
  Middlewares.InterviewSession.interviewDateCheck,
  Middlewares.InterviewSession.interviewQuestionsCheck,
  Middlewares.InterviewSession.interviewUrlCheck,
  Middlewares.InterviewSession.interviewVenueCheck,
  Controllers.InterviewSession.createInterviewSession
);

export default router;
