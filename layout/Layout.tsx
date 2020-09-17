import { PropsWithChildren } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export function Layout(props: PropsWithChildren<{}>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quirrel</title>
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

      <main className={styles.main}>{props.children}</main>

      <h2>All Examples:</h2>

      <ul>
        <li>
          <Link href="/">
            <a style={{ color: "blue" }}>Introduction</a>
          </Link>
        </li>
        <li>
          <Link href="/managed">
            <a style={{ color: "blue" }}>Managed & Idempotent Jobs</a>
          </Link>
        </li>
      </ul>

      <p>
        The code of these examples can be found here:&nbsp;
        <a
          href="https://github.com/quirrel-dev/demo.quirrel.dev"
          target="blank"
          style={{ color: "blue" }}
        >
          github.com/quirrel-dev/demo.quirrel.dev
        </a>
      </p>

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
