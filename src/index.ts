import express, {
  Express,
  Request,
  Response,
  Application,
  urlencoded,
} from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import route from "./routes";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.use("/api", route);
