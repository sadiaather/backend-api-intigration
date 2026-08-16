import express from "express";
import { Router } from "express";

import { createProject, updateProject } from "../controllers/ProjectController.js";
import { authentication } from "../middlewares/auth.js";
import { allProjects } from "../controllers/ProjectController.js"
import { deleteProject } from "../controllers/ProjectController.js";

const router = Router()

router.post("/addproject",authentication, createProject)
router.get("/allprojects",allProjects)
router.delete("/deleteproject/:id",authentication,deleteProject)
router.put("/updateproject/:id",authentication,updateProject)


export default router