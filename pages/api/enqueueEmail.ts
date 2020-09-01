import { NextApiRequest, NextApiResponse } from "next"
import emailQueue from "./queues/email";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, recipient } = req.body as { name: string, recipient: string };

  await emailQueue.enqueue({
    recipient,
    subject: `Greetings, ${name}!`,
    body: `
Greetings, ${name}!

This E-Mail has been sent by a Next.js App that's running on Vercel.
What's amazing about it is that it's been delayed by about 5 minutes - doesn't sound too fancy,
but given the serverless nature of Vercel deployments, it's astonishing indeed.
This has been made possible by using Quirrel, the task queueing solution for serverless deployments.
It's incredibly easy, go checkout the code!

Sincerely
Simon
    `.trim()
  }, {
    delay: 5 * 60 * 1000
  });

  res.status(200).end();
}
