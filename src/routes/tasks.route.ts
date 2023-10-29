import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import task from "../controllers/task.controller";

const router = Router();

router.post("/createTask");
router.get("/getAlltasks", authenticateToken, task.test);
router.get("/search-task");
router.put("/update-task");
router.delete("/deletetask");

export default router;
