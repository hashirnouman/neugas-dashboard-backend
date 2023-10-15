import express, { Express, Request, Response, Application } from "express";
import * as dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript! helo");
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
