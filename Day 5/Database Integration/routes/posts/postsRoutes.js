import express from "express";
import {
  addPostsController,
  deletePostsController,
  getPostsController,
  updatePostsController,
} from "../../controller/posts/postsController.js";
export const postsRouter = express.Router();

// get
postsRouter.get("/", getPostsController);

// post
postsRouter.post("/", addPostsController);

// put
postsRouter.put("/:id", updatePostsController);

// delete
postsRouter.delete("/:id", deletePostsController);
