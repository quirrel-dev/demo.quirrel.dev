import { NextApiRequest, NextApiResponse } from "next";
import emailQueue from "./queues/email";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body as { name: string; email: string };

  await emailQueue.enqueue(
    {
      recipient: email,
      name
    },
    {
      delay: 1 * 60 * 1000,
    }
  );

  res.status(200).end();
}
