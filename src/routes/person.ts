import { Router } from "express";

import * as Middleware from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.post(
  "/register",
  Middleware.Email.check,
  Middleware.Person.checkNotExists,
  Controllers.Person.register
);

export default router;
