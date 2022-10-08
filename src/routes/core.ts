import { Router } from "express";

import * as Middlewares from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.post(
  "/new",
  Middlewares.Member.checkExists,
  Middlewares.Student.checkScholarId,
  Middlewares.Core.roleCheck,
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR", "PREV_AND_CURR"),
  Controllers.Core.promote
);

export default router;
