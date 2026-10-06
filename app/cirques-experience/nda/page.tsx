import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../../Logo";
import SignForm, {type SignDoc} from "../approved/SignForm";
import {TITLE, VERSION, PDF_URL, PARTIES, PREAMBLE, SECTIONS, termsText} from "./nda";
import "../cirques.css";

/* Both owner and COO sign for Cirques Experience. Each form sends its
   own dated record to that signer and to CUEPA. Fields stay editable. */
const SIGNERS = [
  {id: "wolfgang", name: "Wolfgang Bientzle", role: "Owner", email: ""},
  {id: "christian", name: "Christian Ochsner", role: "Chief Operating Officer", email: "christian@cirquesexperience.org"}
];

const DOC: SignDoc = {
  title: TITLE,
  version: VERSION,
  text: termsText,
  button: "Sign the NDA",
  fine: "Signing sends a dated copy of the full agreement to you and to CUEPA.",
  done: "Thank you. Your signed copy is on its way, and CUEPA will countersign.",
  fallbackSubject: "Signing the Mutual NDA — Cirques Experience"
};

export const metadata: Metadata = {
  title: "Sign the Mutual NDA — Cirques Experience × CUEPA",
  description: "Review and electronically sign the Mutual Non-Disclosure and Intellectual Property Agreement.",
  alternates: {canonical: "/cirques-experience/nda"},
  robots: {index: false, follow: false}
};

export default function NdaPage() {
  return (
    <main className="cx">
      <header className="cx-top">
        <div className="shell cx-top-in">
          <Link href="/" className="cx-brand" aria-label="CUEPA home"><Logo dark/></Link>
          <span className="cx-top-note">Prepared for Wolfgang Bientzle, Christian Ochsner and the Cirques Experience team</span>
        </div>
      </header>

      <section className="cx-sec cx-approve">
        <div className="shell cx-approve-in">
          <p className="cx-eyebrow">Next step · Mutual NDA</p>
          <h1 className="cx-h1 cx-approve-h">Protecting your families and our work.</h1>
          <p className="cx-lead">
            Before we start, this agreement keeps your students’ and families’ information yours, and
            keeps CUEPA’s methods ours. Read it in full, then sign below.
          </p>

          <div className="cx-terms">
            <div className="cx-terms-head">
              <h2 className="cx-terms-h">{TITLE}</h2>
              <span className="cx-terms-v">{VERSION}</span>
            </div>
            <div className="cx-nda">
              {PREAMBLE.slice(0, 1).map(t => <p key={t}>{t}</p>)}
              <dl className="cx-terms-list cx-nda-parties">
                {PARTIES.map(([k, a, b]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd><span>CUEPA</span>{a}<span>Cirques Experience</span>{b}</dd>
                  </div>
                ))}
              </dl>
              {PREAMBLE.slice(1).map(t => <p key={t}>{t}</p>)}
              {SECTIONS.map(s => (
                <section key={s.name}>
                  <h3>{s.num && <em>{s.num}</em>}{s.name}</h3>
                  {s.paras.map((p, i) =>
                    p.item
                      ? <p key={i} className="cx-nda-item"><em>{p.item}.</em>{p.text}</p>
                      : <p key={i}>{p.label && <b>{p.label} </b>}{p.text}</p>
                  )}
                </section>
              ))}
            </div>
            <p className="cx-terms-ref">
              Prefer the formatted copy? <a href={PDF_URL} target="_blank" rel="noopener">Download the PDF</a>.
              It is the same agreement, word for word.
            </p>
          </div>

          {SIGNERS.map(s => (
            <div key={s.id} className="cx-nda-signer">
              <p className="cx-eyebrow">Signature · {s.name}, {s.role}</p>
              <SignForm doc={DOC} idPrefix={s.id} defaultName={s.name} defaultRole={s.role} defaultEmail={s.email} />
            </div>
          ))}

          <p className="cx-approve-back">
            <Link href="/cirques-experience/approved">← Back to Phase One</Link>
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
