import * as Controllers from "@controllers";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.get("/all", Controllers.Project.getAllProjects);
router.get("/:id", Controllers.Project.getProject);
router.put("/update/:id", Controllers.Project.updateProject);
router.post("/create", Controllers.Project.createProject);
router.delete("/delete/:id", Controllers.Project.deleteProject);

export default router;
