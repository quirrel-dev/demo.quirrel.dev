import { NextApiRequest, NextApiResponse } from "next";
import managedEmailQueue from "./queues/managed-email";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body as { email: string };

  await managedEmailQueue.enqueue(
    {
      recipient: email,
    },
    {
      delay: 10 * 1000,
      id: email,
    } as any
  );

  res.status(200).end();
}
