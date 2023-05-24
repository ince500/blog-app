import { Pool } from 'pg';
import { Post } from '../models/post';

const pool = new Pool();

const createPost = async (post: Post) => {
  try {
    const { message, author } = post;
    const query = 'INSERT INTO posts (message, author) VALUES ($1, $2) RETURNING *';
    const values = [message, author];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error creating post');
  }
};

const getPosts = async (page: number, pageSize: number) => {
  // тут можно еще сортировки и фильтры добавить
  const offset = (page - 1) * pageSize;
  try {
    const query = `
      SELECT * FROM posts
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const values = [pageSize, offset];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

const updatePost = async (postId: number, updatedPost: Partial<Post>) => {
  try {
    const { message, author } = updatedPost;
    const query = `
      UPDATE posts
      SET message = $1, author = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [message, author, postId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error updating post');
  }
};

const deletePost = async (postId: number) => {
  try {
    const query = 'DELETE FROM posts WHERE id = $1';
    const values = [postId];
    const { rowCount } = await pool.query(query, values);
    return rowCount > 0;
  } catch (error) {
    throw new Error('Error deleting post');
  }
};

export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
