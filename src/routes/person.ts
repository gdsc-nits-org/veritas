import { Router } from "express";

import * as Middleware from "@middlewares";
import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.post(
  "/register",
  Middleware.Person.checkPersonalEmail,
  Middleware.Person.checkNotExists,
  Controllers.Person.register
);

router.get("/search", Controllers.Person.searchPerson);

export default router;
