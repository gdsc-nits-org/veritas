import { Router } from "express";

import * as Middleware from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router();

router.post(
  "/register",
  Middleware.Person.checkPersonalEmail,
  Middleware.Person.checkExists,
  Middleware.Student.checkScholarId,
  Middleware.Student.checkInstituteEmail,
  Middleware.Student.checkNotExists,
  Controllers.Student.register
);

router.get("/check", Controllers.Student.checkStudent);
router.get("/search", Controllers.Student.searchStudent);

// TODO: Delete student, given admin priviledge
// TODO: Branch change update student details

export default router;
