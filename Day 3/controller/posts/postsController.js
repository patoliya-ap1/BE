const {
  getPosts,
  addPosts,
  updatePosts,
  deletePost,
} = require("../../dataService");
const AppError = require("../../utility/AppError");

// get
const getPostController = (req, res, next) => {
  const posts = getPosts();
  if (!posts) {
    const error = new AppError("error while getting post", 500);
    next(error);
  }
  res
    .status(200)
    .json({ success: true, message: "post fetched successfully.", posts });
};

// post

const addPostController = (req, res, next) => {
  const newPost = req.body;
  const newAddedPost = addPosts(newPost);
  if (!newAddedPost) {
    const error = new AppError("error while adding post", 500);
    next(error);
  }
  res.status(201).json({
    success: true,
    message: "new post added successfully.",
    newPost: newAddedPost,
  });
};

// put

const updatePostController = (req, res, next) => {
  const postId = req.params.id;
  const updateData = req.body;
  const updatedPost = updatePosts(postId, updateData);
  if (updatedPost == null) {
    const error = new AppError(`post not found with id ${postId}`, 404);
    return next(error);
  }
  if (!updatedPost) {
    const error = new AppError("error while update post", 500);
    return next(error);
  }
  res.status(200).json({
    success: true,
    message: "post updated successfully.",
    updatedPost,
  });
};

// delete

const deletePostController = (req, res, next) => {
  const postId = req.params.id;
  const deletedPost = deletePost(postId);
  if (deletedPost == null) {
    const error = new AppError(`post not found with id ${postId}`, 404);
    return next(error);
  }
  if (!deletedPost) {
    const error = new AppError("error while adding post", 500);
    return next(error);
  }
  res.status(201).json({
    success: true,
    message: "post deleted successfully.",
    deletedPost,
  });
};

module.exports = {
  getPostController,
  addPostController,
  updatePostController,
  deletePostController,
};
