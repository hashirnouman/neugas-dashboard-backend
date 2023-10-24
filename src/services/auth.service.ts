import prisma from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const signupService = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    await prisma.users.create({
      data: {
        first_name: firstname,
        last_name: lastname,
        email,
        username,
        password: hashedPassword,
      },
    });

    // Sign JWT asynchronously
    const token = await jwt.sign(
      { email, password },
      process.env.ACCESS_SECRECT as string,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error || "An error occurred",
    });
  }
};
