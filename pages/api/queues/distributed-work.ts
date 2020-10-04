import { Queue } from "@quirrel/next";
import Pusher from "pusher"

const pusher = new Pusher(JSON.parse(process.env.PUSHER_SERVER_CONFIG));

function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

interface DistributedWorkPayload {
  pusherChannel: string;
}

export default Queue<DistributedWorkPayload>("queues/distributed-work", async ({ pusherChannel }) => {
  const timeout = (Math.random()) + 1 * 1000;

  pusher.trigger(pusherChannel, "started", null);
  await delay(timeout);
  pusher.trigger(pusherChannel, "ended", null);
});
