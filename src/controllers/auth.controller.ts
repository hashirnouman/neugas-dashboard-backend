import { Request, Response } from "express";

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
    const { name } = req.body;
    res.send(name);
  }

  login(req: Request, res: Response) {
    // Implement the login logic here
  }
}

export const auth = AuthController.getInstance();
