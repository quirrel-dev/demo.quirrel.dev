import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Light as SyntaxHighligher } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Layout } from "../layout/Layout";
import Pusher from "pusher-js";

SyntaxHighligher.registerLanguage("typescript", ts);

export default function ETLExample() {
  const [amountOfJobs, setAmountOfJobs] = useState("");

  const [startedJobs, setStartedJobs] = useState(0);
  const [endedJobs, setEndedJobs] = useState(0);

  return (
    <Layout>
      <h1>Distribute work across Lambdas</h1>

      <p>
        In some scenarios, a lot of long-running work needs to be done in
        parallel. Quirrel Queues can be used to easily distribute it across
        multiple lambdas:
      </p>

      <SyntaxHighligher
        language="typescript"
        style={solarizedLight}
        className={styles.code}
      >
        {`
// api/queues/work
export default Queue(
  "queues/work",
  async (payload) => {
    await someLongRunningTask()
  }
)

// in another API route ...
import workQueue from "api/queues/work"

for (const item of items) {
  await workQueue.enqueue(item)
}
    `.trim()}
      </SyntaxHighligher>

      <h2>Try it out</h2>
      <p>
        In the example below, you can enter an amount of individual jobs to be
        dispatched. To simulate a long-running task, every job will wait for a
        random amount of time between 0 and 2 seconds before completing.
      </p>
      <form
        className={styles.form}
        onSubmit={async (evt) => {
          evt.preventDefault();

          if (!+amountOfJobs) {
            window.alert("Please enter a valid amount of jobs.");
            return;
          }

          const result = await fetch("/api/invokeDistributedWork", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: amountOfJobs,
          });

          const { pusherChannel } = await result.json()

          const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY, {
            cluster: "eu",
          });

          var channel = pusher.subscribe(pusherChannel);
          channel.bind("started", function () {
            setStartedJobs(v => v + 1);
          });
          channel.bind("ended", function () {
            setEndedJobs(v => v + 1);
          });
        }}
      >
        <input
          type="number"
          placeholder="Amount of Jobs"
          required
          name="email"
          value={amountOfJobs}
          onChange={(evt) => setAmountOfJobs(evt.target.value)}
        />
        <button type="submit">Dispatch</button>

        <p>
          Started Jobs: {startedJobs}
          <br/>
          Finished Jobs: {endedJobs}
        </p>
      </form>
    </Layout>
  );
}
