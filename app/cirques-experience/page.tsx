import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../Logo";
import "./cirques.css";

/* ─────────────────────────────────────────────────────────────
   CONFIGURATION — set these when the destinations exist.

   Nothing here ever renders as a clickable control that does
   nothing. While a value is empty its call to action is replaced
   by a plain, non-interactive line of text saying the link is
   still coming, so the client is never invited to click something
   that cannot respond.

   APPROVE_URL    e-signature, approval form, or scheduling link.
                  Empty → "Approval link coming shortly."
   CONTACT_EMAIL  the address questions should go to, address only
                  (no "mailto:"). Empty → "Contact details coming
                  shortly." Set it and "Ask a Question" becomes a
                  real mail link with the subject pre-filled.

   HUB_URL is the in-project prototype route, not a placeholder —
   it always exists. Leave it as is.
   ───────────────────────────────────────────────────────────── */
const APPROVE_URL = "";
const CONTACT_EMAIL = "marcos@ollinos.com";
const HUB_URL = "/cirques-experience/operations-hub";

export const metadata: Metadata = {
  title: "Cirques Experience Operations Hub — CUEPA",
  description:
    "A Phase One proposal and project hub: one central place to see calendars, timecards, payroll deadlines, vendors, and daily priorities.",
  alternates: {canonical: "/cirques-experience"},
  // A client proposal, not marketing. Keep it out of search results.
  robots: {index: false, follow: false}
};

/* A real link once APPROVE_URL is set; a plain notice until then. */
function ApproveAction({children}:{children:React.ReactNode}) {
  if (APPROVE_URL) return <a className="cx-btn cx-btn-primary" href={APPROVE_URL}>{children}</a>;
  return <p className="cx-pending">Approval link coming shortly.</p>;
}

/* A real mail link once CONTACT_EMAIL is set; a plain notice until then. */
function QuestionAction() {
  if (CONTACT_EMAIL) {
    const subject = encodeURIComponent("Question about the Cirques Experience Phase One proposal");
    return (
      <a className="cx-btn cx-btn-ghost" href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}>
        Ask a Question
      </a>
    );
  }
  return <p className="cx-pending">Contact details coming shortly.</p>;
}

const jump = [
  ["#vision", "Vision"],
  ["#plan", "Phase One"],
  ["#timeline", "Timeline"],
  ["#investment", "Investment"],
  ["#hub", "Operations Hub"],
  ["#approve", "Next Steps"]
];

const benefits = [
  ["See everything", "Calendars, deadlines, follow-ups, and priorities in one view."],
  ["Catch what needs attention", "Surface missing timecards, approaching deadlines, overdue items, and unresolved next steps."],
  ["Give time back", "Reduce repetitive checking, searching, reminding, and administrative follow-up."]
];

const phaseOne = [
  ["Central Operations Dashboard", "One clear starting point for important information, upcoming work, and items requiring attention."],
  ["Unified Calendar", "A combined view of important dates, organizational events, payroll deadlines, meetings, and other operational commitments."],
  ["Timecard and Payroll Visibility", "See outstanding timecards, upcoming payroll deadlines, and anything requiring follow-up."],
  ["Automated Timecard Reminders", "Reduce manual chasing by sending timely reminders before deadlines."],
  ["Vendor and Payment Tracking", "Maintain visibility into vendor-related tasks, payment dates, and unresolved items."],
  ["Meeting Follow-Through", "Capture decisions, assign next steps, and keep post-meeting responsibilities visible."],
  ["Priority Alerts", "Bring overdue work, missing information, and time-sensitive items to the surface."],
  ["Existing-System Access", "Connect with or provide direct access to the platforms Cirques Experience already uses."],
  ["Mobile and Desktop Access", "Create an experience that is easy to use from a computer, tablet, or phone."],
  ["Basic Access Controls", "Keep operational and financial information visible only to the appropriate people."]
];

const steps = [
  ["Discover", "Review the current systems, calendars, reports, and recurring workflows."],
  ["Design", "Organize the most important information into one clear dashboard experience."],
  ["Connect", "Add the approved integrations, reminders, and automations."],
  ["Launch", "Test the system, make final adjustments, train the team, and go live."]
];

const weeks = [
  ["Week 1", "Workflow discovery and system review", "Review current tools, calendars, reports, responsibilities, and recurring processes."],
  ["Week 2", "Dashboard and calendar build", "Create the dashboard structure, navigation, priority views, and unified calendar experience."],
  ["Week 3", "Operations workflows", "Build the timecard, payroll, vendor, and meeting follow-up workflows."],
  ["Week 4", "Connections and automations", "Configure approved integrations, reminders, priority alerts, and data flows."],
  ["Week 5", "Testing and launch", "Test the experience, make final adjustments, train the appropriate users, and launch Phase One."]
];

const payments = [
  ["50%", "$2,750", "to begin"],
  ["30%", "$1,650", "following dashboard approval"],
  ["20%", "$1,100", "at launch"]
];

const supportIncludes = [
  "Monitoring existing automations and connections",
  "Minor dashboard updates",
  "Up to two hours of changes or support each month",
  "One monthly operations check-in",
  "Additional work available at $125 per hour with approval before work begins"
];

const details = [
  ["System connections", "The project includes connections supported through reasonable API, calendar, email, export, or standard automation access."],
  ["Custom development", "If a platform requires custom development, paid API access, browser automation, or a more complex workaround, that work will be discussed and approved separately."],
  ["Software costs", "Any third-party software, platform, API, or subscription costs are paid directly by the client."],
  ["Project focus", "Phase One does not replace Cirques Experience’s accounting, payroll, registration, or other core platforms. It creates one place to monitor and manage the information across those systems."],
  ["Revisions", "The Phase One investment includes two rounds of consolidated revisions."],
  ["Client participation", "Cirques Experience will designate one primary decision-maker and provide timely access, information, and feedback."]
];

const needs = [
  "Access to the approved platforms and tools",
  "The calendars that should be included",
  "Examples of current payroll, timecard, vendor, and meeting processes",
  "A list of the people who will need access",
  "One primary person responsible for approvals and feedback",
  "Approval of the dashboard structure before integrations begin"
];

export default function CirquesExperiencePage() {
  return (
    <main className="cx">
      <header className="cx-top">
        <div className="shell cx-top-in">
          <Link href="/" className="cx-brand" aria-label="CUEPA home"><Logo dark/></Link>
          <span className="cx-top-note">Prepared for Christian and the Cirques Experience team</span>
        </div>
      </header>

      <nav className="cx-jump" aria-label="Proposal sections">
        <div className="shell cx-jump-in">
          {jump.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </div>
      </nav>

      {/* 1 — HERO */}
      <section className="cx-hero">
        <div className="shell cx-hero-grid">
          <div>
            <p className="cx-eyebrow">CUEPA × Cirques Experience</p>
            <h1 className="cx-h1">One place to see what needs your attention.</h1>
            <p className="cx-lead">
              A centralized operations hub designed to bring calendars, timecards, payroll deadlines,
              vendors, meeting follow-ups, and daily priorities into one clear view.
            </p>
            <p className="cx-lead cx-lead-2">
              Less searching. Less following up. More time for the work that actually needs you.
            </p>
            <div className="cx-actions">
              {APPROVE_URL
                ? <a className="cx-btn cx-btn-primary" href={APPROVE_URL}>Start Phase One</a>
                : <a className="cx-btn cx-btn-primary" href="#plan">View the Plan</a>}
              <a className="cx-btn cx-btn-ghost" href="#timeline">See the Timeline</a>
            </div>
            {!APPROVE_URL && <p className="cx-pending cx-pending-hero">Approval link coming shortly.</p>}
          </div>

          {/* A real render of /cirques-experience/operations-hub, captured at
              700x875 so the interface reads at panel size. Regenerate it from
              the live route if the hub's layout changes. */}
          <Link className="cx-scene" href={HUB_URL}>
            <span className="cx-scene-frame">
              <img
                src="/cirques-hub-preview.png"
                width={1240}
                height={1550}
                alt="The Cirques Experience Operations Hub concept: a Phase One Concept — Illustrative Data label, the heading Here’s what needs you, and a unified calendar listing an operations check-in, a timecard submission deadline, a program event, and a vendor call."
              />
            </span>
            <span className="cx-scene-label">
              <span className="cx-scene-k">Explore the Phase One concept</span>
              <span className="cx-scene-go" aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* 2 — THE GOAL */}
      <section className="cx-sec" id="vision">
        <div className="shell">
          <h2 className="cx-h2">Bringing the moving pieces together.</h2>
          <div className="cx-prose">
            <p>
              Cirques Experience already has systems, processes, calendars, and people doing the work.
              The challenge is that the information lives in different places.
            </p>
            <p>
              The CUEPA Operations Hub will create one central place for Christian to see what is
              happening, what is coming up, and what needs attention—without having to search across
              multiple platforms or repeatedly follow up with the team.
            </p>
          </div>
          <ul className="cx-cards cx-cards-3">
            {benefits.map(([t, d]) => (
              <li key={t} className="cx-card">
                <h3 className="cx-card-h">{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — PHASE ONE */}
      <section className="cx-sec cx-sec-alt" id="plan">
        <div className="shell">
          <p className="cx-eyebrow">Phase One</p>
          <h2 className="cx-h2">What we’re building first.</h2>
          <p className="cx-intro">
            Phase One focuses on the workflows that can create the most immediate visibility and save
            the most time.
          </p>
          <ul className="cx-cards cx-cards-2">
            {phaseOne.map(([t, d], i) => (
              <li key={t} className="cx-card cx-card-num">
                <span className="cx-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cx-card-h">{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — HOW IT WILL WORK */}
      <section className="cx-sec" id="how">
        <div className="shell">
          <h2 className="cx-h2">Built around how Cirques Experience already works.</h2>
          <ol className="cx-steps">
            {steps.map(([t, d], i) => (
              <li key={t} className="cx-step">
                <span className="cx-step-n" aria-hidden>{i + 1}</span>
                <h3 className="cx-card-h">{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — TIMELINE */}
      <section className="cx-sec cx-sec-alt" id="timeline">
        <div className="shell">
          <h2 className="cx-h2">Estimated timeline: 4–5 weeks</h2>
          <ol className="cx-timeline">
            {weeks.map(([w, t, d]) => (
              <li key={w} className="cx-week">
                <span className="cx-week-n">{w}</span>
                <div>
                  <h3 className="cx-card-h">{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="cx-note">
            The project timeline begins once the agreement is approved and the necessary system access
            and information have been provided.
          </p>
        </div>
      </section>

      {/* 6 — INVESTMENT */}
      <section className="cx-sec cx-invest" id="investment">
        <div className="shell cx-invest-grid">
          <div>
            <h2 className="cx-h2">Phase One investment</h2>
            <p className="cx-price">$5,500</p>
            <p className="cx-intro">
              This investment includes workflow discovery, dashboard design and development, the
              unified calendar, agreed-upon Phase One workflows, approved automations and connections,
              testing, training, launch, and 30 days of post-launch support.
            </p>
            <p className="cx-note">
              This proposal is priced according to the work, complexity, and value of the system—not
              the organization’s nonprofit status.
            </p>
          </div>
          <div className="cx-pay">
            <h3 className="cx-card-h">Payment structure</h3>
            <ol className="cx-pay-list">
              {payments.map(([pct, amt, when]) => (
                <li key={pct}>
                  <span className="cx-pay-pct">{pct}</span>
                  <span className="cx-pay-amt">{amt}</span>
                  <span className="cx-pay-when">{when}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7 — OPTIONAL ONGOING SUPPORT */}
      <section className="cx-sec cx-sec-alt" id="support">
        <div className="shell">
          <p className="cx-eyebrow">Optional</p>
          <h2 className="cx-h2">Support after launch</h2>
          <div className="cx-support">
            <p className="cx-price cx-price-sm">
              $500 <span className="cx-per">per month</span>
            </p>
            <ul className="cx-list">
              {supportIncludes.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <p className="cx-note">
            Ongoing support is optional. The Phase One system is yours to use whether or not you add it.
          </p>
        </div>
      </section>

      {/* 8 — PROJECT DETAILS */}
      <section className="cx-sec" id="details">
        <div className="shell">
          <h2 className="cx-h2">A few important details.</h2>
          <div className="cx-accordion">
            {details.map(([t, d]) => (
              <details key={t} className="cx-detail">
                <summary>
                  <span>{t}</span>
                  <span className="cx-detail-mark" aria-hidden />
                </summary>
                <p>{d}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — WHAT WE'LL NEED */}
      <section className="cx-sec cx-sec-alt" id="need">
        <div className="shell">
          <h2 className="cx-h2">What we’ll need to get started.</h2>
          <ul className="cx-list cx-list-2">
            {needs.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* 9.5 — A LOOK AT WHERE WE'RE HEADED */}
      <section className="cx-sec cx-hub" id="hub">
        <div className="shell cx-hub-grid">
          <div>
            <p className="cx-eyebrow">Concept preview</p>
            <h2 className="cx-h2">A look at where we’re headed.</h2>
            <p>
              This is an early concept for the Cirques Experience Operations Hub—a single place for
              Christian to see what needs attention, review upcoming commitments, and stay ahead of
              the operational details without searching across multiple systems.
            </p>
            <div className="cx-actions">
              <Link className="cx-btn cx-btn-primary" href={HUB_URL}>Explore the Operations Hub</Link>
            </div>
          </div>

          {/* Decorative sketch of the prototype. Illustrative only. */}
          <div className="cx-hub-shot" aria-hidden>
            <div className="cx-hub-bar">
              <span className="cx-hub-dot" /><span className="cx-hub-dot" /><span className="cx-hub-dot" />
              <span className="cx-hub-tag">Phase One Concept — Illustrative Data</span>
            </div>
            <div className="cx-hub-row"><span>What needs you today</span><span>4 items</span></div>
            <div className="cx-hub-row"><span>Timecards outstanding</span><span>Due Fri</span></div>
            <div className="cx-hub-row"><span>Payroll deadline</span><span>Upcoming</span></div>
            <div className="cx-hub-row"><span>Meeting next steps</span><span>Open</span></div>
            <div className="cx-hub-row"><span>Vendor follow-ups</span><span>Tracked</span></div>
          </div>
        </div>
      </section>

      {/* 10 — FINAL CALL TO ACTION */}
      <section className="cx-sec cx-final" id="approve">
        <div className="shell">
          <h2 className="cx-h2 cx-h2-center">Ready to bring it all into one place?</h2>
          <p className="cx-intro cx-intro-center">
            Once Phase One is approved, we’ll schedule the kickoff, review the current systems, and
            begin building the Cirques Experience Operations Hub.
          </p>
          <div className="cx-actions cx-actions-center">
            <ApproveAction>Approve Phase One</ApproveAction>
            <QuestionAction />
          </div>
        </div>
      </section>

      {/* 11 — FOOTER */}
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
