import express from "express";
import { initializeDatabase } from "./db/config/db.connect.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { mainRouter } from "./routes/index-route.js";
import { logger } from "./utility/logger.js";
import helmet from "helmet";
import { limiter } from "./utility/rate-limit.js";
import { eventEmitter } from "./services/eventEmitter.js";
import { welcomeEmailJob } from "./utility/welcomeEmailJob.js";
import { initializeRedisCache } from "./services/redisCacheClient.js";
import { scheduleUpdateLikeCount } from "./utility/scheduleUpdateLikeCount.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

initializeDatabase();
initializeRedisCache();

const Port = process.env.PORT || 7000;
const app = express();
app.use(express.json());

//  HTTP security headers
app.use(helmet());

// limiter
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to mongodb crud Node.js server" });
});

// get uploaded image from server

app.use(express.static("public"));
app.use(
  "/images",
  express.static(path.join(__dirname, "assets", "compressedImages")),
);

app.use("/", mainRouter);

// error middleware

app.use(errorMiddleware);

// handle invalid routes

app.all("/*fallback", (req, res) => {
  res.status(404).json({ success: false, message: "api route not found" });
});

// welcome email event emitter

eventEmitter.on("user.signup", welcomeEmailJob);

// update like count

scheduleUpdateLikeCount();

// logger
logger.info("server is running");

// server listening port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
