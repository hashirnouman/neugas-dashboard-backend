import { Request, Response } from "express";
import { signupService } from "../services/auth.service";
import { validationResult } from "express-validator";
class AuthController {
  private static instance: AuthController;

  private constructor() {}

  static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  signup(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    signupService(req, res);
  }

  login(req: Request, res: Response) {
    // Implement the login logic here
  }
}

export const auth = AuthController.getInstance();
