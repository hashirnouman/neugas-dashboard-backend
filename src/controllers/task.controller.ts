import { Request, Response } from "express";
import {
  loginService,
  refreshTokenService,
  signupService,
} from "../services/auth.service";
import { validationResult } from "express-validator";
class TaskController {
  private static instance: TaskController;

  private constructor() {}

  static getInstance(): TaskController {
    if (!TaskController.instance) {
      TaskController.instance = new TaskController();
    }
    return TaskController.instance;
  }
  test(req: Request, res: Response) {
    return res.send(req.body.user);
  }
}

const task = TaskController.getInstance();

export default task;
