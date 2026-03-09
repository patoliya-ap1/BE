import mongoose from "mongoose";

// validation remember
// require,enum,min,max,unique

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    body: { type: String, required: [true, "body is required"] },
    tags: { type: [String], default: [] },
    views: { type: Number },
    userId: {
      type: Number,
      min: [100, "userid should be 100 or more in number"],
    },
  },
  { timestamps: true },
);

export const PostModel = mongoose.model("posts", postSchema);
