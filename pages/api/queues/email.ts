import { Queue } from "../../../next-quirrel";
import * as postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

interface EmailEnvelope {
  name: string;
  recipient: string;
}

export default Queue<EmailEnvelope>("queues/email", async (envelope) => {
  await client.sendEmailWithTemplate(
    new postmark.TemplatedMessage(
      "welcome@quirrel.dev",
      "welcome",
      {
        name: envelope.name,
      },
      envelope.recipient
    )
  );
});
