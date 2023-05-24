import { Request, Response } from 'express';
import postService from '../services/postService';

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1; // Текущая страница
  const pageSize = Number(req.query.pageSize) || 20; // Размер страницы

  try {
    const posts = await postService.getPosts(page, pageSize);
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  try {
    const post = await postService.updatePost(postId, req.body);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  try {
    const deleted = await postService.deletePost(postId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
