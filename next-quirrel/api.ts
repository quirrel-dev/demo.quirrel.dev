import axios from "axios"

export async function createJob(endpoint: string, runAt: Date, body: any) {
    await axios.post("https://api.quirrel.dev/jobs", {
        endpoint,
        body,
        runAt: runAt.toISOString()
    })
}