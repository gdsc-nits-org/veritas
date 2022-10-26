import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Project.getAllProjects);
router.get(
  "/id/applications",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("CORE_MEMBER", "ONLY"),
  Controllers.Project.getProjectApplications
);
router.get("/:id", Controllers.Project.getProject);

router.put(
  "/update/:id",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Project.createProject
);

router.post(
  "/create",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR", "PREV_AND_CURR"),
  Controllers.Project.createProject
);
router.delete(
  "/delete/:id",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Project.deleteProject
);

export default router;
