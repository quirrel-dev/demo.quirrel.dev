import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Light as SyntaxHighligher } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Head from "next/head";

SyntaxHighligher.registerLanguage("typescript", ts);

export default function TaskManagement() {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Quirrel - Managed Queues</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@skn0tt" />
        <meta
          name="twitter:title"
          content="Quirrel, the Task Queueing solution for Vercel x Next.js"
        />
        <meta
          name="twitter:description"
          content="Quirrel is an easy-to-use task queuing solution for serverless deployments."
        />
      </Head>

      <main className={styles.main}>
        <h1>Advanced Job Options</h1>

        <h2>Managed Jobs</h2>
        <p className={styles.text}>
          Every job is assigned an ID that can be used to delete the job before
          execution:
          <SyntaxHighligher
            language="typescript"
            style={solarizedLight}
            className={styles.code}
          >
            {`
// /api/managedSignup.js
import emailQueue from "./queues/email"

export default async (req, res) => {
  const { jobId } = await emailQueue.enqueue(
    { ... },
    { delay: "1d" }
  )

  // later on ...
  await emailQueue.delete(jobId)
}
            `.trim()}
          </SyntaxHighligher>
        </p>

        <h2>Idempotent Jobs</h2>
        <p>
          If you don't want to execute a specific job twice, you can make them
          idempotent.
          <br />
          To do that, pass a <code>jobId</code> while creating the job:
          <SyntaxHighligher
            language="typescript"
            style={solarizedLight}
            className={styles.code}
          >
            {`
// /api/idempotent.js
import queue from "./queues/somequeue"

export default async (req, res) => {
  // create the first job
  await queue.enqueue(
    { ... },
    { delay: "1d", jobId: "foo" }
  )

  // create the second job
  await queue.enqueue(
    { ... },
    { delay: "1d", jobId: "foo" }
  )

  // only the first job will be executed!
}
            `.trim()}
          </SyntaxHighligher>
          If there's already another job with the same <code>jobId</code>, the
          second <code>enqueue</code> operation will be a no-op.
        </p>

        <h2>Try it out</h2>
        <p>
          In the example below, you can try out both idempotent jobs and job
          deletion.
          <br />
          On clicking the <i>Send</i> button, a new job with a delay of ten
          seconds and the email as it's <code>jobId</code> will be created. So
          no matter how often you click on the button during that ten second
          interval, you'll only receive one email. Additionally, you can click
          on the <i>Revoke</i> button to stop the ongoing job from executing, so
          you won't receive an email.
        </p>
        <form
          className={styles.form}
          onSubmit={async (evt) => {
            evt.preventDefault();

            await fetch("/api/submitManagedForm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });

            alert(
              "Success! If this is the first time you've pressed the button during ten seconds, you'll receive an email."
            );
          }}
        >
          <input
            type="email"
            placeholder="E-Mail"
            required
            name="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <button type="submit">Send</button>

          <button
            type="button"
            onClick={async () => {
              await fetch("/api/revokeManagedEmail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              });

              setEmail("");

              alert("You won't receive the email anymore.");
            }}
          >
            Revoke
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        Made with ❤️ by&nbsp;
        <a
          href="https://twitter.com/skn0tt"
          alt="Twitter: @skn0tt"
          target="_blank"
        >
          @skn0tt
        </a>
      </footer>
    </div>
  );
}
