import axios from "axios"

export async function createJob(endpoint: string, runAt: Date, body: any) {
    await axios.post("https://api.repeater.dev/graphql", {
        query: `
        mutation CreateJob($name: String!, $endpoint: String!, $runAt: String!, $body: String!) {
            createJob(
                name: $name
                endpoint: $endpoint
                verb: "post"
                runAt: $runAt
                body: $body
            ) { name }
        }
        `,
        variables: {
            name: Date.now() + "",
            endpoint,
            runAt: runAt.toISOString(),
            body: JSON.stringify(body)
        }
    }, {
        headers: {
            Authorization: "Bearer " + process.env.REPEATER_TOKEN,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
}