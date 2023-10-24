import { Router } from "express";
import * as dotenv from "dotenv";
import { auth } from "../controllers/auth.controller";
import { loginValidationRules, signupValidationRules } from "../validators/auth.pipe";
const router = Router();
router.post("/signup", signupValidationRules(), auth.signup);
router.post("/login", loginValidationRules(), auth.login);

export default router;
