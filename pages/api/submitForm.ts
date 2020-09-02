import { NextApiRequest, NextApiResponse } from "next";
import emailQueue from "./queues/email";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, recipient, subscribe } = req.body as { name: string; recipient: string, subscribe: boolean };

  await emailQueue.enqueue(
    {
      recipient,
      name,
      subscribe
    },
    {
      delay: 5 * 60 * 1000,
    }
  );

  res.status(200).end();
}
