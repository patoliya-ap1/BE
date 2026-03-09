import { Worker, connection } from "../services/bullmqConfig.js";
import { transporter } from "../services/emailService.js";
const sendEmail = async (emailData) => {
    const mailSend = await transporter.sendMail({
        to: emailData.email,
        subject: emailData.subject,
        html: emailData.template,
    });
};
const worker = new Worker("emailQueue", async (job) => {
    const { email, subject, template } = job.data;
    await sendEmail({ email, subject, template });
    return "Email processes successfully";
}, { connection });
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
});
worker.on("failed", (job, error) => {
    console.error(`Job ${job?.id} failed with error: ${error.message}`);
});
console.log("Welcome Email worker started. listening for jobs.");
//# sourceMappingURL=emailWorker.js.map