import { Router } from "express";
import taskRoutes from "./tasks.route";
import authRoutes from "./auth.route";

const route = Router();
route.use("/task", taskRoutes);
route.use("/auth", authRoutes);
export default route;
