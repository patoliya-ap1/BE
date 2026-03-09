const express = require("express");
const AppError = require("../../utility/AppError");
const {
  getPostController,
  addPostController,
  updatePostController,
  deletePostController,
} = require("../../controller/posts/postsController");

const postsRouter = express.Router();

// get

postsRouter.get("/", getPostController);

// post

postsRouter.post("/", addPostController);

// put

postsRouter.put("/:id", updatePostController);

// delete

postsRouter.delete("/:id", deletePostController);

module.exports = { postsRouter };
