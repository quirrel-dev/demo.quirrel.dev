import { useState } from "react";

export default function TaskManagement() {
  const [email, setEmail] = useState("");
  return (
    <form
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
      <button type="submit">Submit</button>

      <button
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
        Prevent Sending
      </button>
    </form>
  );
}
