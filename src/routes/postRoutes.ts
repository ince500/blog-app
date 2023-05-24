import express, { Request, Response } from "express";
import postController from "../controllers/postController";
import auth from "../middlewares/auth";

const postRoutes = express.Router();

postRoutes.post("/post", auth, async (req: Request, res: Response) => {
  await postController.createPost(req, res);
});

postRoutes.get("/posts", auth, async (req: Request, res: Response) => {
  await postController.getPosts(req, res);
});

postRoutes.put("/post:id", auth, async (req: Request, res: Response) => {
  await postController.updatePost(req, res);
});

postRoutes.delete("/post:id", auth, async (req: Request, res: Response) => {
  await postController.deletePost(req, res);
});

export default postRoutes;
