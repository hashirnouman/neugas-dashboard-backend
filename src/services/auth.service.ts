import prisma from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupService = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (email.length == 0) {
    res.status(401).send("Email is required");
    return;
  }
};
