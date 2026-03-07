import { Worker, connection } from "../services/bullmqConfig.js";
import { transporter } from "../services/emailService.js";
import { smsClient } from "../services/smsService.js";
import type { EmailData, SmsData } from "../utility/Type.js";

const sendSend = async(smsData: SmsData) => {
      const smsSend = await smsClient.messages.create({
        body: smsData.body,
        to: smsData.to,
        from: smsData.from,
      });
};


const worker = new Worker(
  "sendVerificationSMS",
  async (job) => {
    const { body, to, from } = job.data;
    // await sendEmail({ email, subject, template });
    return "Email processes successfully";
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed with error: ${error.message}`);
});

console.log("Welcome Email worker started. listening for jobs.");
