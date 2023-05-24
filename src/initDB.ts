import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts(
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        message TEXT NOT NULL,
        media_url TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      INSERT INTO users(username, password) VALUES('admin', 'password');
      INSERT INTO users(username, password) VALUES('test', 'test');
    `);

    await pool.query(`
      INSERT INTO posts(message, user_id) VALUES('Hello, world!', 1);
      INSERT INTO posts(message, user_id) VALUES('Hello, Test!', 2);
    `);

    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

initDB();
