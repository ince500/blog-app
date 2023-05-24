import bcrypt from "bcryptjs";
import { User } from "../models/user";
import pool from "../config/db";

const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [user.username, hashedPassword]
  );
  return result.rows[0];
};

const getUserByUsername = async (username: string) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default {
  createUser,
  getUserByUsername,
  comparePasswords,
};
