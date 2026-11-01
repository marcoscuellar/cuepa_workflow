"use client";

import {useState} from "react";
import HowItWorksDeck from "./HowItWorksDeck";

// "How it works": the executive mental model. The four photo story sections
// below (FIND, FLOW, PROVE, GROW) prove the work in practice.
// The four turns live in HowItWorksDeck (sticky-stacking cards).

type Call = {key: string; label: string; title: string; what: string; before: string; after: string; keep?: boolean};

const calls: Call[] = [
  {key: "eliminate", label: "Eliminate", title: "Eliminate the work",
    what: "It doesn’t add value. Stop doing it instead of paying to keep it running.",
    before: "A weekly status report gets built every Friday. Nobody reads it.",
    after: "Stop making it. Share the one number people actually check."},
  {key: "simplify", label: "Simplify", title: "Simplify the process",
    what: "The work matters, but it has too many steps, handoffs or back-and-forth.",
    before: "Booking a client takes four emails to find a time.",
    after: "One booking link that shows your real availability."},
  {key: "redesign", label: "Redesign", title: "Redesign the workflow",
    what: "The way the work is set up is the problem. Rebuild it around the outcome, then pick tools.",
    before: "New client intake lives in email, texts and a paper form.",
    after: "One intake form that fills the client file and the calendar."},
  {key: "automate", label: "Automate", title: "Automate selectively",
    what: "The process is sound and repeats the same way every time. Let the system carry it.",
    before: "Someone remembers to chase every unpaid invoice by hand.",
    after: "Polite reminders go out on schedule and stop when the client pays."},
  {key: "human", label: "Keep human", title: "Keep it human", keep: true,
    what: "Judgment, trust and relationships are the whole point. These stay with you.",
    before: "Relationship calls, hard conversations, pricing decisions.",
    after: "CUEPA preps the notes. You make the call."}
];

export default function HowItWorks() {
  const [pick, setPick] = useState("eliminate");
  const c = calls.find(x => x.key === pick) ?? calls[0];

  return (
    <div className="hw" id="method">
      {/* 1. Opening */}
      <section className="hw-sec" aria-labelledby="hw-open">
        <div className="hw-wrap hw-open">
          <div>
            <p className="hw-eyebrow">How it works</p>
            <h2 id="hw-open" className="hw-callout">Don&rsquo;t make the wrong things <span>faster.</span></h2>
            <p className="hw-after">Make the right things easier. Then make room for more.</p>
          </div>
          <aside className="hw-note" aria-label="A note from Marcos">
            <span className="hw-k">How I&rsquo;ve always worked</span>
            <blockquote>&ldquo;Understand first. Simplify before automating. I don&rsquo;t believe in forcing a product into a problem.&rdquo;</blockquote>
            <div className="hw-who">
              <svg viewBox="14 14 72 72" aria-hidden="true"><rect x="14" y="14" width="30" height="72" fill="#030303"/><rect x="56" y="14" width="30" height="72" fill="#0F766E"/></svg>
              <span><b>Marcos Cuellar</b> · Founder, CUEPA for Work</span>
            </div>
            <p className="hw-how">We understand your business first, simplify what&rsquo;s there, then put AI to work on what it should take off your plate. <b>You keep the decisions.</b></p>
          </aside>
        </div>
      </section>

      {/* 2. The four turns: full-width sticky-stacking deck */}
      <HowItWorksDeck/>

      {/* 3. The five calls */}
      <section className="hw-sec hw-tight" aria-labelledby="hw-calls">
        <div className="hw-wrap hw-calls">
          <div className="hw-calls-copy">
            <p className="hw-eyebrow">The 5-call decision framework • How every flow is classified</p>
            <h2 id="hw-calls">Not everything should be automated.</h2>
            <p>Before anything gets built, every task gets one of five calls. Automation is one answer, not the first one.</p>
            <p className="hw-small">Tap a call to see what it looks like in a small business.</p>
          </div>
          <div className="hw-picker">
            <div className="hw-chips" role="group" aria-label="The five calls">
              {calls.map(x => (
                <button key={x.key} type="button" className="hw-chip" aria-pressed={x.key === pick} aria-controls="hw-call-panel" onClick={() => setPick(x.key)}>
                  {x.label}
                </button>
              ))}
            </div>
            <div className="hw-panel" id="hw-call-panel" aria-live="polite">
              <div className="hw-panel-body" key={c.key}>
                <span className="hw-k">The call</span>
                <h3>{c.title}</h3>
                <p>{c.what}</p>
                <div className="hw-ex">
                  <small>Small-business example</small>
                  <span className="hw-before">Before: {c.before}</span>
                  <span className="hw-afterx">After: {c.after}</span>
                </div>
                {c.keep && <span className="hw-keeps"><i aria-hidden="true">✓</i>Stays with you</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Close */}
      <section className="hw-sec hw-close" aria-labelledby="hw-close">
        <div className="hw-wrap">
          <h2 id="hw-close">Efficiency isn&rsquo;t the destination. <span>It makes more possible.</span></h2>
          <p>That&rsquo;s the room: the time, money and headspace you get back, for whatever comes next.</p>
          <p className="hw-ask">What are you making room for?</p>
        </div>
      </section>
    </div>
  );
}
