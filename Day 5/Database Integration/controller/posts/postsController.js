import { PostModel } from "../../models/posts.model.js";
import { AppError } from "../../utility/AppError.js";

export const getPostsController = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      const err = new AppError("error while fetching post", 400);
      return next(err);
    }
    res
      .status(200)
      .json({ success: true, message: "posts fetched successfully.", posts });
  } catch (error) {
    next(error);
  }
};

export const addPostsController = async (req, res, next) => {
  const postData = req.body;
  try {
    const newPost = new PostModel(postData);
    const savedPost = await newPost.save();
    if (!savedPost) {
      const err = new AppError("error while creating post", 400);
      return next(err);
    }
    res.status(201).json({
      success: true,
      message: "new post created successfully.",
      newPost: savedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePostsController = async (req, res, next) => {
  const postId = req.params.id;
  const postUpdateData = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      postUpdateData,
      { new: true ,runValidators:true},
    );
    if (!updatedPost) {
      const err = new AppError("error while updating post", 400);

      return next(err);
    }
    res.status(201).json({
      success: true,
      message: "new post created successfully.",
      updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePostsController = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      const err = new AppError("error while deleting post", 400);
      return next(err);
    }
    res.status(200).json({
      success: false,
      message: "post deleted successfully.",
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
