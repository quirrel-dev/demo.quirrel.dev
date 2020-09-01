import { Queue } from "../../../next-quirrel"
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailEnvelope {
    recipient: string;
    subject: string;
    body: string;
}

export default Queue<EmailEnvelope>("queues/email", async (envelope) => {
    await sgMail.send({
        from: "quirrel@quirrel.com",
        to: envelope.recipient,
        subject: envelope.subject,
        text: envelope.body
    })
});