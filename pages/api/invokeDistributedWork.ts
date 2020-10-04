import { NextApiRequest, NextApiResponse } from "next";
import distributedWorkQueue from "./queues/distributed-work";
import * as uuid from "uuid"

export default async function invokeDistributedWork(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const amount = Number(req.body);

  const pusherChannel = uuid.v4();

  const promises: Promise<any>[] = [];

  for (let i = 0; i < amount; i++) {
    promises.push(distributedWorkQueue.enqueue({
      pusherChannel
    }));
  }

  await Promise.all(promises);

  res.status(200).json({
    pusherChannel
  });
}
