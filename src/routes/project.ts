import { createProject } from "@controllers/project/add";
import { deleteProject } from "@controllers/project/delete";
import { getAllProjects, getProject } from "@controllers/project/get";
import { updateProject } from "@controllers/project/update";
import { Router } from "express";

const router: Router = Router();

router.get("/all", getAllProjects);
router.get("/:id", getProject);
router.put("/update/:id", updateProject);
router.post("/create", createProject);
router.delete("/delete/:id", deleteProject);

export default router;
