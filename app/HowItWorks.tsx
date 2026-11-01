"use client";

import {useState} from "react";

// "How it works": the executive mental model. The four photo story sections
// below (FIND, FLOW, PROVE, GROW) prove the work in practice.
// Locked: step names, order and deliverables. Examples are plain small-business
// friction with no numbers (Brand Book honesty rule).

// Each turn leads with a real person (Human foreground. Intelligence background.).
// Same photos as the four story sections below, so the overview and the stories connect.
type Turn = {n: string; name: string; loop?: boolean; steps: [string, string][]; gets: string;
  photo: string; alt: string; caption: string; pos?: string};

const turns: Turn[] = [
  {n: "01", name: "FIND", gets: "The Room Map",
    photo: "/find-couple-kitchen.jpg", alt: "A couple cooking together in their kitchen", caption: "We listen. You keep your day.", pos: "60% 40%", steps: [
    ["Listen", "What’s your week actually like?"],
    ["Investigate", "Map how the work really moves."],
    ["Challenge", "What’s unnecessary, broken or missing?"]
  ]},
  {n: "02", name: "FLOW", gets: "The Working System",
    photo: "/flow-cubs-game.jpg", alt: "A father and son cheering at a ballgame", caption: "In the stands with his son.", pos: "50% 35%", steps: [
    ["Redesign", "The simplest way that works."],
    ["Enable", "People, process, software or AI. Whatever fits."]
  ]},
  {n: "03", name: "PROVE", gets: "The Room Report",
    photo: "/prove-workbench.jpg", alt: "A craftsman back at his workbench", caption: "Back at the bench.", pos: "70% 45%", steps: [
    ["Validate", "Measured against how it was before. Did the week actually get easier?"]
  ]},
  {n: "04", name: "GROW", loop: true, gets: "The Next Opportunity",
    photo: "/grow-dog-walk.jpg", alt: "A woman waving to a neighbour while walking her dog on a tree-lined sidewalk", caption: "Out on a walk.", pos: "50% 30%", steps: [
    ["Enhance", "Put the time you got back to work."],
    ["Expand", "Room for more clients, the next hire, the new pitch."]
  ]}
];

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
  // Opens on "Keep human" so visitors see first that relationships stay with them.
  const [pick, setPick] = useState("human");
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
            <p className="hw-north">Human foreground. Intelligence background.</p>
          </aside>
        </div>
      </section>

      {/* 2. The loop */}
      <section className="hw-sec hw-tight" aria-labelledby="hw-loop">
        <div className="hw-wrap">
          <div className="hw-loop-head">
            <div>
              <p className="hw-eyebrow">The method</p>
              <h2 id="hw-loop">Four turns. It always comes back to you.</h2>
            </div>
            <p><b>Cuepa</b> means to return. Every turn ends with something you keep, and growth feeds the next round of listening.</p>
          </div>
          <ol className="hw-turns">
            {turns.map(t => (
              <li className="hw-turn" key={t.n}>
                <figure className="hw-photo">
                  <img src={t.photo} alt={t.alt} loading="lazy" style={{objectPosition: t.pos}}/>
                  <figcaption>{t.caption}</figcaption>
                </figure>
                <div className="hw-turn-top">
                  <span className="hw-num">{t.n}</span>
                  <h3>{t.name}{t.loop && <span className="hw-ret" aria-label="loops back"> ↻</span>}</h3>
                </div>
                <ul className="hw-steps">
                  {t.steps.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
                </ul>
                <div className="hw-deliv"><small>You get</small><b>{t.gets}</b></div>
              </li>
            ))}
          </ol>
          <p className="hw-return">
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="#0F766E" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M32 4v6a6 6 0 0 1-6 6H4"/><path d="M9 11l-5 5 5 5"/></svg>
            Back to FIND <span>· what you learn in GROW starts the next round.</span>
          </p>
        </div>
      </section>

      {/* 3. The five calls */}
      <section className="hw-sec hw-tight" aria-labelledby="hw-calls">
        <div className="hw-wrap hw-calls">
          <div className="hw-calls-copy">
            <p className="hw-eyebrow">The decision point</p>
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
