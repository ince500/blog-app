import express from "express";
import userService from "../services/userService";
import jwt from "jsonwebtoken";

const userController = express.Router();

userController.post("/register", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

userController.post("/login", async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.body.username);
    if (
      user &&
      (await userService.comparePasswords(req.body.password, user.password))
    ) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      res.json({ token });
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default userController;
