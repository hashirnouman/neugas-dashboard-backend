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
app.listen(port, async () => {
  const data = await prisma.users.updateMany({
    where: { first_name: "hashir" },
    data: { last_name: "nouman" },
  });
  console.log(data);
  console.log(`Server is Fire at http://localhost:${port}`);
});
