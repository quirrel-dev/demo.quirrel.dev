import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Light as SyntaxHighligher } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

SyntaxHighligher.registerLanguage("typescript", ts);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Quirrel!</span>
        </h1>

        <p className={styles.description}>
          Quirrel is the Task Queueing solution for Next.js x Vercel.
        </p>

        <p className={styles.text}>
          Serverless deployments simplify a lot of things, but task queueing
          isn't one of them. With Quirrel, creating a queue becomes as simple as
          this:
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
          In this example, the "Welcome" email is scheduled to be sent after one day.
          This wouldn't be possible without Quirrel!

          <br/><br/>
          Quirrel is currently in active development.
          
          As a proof of concept, the form below will send you an e-mail, but delayed by 5 minutes.
          Make sure to try it out! :D

          <form onSubmit={async evt => {
            evt.preventDefault();
            const formData = new FormData(evt.target);
            const name = formData.get("name");
            const email = formData.get("email");
            const subscribe = Boolean(formData.get("subscribe"));

            evt.target.reset();

            await fetch("/api/submitForm", {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name,
                email,
                subscribe
              })
            })

            alert("Awesome, you'll receive an e-mail in 5 minutes! :D")
          }}>
            <input name="name" placeholder="Your name ..." required />
            <input name="email" placeholder="Your e-mail ..." type="email" required />
            <input type="checkbox" name="subscribe" />
            <label htmlFor="subscribe">Keep me up to date</label>
            <button type="submit">Submit</button>
          </form>
        </p>
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