import prisma from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupService = (req: Request, res: Response) => {
  const { firstname, lastname, username, email, password } = req.body;
  prisma.users
    .create({
      data: {
        first_name: firstname,
        last_name: lastname,
        email,
        username,
        password,
      },
    })
    .then(() => {
      res.json({
        success: true,
        message: "hello",
      });
    });
};
