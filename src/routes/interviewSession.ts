import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router({ mergeParams: true });

// ROOT = application/:applicationId/interviewSession

router.get("/", Controllers.InterviewSession.getAllInterviewSessions);

router.get(
  "/:interviewSessionId",
  Controllers.InterviewSession.getOneInterviewSession
);

router.post(
  "/new",
  Middlewares.InterviewSession.interviewModeCheck,
  Middlewares.InterviewSession.interviewDateCheck,
  Middlewares.InterviewSession.interviewQuestionsCheck,
  Middlewares.InterviewSession.interviewUrlCheck,
  Middlewares.InterviewSession.interviewVenueCheck,
  Controllers.InterviewSession.createInterviewSession
);

router.patch(
  "/:interviewSessionId",
  Middlewares.InterviewSession.interviewModeCheck,
  Middlewares.InterviewSession.interviewDateCheck,
  Middlewares.InterviewSession.interviewQuestionsCheck,
  Middlewares.InterviewSession.interviewUrlCheck,
  Middlewares.InterviewSession.interviewVenueCheck,
  Controllers.InterviewSession.updateInterviewSession
);

router.delete(
  "/:interviewSessionId",
  Controllers.InterviewSession.deleteInterviewSession
);

export default router;
