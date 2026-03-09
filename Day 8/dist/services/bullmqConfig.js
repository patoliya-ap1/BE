import dotenv from "dotenv";
import { Queue, Worker } from "bullmq";
dotenv.config();
const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "") || 6379,
};
export { connection, Queue, Worker };
//# sourceMappingURL=bullmqConfig.js.map