import { Router } from "express";

const router = Router();

router.post("/createTask");
router.get("/getAlltasks");
router.get("/search-task");
router.put("/update-task");
router.delete("/deletetask");

export default router;
