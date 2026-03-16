import express from "express";
import {
  addPostsController,
  deletePostsController,
  getPostsController,
  likePostsController,
  updatePostsController,
} from "../../controller/postsController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { roleBaseMiddleware } from "../../middleware/roleBaseMiddleware.js";
import { postCacheMiddleware } from "../../middleware/postsCacheMiddleware.js";
export const postsRouter = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list posts.
 *     description: Retrieve a list of posts from mongoDB.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
postsRouter.get("/", postCacheMiddleware, getPostsController);

// post
postsRouter.post("/", addPostsController);

// like
postsRouter.post("/like/:id", likePostsController);

// put
postsRouter.put("/:id", updatePostsController);

// delete
postsRouter.delete(
  "/:id",
  authMiddleware,
  roleBaseMiddleware("admin"),
  deletePostsController,
);
