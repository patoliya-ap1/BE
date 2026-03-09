const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");

const { postsRouter } = require("./routers/posts/postRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Posts CRUD server" });
});

app.get("/error", (req, res, next) => {
  const err = new AppError("My Custom error", 500);
  next(err);
});

app.use("/posts", postsRouter);

app.use(errorMiddleware);

app.all("/*fallback", (req, res, next) => {
  res.status(404).json({ message: "api route not found" });
});

const Port = 8000;
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
