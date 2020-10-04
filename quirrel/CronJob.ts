import { NextApiHandler } from "next";

export function CronJob(
  schedule: string,
  worker: () => Promise<void>
): NextApiHandler {
  return async function (req, res) {
    // check signature
    await worker();
  };
}
