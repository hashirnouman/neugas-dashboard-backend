import { Request, Response } from "express";
import { signupService } from "../services/auth.service";

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
    signupService(req, res);
  }

  login(req: Request, res: Response) {
    // Implement the login logic here
  }
}

export const auth = AuthController.getInstance();
