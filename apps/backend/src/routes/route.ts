import { Router } from "express";
const router = Router();
import { createProject, getProjects, getProjectsById } from "../controllers/project-controller";
import { AuthMiddleware } from "../middlewares/middleware";

router.post("/new/project", createProject);
router.get("/projects", AuthMiddleware, getProjects);
router.get("/projects/:id", AuthMiddleware, getProjectsById);

export default router;