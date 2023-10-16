import express, { Express, Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript! helo");
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
