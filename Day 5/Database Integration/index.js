import express from "express";
import { initializeDatabase } from "./db/connect/db.connect.js";
import { postsRouter } from "./routes/posts/postsRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

initializeDatabase();
const Port = process.env.PORT || 7000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to mongodb crud server" });
});

app.use("/posts", postsRouter);
app.use(errorMiddleware);

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await PostModel.find();

//     res
//       .status(200)
//       .json({ success: true, message: "posts fetched successfully.", posts });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/posts", async (req, res) => {
//   const postData = req.body;
//   try {
//     const newPost = new PostModel(postData);
//     const savedPost = await newPost.save();
//     res.status(201).json({
//       success: true,
//       message: "new post created successfully.",
//       newPost: savedPost,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.put("/posts/:id", async (req, res) => {
//   const postId = req.params.id;
//   const postUpdateData = req.body;
//   try {
//     const updatedPost = await PostModel.findByIdAndUpdate(
//       postId,
//       postUpdateData,
//       { new: true },
//     );
//     res.status(201).json({
//       success: true,
//       message: "new post created successfully.",
//       updatedPost,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete("/posts/:id", async (req, res) => {
//   const postId = req.params.id;
//   try {
//     const deletedPost = await PostModel.findByIdAndDelete(postId);
//     res.status(200).json({
//       success: false,
//       message: "post deleted successfully.",
//       deletedPost,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.all("/*fallback", (req, res) => {
  res.status(404).json({ success: false, message: "api route not found" });
});

app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
