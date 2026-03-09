import express from "express";
import { addPostsController, deletePostsController, getPostsController, updatePostsController, } from "../../controller/postsController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { roleBaseMiddleware } from "../../middleware/roleBaseMiddleware.js";
import { verifiedUserMiddleware } from "../../middleware/verifiedUserMiddleware.js";
export const postsRouter = express.Router();
// get
postsRouter.get("/", getPostsController);
// post
postsRouter.post("/", addPostsController);
// put
postsRouter.put("/:id", updatePostsController);
// delete
postsRouter.delete("/:id", authMiddleware, roleBaseMiddleware("admin"), deletePostsController);
//# sourceMappingURL=postsRoutes.js.map