"use client";

/* ─────────────────────────────────────────────────────────────
   Electronic signature for Phase One.

   Built to satisfy the four things an electronic signature needs:
   intent (a deliberate typed signature), consent (an explicit
   opt-in to sign electronically), association (the terms travel
   inside the record that gets emailed), and delivery of a copy to
   both parties.

   It is not a substitute for a provider with a tamper-evident audit
   certificate. If the send fails, the page says so rather than
   implying a record exists.
   ───────────────────────────────────────────────────────────── */

import {useState} from "react";
import {VERSION, TITLE, termsText} from "./agreement";

const CONTACT_EMAIL = "marcos@ollinos.com";

/* What is being signed. Defaults to Phase One; the NDA page passes its own. */
export type SignDoc = {
  title: string;
  version: string;
  text: () => string;
  button: string;
  fine: string;
  done: string;
  fallbackSubject: string;
};

const PHASE_ONE: SignDoc = {
  title: TITLE,
  version: VERSION,
  text: termsText,
  button: "Sign and approve Phase One",
  fine: "Signing sends a dated copy of these terms to you and to CUEPA. Nothing is charged here — the first invoice follows the kickoff call.",
  done: "CUEPA is getting ready. Marcos will be in touch within one business day to schedule the kickoff and confirm what we’ll need to get started.",
  fallbackSubject: "Approving Phase One — Cirques Experience"
};

type Stage = {kind: "form"} | {kind: "signed"; at: string} | {kind: "failed"; message?: string};

export default function SignForm({defaultEmail = "", defaultName = "", defaultRole = "", idPrefix = "sig", doc = PHASE_ONE}: {
  defaultEmail?: string; defaultName?: string; defaultRole?: string; idPrefix?: string; doc?: SignDoc;
}) {
  const FALLBACK = encodeURIComponent(doc.fallbackSubject);
  const [name, setName] = useState(defaultName);
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState(defaultEmail);
  const [signature, setSignature] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [stage, setStage] = useState<Stage>({kind: "form"});

  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const matches = signature.trim() !== "" && norm(signature) === norm(name);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!matches) {
      setErr("Your typed signature needs to match your full name exactly.");
      return;
    }
    setErr("");
    setBusy(true);

    const at = new Date();
    const stamp = at.toISOString();
    const readable = at.toLocaleString("en-US", {dateStyle: "full", timeStyle: "long"});

    const record = [
      `${doc.title}`,
      `Agreement version: ${doc.version}`,
      "",
      "SIGNED BY",
      `Name: ${name.trim()}`,
      role.trim() ? `Title: ${role.trim()}` : "",
      `Organization: Cirques Experience`,
      `Email: ${email.trim()}`,
      `Typed signature: ${signature.trim()}`,
      `Signed at: ${readable}`,
      `Timestamp (UTC): ${stamp}`,
      "",
      "CONSENT",
      "The signer confirmed they intend this typed signature to be their electronic signature,",
      "that they agree to do business electronically, and that they have authority to enter this",
      "agreement on behalf of Cirques Experience.",
      "",
      "TERMS AGREED",
      doc.text()
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: `Signed — ${doc.title}`,
          note: record,
          copyTo: email.trim()
        })
      });
      if (res.ok) setStage({kind: "signed", at: readable});
      else {
        const b = await res.json().catch(() => ({}));
        setStage({kind: "failed", message: b?.error});
      }
    } catch {
      setStage({kind: "failed"});
    } finally {
      setBusy(false);
    }
  }

  if (stage.kind === "signed") {
    return (
      <div className="cx-ok" role="status">
        <p className="cx-ok-h">Signed. Thank you.</p>
        <p>{doc.done}</p>
        <p className="cx-ok-meta">
          A copy of what you signed has been sent to {email.trim()} — signed {stage.at}.
        </p>
      </div>
    );
  }

  if (stage.kind === "failed") {
    return (
      <div className="cx-ok cx-ok-warn" role="alert">
        <p className="cx-ok-h">That didn’t go through.</p>
        <p>
          {stage.message ?? "Something went wrong on our side."} Nothing has been recorded and
          nothing has reached us yet — please send a quick email so this doesn’t get lost.
        </p>
        <p className="cx-ok-act">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${FALLBACK}`}>Email {CONTACT_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <form className="cx-sign" onSubmit={submit} noValidate={false}>
      <div className="cx-sign-grid">
        <p className="cx-field">
          <label htmlFor={`${idPrefix}-name`}>Full name</label>
          <input id={`${idPrefix}-name`} required autoComplete="name" value={name}
                 onChange={e => setName(e.target.value)} />
        </p>
        <p className="cx-field">
          <label htmlFor={`${idPrefix}-role`}>Title <span>(optional)</span></label>
          <input id={`${idPrefix}-role`} autoComplete="organization-title" value={role}
                 onChange={e => setRole(e.target.value)} />
        </p>
      </div>

      <p className="cx-field">
        <label htmlFor={`${idPrefix}-email`}>Email — your copy of the signed agreement goes here</label>
        <input id={`${idPrefix}-email`} type="email" required autoComplete="email" value={email}
               onChange={e => setEmail(e.target.value)} />
      </p>

      <p className="cx-field cx-field-sig">
        <label htmlFor={`${idPrefix}-sign`}>Signature — type your full name to sign</label>
        <input id={`${idPrefix}-sign`} required autoComplete="off" spellCheck={false}
               aria-describedby={`${idPrefix}-help`} value={signature}
               onChange={e => {setSignature(e.target.value); if (err) setErr("");}} />
        <span className="cx-sign-rule" aria-hidden />
        <span id={`${idPrefix}-help`} className="cx-sign-help">
          {name.trim() ? `Type “${name.trim()}” exactly as above.` : "Enter your full name first."}
        </span>
      </p>

      <label className="cx-consent">
        <input type="checkbox" required checked={consent}
               onChange={e => setConsent(e.target.checked)} />
        <span>
          I intend this typed signature to be my electronic signature, I agree to do business
          electronically, and I have the authority to enter this agreement on behalf of Cirques
          Experience.
        </span>
      </label>

      {err && <p className="cx-sign-err" role="alert">{err}</p>}

      <button className="cx-btn cx-btn-primary cx-sign-go" type="submit" disabled={busy}>
        {busy ? "Signing…" : doc.button}
      </button>

      <p className="cx-approve-fine">{doc.fine}</p>
    </form>
  );
}
