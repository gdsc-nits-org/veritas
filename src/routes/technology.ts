import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Technology.getAllTechnologies);
router.get("/:name", Controllers.Technology.getTechnologyByName);

router.put(
  "/update/:id",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Technology.updateTechnology
);

router.post(
  "/create",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR", "PREV_AND_CURR"),
  Controllers.Technology.createTechnology
);
router.delete(
  "/delete/:id",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Technology.deleteTechnology
);

export default router;
