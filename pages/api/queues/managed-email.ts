import { Queue } from "quirrel/next";
import * as postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

interface EmailEnvelope {
  recipient: string;
}

export default Queue<EmailEnvelope>(
  "api/queues/managed-email",
  async (envelope) => {
    await client.sendEmailWithTemplate(
      new postmark.TemplatedMessage(
        "managed@quirrel.dev",
        "managed",
        {},
        envelope.recipient
      )
    );
  }
);
