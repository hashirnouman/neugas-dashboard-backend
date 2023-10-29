import { Request, Response } from "express";
import {
  loginService,
  refreshTokenService,
  signupService,
} from "../services/auth.service";
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
  /**
   * user signup method with data validations
   */
  signup(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    signupService(req, res);
  }

  login(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    loginService(req, res);
  }
  refresh(req: Request, res: Response) {
    refreshTokenService(req, res);
  }
}

export const auth = AuthController.getInstance();
