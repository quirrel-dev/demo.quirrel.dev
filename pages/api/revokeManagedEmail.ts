import { NextApiRequest, NextApiResponse } from "next";
import managedEmailQueue from "./queues/managed-email";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body as { email: string };

  await managedEmailQueue.delete(email);

  res.status(200).end();
}
