import * as Controllers from "@controllers";
import * as Middlewares from "@middlewares";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Technology.getAllTechnologies);
router.get(
  "/:technologyNameOrId",
  Controllers.Technology.getTechnologyByNameOrId
);

router.patch(
  "/:technologyNameOrId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Technology.updateTechnology
);

router.post(
  "/create",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Technology.createTechnology
);
router.delete(
  "/:technologyNameOrId",
  Middlewares.Auth.checkAuth,
  Middlewares.Auth.minPermission("MODERATOR"),
  Controllers.Technology.deleteTechnology
);

export default router;
