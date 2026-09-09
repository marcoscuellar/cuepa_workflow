import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../../Logo";
import ApproveForm from "./ApproveForm";
import "../cirques.css";

export const metadata: Metadata = {
  title: "Phase One approved — Cirques Experience × CUEPA",
  description: "Confirming approval of Phase One of the Cirques Experience Operations Hub.",
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
          <p className="cx-eyebrow">Phase One</p>
          <h1 className="cx-h1 cx-approve-h">Thank you.</h1>
          <ApproveForm />

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
