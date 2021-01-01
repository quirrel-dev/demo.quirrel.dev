# Quirrel 
Quirrel is the Task Queueing solution for Next.js x Vercel.

Serverless deployments simplify a lot of things, but task queueing isn't one of them. With Quirrel, creating a queue becomes as simple as this:

```ts
// /api/queues/email.js
import { Queue } from "quirrel/next"

export default Queue(
  "api/queues/email",
  async payload => {
    await email.send( ... )
  }
)
```

This can then easily be used from other files:

```ts
// /api/signup.js
import emailQueue from "./queues/email"

export default async (req, res) => {
  await createUser(...);

  await emailQueue.enqueue({
    recipient: req.body.email,
    subject: "How was your first day with Quirrel?",
    ...
  }, {
    delay: "1d"
  })
}
```

In this example, the "Welcome" email is scheduled to be sent after one day. This wouldn't be possible without Quirrel!

Quirrel is currently in active development. I'll post updates [on Twitter](https://twitter.com/skn0tt). Go check out https://quirrel.dev for a proof of concept!
