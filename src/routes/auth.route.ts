import { Router } from "express";
import * as dotenv from "dotenv";
import { auth } from "../controllers/auth.controller";
const router = Router();
router.post("/signup", auth.signup);
router.post("/login");

export default router;
