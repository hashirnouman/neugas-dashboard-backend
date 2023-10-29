import prisma from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
let refreshTokens: any = [];
export const signupService = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await prisma.users.findMany({
      where: {
        OR: [
          {
            email: email,
          },
          { username: username },
        ],
      },
      select: {
        email: true,
        username: true,
      },
    });
    // using for loop instead of map beacuse map is asynchronous
    for (const user of existingUser) {
      if (user.email === email) {
        return res.json({
          success: false,
          message: "Email already taken",
        });
      }
      if (user.username === username) {
        return res.json({
          success: false,
          message: "Username already taken",
        });
      }
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
    const accessToken = generateToken({ email, password });
    const refreshToken = jwt.sign(
      { email, password },
      process.env.REFRESH_SECRET as string
    );
    return res.json({
      success: true,
      message: "User created successfully",
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export const loginService = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the email is already in use
    const data = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: username,
          },
        ],
      },
      select: {
        email: true,
        username: true,
        password: true,
      },
    });
    if (data?.email === username || data?.username === username) {
      const passwordCheck = await bcrypt.compareSync(
        password,
        data?.password as string
      );
      if (passwordCheck) {
        // Sign JWT asynchronously
        const token = generateToken({ username, password });

        const refreshToken = jwt.sign(
          { username, password },
          process.env.REFRESH_SECRET as string
        );

        refreshTokens.push(refreshToken);

        return res.json({
          success: true,
          message: "Login successfull",
          token: token,
          refreshToken: refreshToken,
        });
      } else {
        return res.json({
          success: true,
          message: "Wrong password",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "user doesn't exit",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error || "An error occurred",
    });
  }
};

export const refreshTokenService = async (req: Request, res: Response) => {
  const refreshToken: string = req.body.token;
  console.log(refreshToken);

  if (refreshToken == null)
    return res.status(401).json({
      success: false,
      message: "refresh token missing",
    });
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      success: false,
      message: "you don't have access",
    });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET as string,
    (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "error in generating token",
        });
      }
      const accessToken = generateToken({ user });
      return res.status(200).json({
        success: true,
        message: "token refresh successful",
        accessToken: accessToken,
      });
    }
  );
};

function generateToken(user: Object) {
  return jwt.sign(user, process.env.ACCESS_SECRECT as string, {
    expiresIn: "1h",
  });
}
