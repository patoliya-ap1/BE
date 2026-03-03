import express from "express";
import { initializeDatabase } from "./db/connect/db.connect.js";
import { postsRouter } from "./routes/posts/postsRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { authRouter } from "./routes/auth/authRoutes.js";
initializeDatabase();
const Port = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to mongodb crud server" });
});
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use(errorMiddleware);
app.all("/*fallback", (req, res) => {
    res.status(404).json({ success: false, message: "api route not found" });
});
app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`);
});
//# sourceMappingURL=index.js.map