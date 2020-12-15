import styles from "../styles/Home.module.css";
import { Light as SyntaxHighligher } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Layout } from "../layout/Layout";

SyntaxHighligher.registerLanguage("typescript", ts);

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <span>Quirrel!</span>
      </h1>

      <p className={styles.description}>
        Quirrel is the Task Queueing solution
        <br />
        for Next.js x Vercel.
      </p>

      <p className={styles.text}>
        Serverless deployments simplify a lot of things, but task queueing isn't
        one of them. With Quirrel, creating a queue becomes as simple as this:
        <SyntaxHighligher
          language="typescript"
          style={solarizedLight}
          className={styles.code}
        >
          {`
// /api/queues/email.js
import { Queue } from "@quirrel/next"

export default Queue(
  "queues/email",
  async payload => {
    await email.send( ... )
  }
)
            `.trim()}
        </SyntaxHighligher>
        This can then easily be used from other files:
        <SyntaxHighligher
          language="typescript"
          style={solarizedLight}
          className={styles.code}
        >
          {`
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
            `.trim()}
        </SyntaxHighligher>
        In this example, the "Welcome" email is scheduled to be sent after one
        day. This wouldn't be possible without Quirrel!
        <br />
        <br />
        The form below will send you an e-mail, but delayed by a minute. Make sure
        to try it out! 😊
        <form
          className={styles.form}
          onSubmit={async (evt) => {
            evt.preventDefault();

            const target = evt.target;
            const formData = new FormData(target);
            const name = formData.get("name");
            const email = formData.get("email");

            await fetch("/api/submitForm", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            target.reset();

            alert("Awesome, you'll receive an e-mail in a minute! :D");
          }}
        >
          <input
            name="name"
            placeholder="first name"
            required
            autoComplete="given-name"
          />
          <input
            name="email"
            placeholder="e-mail"
            type="email"
            required
            autoComplete="email"
          />

          <button type="submit">Submit</button>
        </form>
      </p>
    </Layout>
  );
}
