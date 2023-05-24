import express from "express";
import userController from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.use("/user", userController);

export default userRoutes;
