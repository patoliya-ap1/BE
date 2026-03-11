import { LikeModel } from "../models/likes.model.js";
import { PostModel } from "../models/posts.model.js";
import { AppError } from "../utility/AppError.js";
import type { Request, Response, NextFunction } from "express";

export const getPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

export const addPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

export const updatePostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id;
  const postUpdateData = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      postUpdateData,
      { new: true, runValidators: true },
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

export const deletePostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

export const likePostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id || "";
  const { userId } = req.body;
  try {
    const alreadyLiked = await LikeModel.findOne({ postId, userId });

    if (alreadyLiked) {
      return res.status(409).json({
        success: true,
        message: `you already like this post ${postId}`,
      });
    }

    const newLike = new LikeModel({ postId, userId });
    const savedLike = await newLike.save();
    if (!savedLike) {
      const err = new AppError("error while like post", 400);
      return next(err);
    }
    res
      .status(201)
      .json({ success: true, message: `you liked this post ${postId}` });
  } catch (error) {
    next(error);
  }
};
