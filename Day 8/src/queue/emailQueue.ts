import { Queue, connection } from "../services/bullmqConfig.js";

export const emailQueue = new Queue("emailQueue", { connection });
