import { Request, Response } from "express";
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
    console.log("");
  }
}

const task = TaskController.getInstance();

export default task;
