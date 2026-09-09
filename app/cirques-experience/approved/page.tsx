import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../../Logo";
import SignForm from "./SignForm";
import {TITLE, TERMS, VERSION} from "./agreement";
import "../cirques.css";

export const metadata: Metadata = {
  title: "Approve Phase One — Cirques Experience × CUEPA",
  description: "Review and electronically sign Phase One of the Cirques Experience Operations Hub.",
  alternates: {canonical: "/cirques-experience/approved"},
  robots: {index: false, follow: false}
};

const next = [
  ["Kickoff", "We schedule a short call to confirm scope, access, and the primary decision-maker."],
  ["Week 1", "Workflow discovery: current tools, calendars, reports, and recurring processes."],
  ["From there", "Dashboard and calendar build, then the Phase One workflows, on the 4–5 week timeline."]
];

export default function ApprovedPage() {
  return (
    <main className="cx">
      <header className="cx-top">
        <div className="shell cx-top-in">
          <Link href="/" className="cx-brand" aria-label="CUEPA home"><Logo dark/></Link>
          <span className="cx-top-note">Prepared for Christian and the Cirques Experience team</span>
        </div>
      </header>

      <section className="cx-sec cx-approve">
        <div className="shell cx-approve-in">
          <p className="cx-eyebrow">Approve Phase One</p>
          <h1 className="cx-h1 cx-approve-h">Ready when you are.</h1>
          <p className="cx-lead">
            Here are the terms in full. Sign below and CUEPA will start getting ready.
          </p>

          {/* The terms travel into the signed record; keep the two in step. */}
          <div className="cx-terms">
            <div className="cx-terms-head">
              <h2 className="cx-terms-h">{TITLE}</h2>
              <span className="cx-terms-v">{VERSION}</span>
            </div>
            <dl className="cx-terms-list">
              {TERMS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="cx-terms-ref">
              These terms summarise the full proposal.{" "}
              <Link href="/cirques-experience">Re-read it here</Link> before signing if anything is
              unclear.
            </p>
          </div>

          <SignForm />

          <div className="cx-approve-next">
            <p className="cx-eyebrow">What happens next</p>
            <ol className="cx-approve-steps">
              {next.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="cx-approve-back">
            <Link href="/cirques-experience">← Back to the proposal</Link>
          </p>
        </div>
      </section>

      <footer className="cx-foot">
        <div className="shell cx-foot-in">
          <span className="cx-foot-brand"><Logo dark/></span>
          <span>Prepared by CUEPA</span>
          <span className="cx-foot-line">Making room for what matters.</span>
        </div>
      </footer>
    </main>
  );
}
