import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.post("/register");
router.get("/details/:personalEmail");
router.patch("/details/:personalEmail/update");

export default router;
