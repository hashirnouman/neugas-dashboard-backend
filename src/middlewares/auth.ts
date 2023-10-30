import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_SECRECT as string, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "INVALID TOKEN",
      });
    }
    console.log(user);

    // req.user = user; // Assign user to req.user
    next();
  });
}
