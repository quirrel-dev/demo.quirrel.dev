import { createApolloFetch } from "apollo-fetch"

const fetch = createApolloFetch({
    uri: "https://api.repeater.dev/graphql",
    
    
})

fetch.use(({ options }, next) => {
    if (!options.headers) {
        options.headers = {}
    }

    options.headers["authorization"] = process.env.REPEATER_TOKEN;

    next()
})

export async function createJob(endpoint: string, runAt: Date, body: any) {
    await fetch({
        query: `mutation {
            createJob(
                name: "${Date.now()}"
                endpoint: "${endpoint}"
                verb: "post"
                runAt: "${runAt.toISOString()}"
                body: "${JSON.stringify(body)}"
            )
        }`
    })
}