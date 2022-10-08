import { Router } from "express";

import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";

const router: Router = Router();

router.post(
  "/chapter/declare",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("LEAD", "ONLY"),
  Controllers.Lead.declareNewChapter
);

export default Router;
