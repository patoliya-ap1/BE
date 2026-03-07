import express from "express";
import { initializeDatabase } from "./db/connect/db.connect.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { mainRouter } from "./routes/index-route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

initializeDatabase();
const Port = process.env.PORT || 7000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to mongodb crud server" });
});

app.use(express.static("public"));
app.use(
  "/images",
  express.static(
    path.join(__dirname, "controller", "assets", "compressedImages"),
  ),
);

app.use("/", mainRouter);

app.use(errorMiddleware);

app.all("/*fallback", (req, res) => {
  res.status(404).json({ success: false, message: "api route not found" });
});

app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
