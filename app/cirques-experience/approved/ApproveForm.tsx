"use client";

/* ─────────────────────────────────────────────────────────────
   Confirms a Phase One approval and notifies CUEPA.

   The point of the confirm step is that an approval nobody is told
   about is not an approval. If the send fails for any reason, the
   page says so plainly and hands over a mail link — it never claims
   a message went out that did not.
   ───────────────────────────────────────────────────────────── */

import {useState} from "react";

const CONTACT_EMAIL = "marcos@ollinos.com";
const FALLBACK_SUBJECT = encodeURIComponent("Approving Phase One — Cirques Experience");

type State = {stage: "form" | "sent" | "failed"; message?: string};

export default function ApproveForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<State>({stage: "form"});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          subject: "Phase One approved — Cirques Experience",
          note:
            "Phase One of the Cirques Experience Operations Hub was approved from " +
            "makingcuepa.com/cirques-experience. Reply to this address to schedule the kickoff."
        })
      });
      if (res.ok) setState({stage: "sent"});
      else {
        const body = await res.json().catch(() => ({}));
        setState({stage: "failed", message: body?.error});
      }
    } catch {
      setState({stage: "failed"});
    } finally {
      setBusy(false);
    }
  }

  if (state.stage === "sent") {
    return (
      <div className="cx-ok" role="status">
        <p className="cx-ok-h">You’re all set.</p>
        <p>
          CUEPA is getting ready. Marcos will be in touch within one business day to schedule the
          kickoff and confirm what we’ll need to get started.
        </p>
      </div>
    );
  }

  if (state.stage === "failed") {
    return (
      <div className="cx-ok cx-ok-warn" role="alert">
        <p className="cx-ok-h">That didn’t go through.</p>
        <p>
          {state.message ?? "Something went wrong on our side."} Your approval has not reached us
          yet — please send a quick email so it doesn’t get lost.
        </p>
        <p className="cx-ok-act">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${FALLBACK_SUBJECT}`}>Email {CONTACT_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="cx-lead">One quick confirmation and CUEPA will start getting ready.</p>
      <form className="cx-approve-form" onSubmit={submit}>
      <label className="cx-approve-label" htmlFor="cx-approve-email">
        Your email, so we know it’s you and know where to reply
      </label>
      <div className="cx-approve-pill">
        <input
          id="cx-approve-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@cirquesexperience.org"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" disabled={busy}>{busy ? "Sending…" : "Confirm approval"}</button>
      </div>
        <p className="cx-approve-fine">
          This only lets CUEPA know you’ve approved Phase One. Nothing is charged, and nothing starts
          until we’ve spoken.
        </p>
      </form>
    </>
  );
}
