import { Router } from "express";

import * as Controllers from "@controllers";

const router: Router = Router({ mergeParams: true });

router.post("/new", Controllers.Application.createApplicaton);

export default router;
