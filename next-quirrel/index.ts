import { NextApiRequest, NextApiResponse } from "next";
import { createJob } from "./repeater"

const baseUrl = "https://" + (process.env.VERCEL_URL || "localhost:3000") + "/api/"

interface EnqueueMeta {
    // milliseconds to delay
    delay: number;
}

type Enqueue<Payload> = (payload: Payload, meta?: EnqueueMeta) => Promise<void>;
type QueueResult<Payload> = { enqueue: Enqueue<Payload> };

export function Queue<Payload>(path: string, handler: (payload: Payload) => Promise<void>): QueueResult<Payload> {
    async function nextApiHandler(req: NextApiRequest, res: NextApiResponse) {
        const { body } = req.body as { body: Payload };
        console.log(`Received job to ${path}: `, body);
        await handler(body);
    }

    nextApiHandler.enqueue = async (payload: Payload, meta?: EnqueueMeta) => {
        let runAt = new Date();
        if (meta) {
            runAt = new Date(+runAt + meta.delay);
        }

        console.log("URL: ", baseUrl + path)

        await createJob(baseUrl + path, runAt, { body: payload });
        console.log(`Created job for ${path} to run at ${runAt.toISOString()}.`);
    }

    return nextApiHandler;
}