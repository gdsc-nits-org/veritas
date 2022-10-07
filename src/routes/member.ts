import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router();

router.post(
  "/register",
  Middlewares.Student.checkScholarId,
  Middlewares.Member.checkPasswordValidity,
  Middlewares.Student.checkExists,
  Middlewares.Member.checkNotExists,
  Controllers.Member.register
);

router.get("/search", Controllers.Member.searchMember);

export default router;
