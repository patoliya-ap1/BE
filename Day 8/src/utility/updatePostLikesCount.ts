import { LikeModel } from "../models/likes.model.js";
import { PostModel } from "../models/posts.model.js";

export const updatePostLikesCount = async () => {
  const postIds = await PostModel.find({}, { postId: 1 });
  postIds.forEach(async ({ _id: postId }) => {
    const likeCount = await LikeModel.find({ postId }).countDocuments();
    const updatePost = await PostModel.findByIdAndUpdate(
      postId,
      { likeCount },
      { returnDocument: "after" },
    );
  });
};
