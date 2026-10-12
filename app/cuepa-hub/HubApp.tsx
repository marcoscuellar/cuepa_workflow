"use client";

/* ─────────────────────────────────────────────────────────────
   CUEPA Operations Hub — internal sandbox.

   This is CUEPA's own hub, not a client's. Nothing here connects
   to, reads from, or writes to any client account or system. There
   is no backend and no stored data: buttons change local state and
   raise a message, nothing is sent anywhere.

   Its purpose is to exercise the build and the process end to end
   before any of it touches a client's systems. Keep the content to
   CUEPA's own operations — never paste client, family, payroll or
   financial data in here.
   ───────────────────────────────────────────────────────────── */

import {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";

type ViewId = "today" | "calendar" | "invoices" | "engagements" | "filings" | "access";

const views: {id: ViewId; label: string; short: string; count?: number}[] = [
  {id: "today", label: "Today", short: "NOW", count: 3},
  {id: "calendar", label: "Calendar", short: "CAL"},
  {id: "invoices", label: "Invoices", short: "INV", count: 1},
  {id: "engagements", label: "Engagements", short: "WORK"},
  {id: "filings", label: "Filings", short: "GOV", count: 2},
  {id: "access", label: "Access", short: "WHO"}
];

const needs = [
  {
    t: "Apply for the EIN",
    d: "Free at IRS.gov, about ten minutes. The business bank account cannot be opened without it, and the deposit cannot be collected without the account.",
    cta: "Mark as done",
    go: true
  },
  {
    t: "Confirm the LLC filing at the state",
    d: "The formation agent has not reported back. The Secretary of State database is the source of truth and can be searched directly.",
    cta: "Mark as checked"
  },
  {
    t: "Start the services agreement",
    d: "The signed agreement commits to finalising it before development begins or before any sensitive data moves, whichever comes first.",
    cta: "Open the draft"
  }
];

const day = [
  {time: "9:00 AM", block: {t: "Operations check-in", s: "Recurring · 20 minutes", k: ""}},
  {time: "10:00 AM", block: {t: "EIN application window opens", s: "IRS online, 7am–10pm ET, weekdays", k: "hub-deadline"}},
  {time: "11:00 AM", block: null},
  {time: "1:00 PM", block: {t: "Discovery walkthrough — hold", s: "Unscheduled until access is granted", k: "hub-program"}},
  {time: "2:00 PM", block: null},
  {time: "3:00 PM", block: {t: "Services agreement — drafting block", s: "Focus time · 90 minutes", k: ""}}
];

const reminders = [
  {
    t: "Deposit follow-up",
    d: "Drafted for the engagement with an outstanding deposit, to go out once the bank details are ready to include.",
    when: "HELD · AWAITING BANK DETAILS"
  },
  {
    t: "Discovery questionnaire nudge",
    d: "Drafted for an engagement where the access checklist has gone out but nothing has come back yet.",
    when: "SCHEDULED · DAY 5 AFTER SEND"
  }
];

const log = [
  ["8:04 AM", "Agreement recorded as executed", "FILED"],
  ["8:19 AM", "Outstanding deposit flagged — no bank account on file", "FLAGGED"],
  ["8:33 AM", "Formation status still unconfirmed with the state", "QUEUED"],
  ["9:01 AM", "Services agreement added to this week’s work", "QUEUED"]
];

const calendarRows = [
  ["EIN application", "Blocking the bank account", "Formation checklist", "BLOCKING"],
  ["Illinois annual report", "Each year from the formation date", "State filing calendar", "ANNUAL"],
  ["Estimated tax payment", "Quarterly", "Tax calendar", "QUARTERLY"],
  ["Deposit invoice — due date", "Outstanding", "Invoicing", "OVERDUE"],
  ["Services agreement — finalise", "Before development begins", "Engagement terms", "DEADLINE"],
  ["Cyber liability policy — bind", "Committed to in the signed agreement", "Insurance", "DEADLINE"]
];

const invoiceRows = [
  ["Deposit — 50%", "Sent · awaiting payment", "OUTSTANDING", "hub-open"],
  ["Milestone — 30%", "Due on dashboard approval", "NOT YET DUE", ""],
  ["Final — 20%", "Due at launch", "NOT YET DUE", ""],
  ["Bank details", "Cannot be issued until the account exists", "BLOCKED", "hub-open"]
];

const engagementRows = [
  ["Operations hub — Phase One", "Signed. Clock starts when access and information arrive.", "AWAITING ACCESS", "hub-open"],
  ["Discovery", "Checklist and questionnaire built, not yet returned", "NOT STARTED", "hub-open"],
  ["Services agreement", "Committed to before development begins", "TO DRAFT", "hub-open"],
  ["Platform build", "Larger scope, not yet priced or scoped", "UNSCOPED", ""]
];

const filingRows = [
  ["LLC formation", "Filed and expedited — awaiting confirmation from the state", "UNCONFIRMED", "hub-open"],
  ["EIN", "Free, online, same day", "NOT FILED", "hub-open"],
  ["Business bank account", "Needs the formation confirmation and the EIN", "BLOCKED", ""],
  ["Assumed name — brand", "Required to trade legally under a name other than the registered one", "NOT FILED", "hub-open"],
  ["Operating agreement", "Not required to file, needed before adopting officer titles", "NOT DRAFTED", ""],
  ["Cyber liability insurance", "Named in the signed agreement", "NOT BOUND", "hub-open"]
];

const meetings = [
  {
    t: "Weekly operations check-in",
    when: "Mondays",
    items: [
      ["Confirm the formation status with the state", "OPEN"],
      ["File the EIN and open the bank account", "OPEN"],
      ["Chase the access checklist and questionnaire", "OPEN"]
    ]
  }
];

const accessCards = [
  ["Roles, not individuals", "Access is granted by role so it can be reviewed and changed without touching each account."],
  ["Least visibility that works", "Financial and client detail is limited to the people who need it for their part of the work."],
  ["Visible and revocable", "Who can see what is written down, reviewable, and reversible at any time."],
  ["Approvals stay human", "Reminders and follow-ups are prepared for a person to review. Nothing is sent on its own."]
];

const accessRows = [
  ["Workspace owner", "Everything in the hub, including approvals and financials", "FULL"],
  ["Operations", "Engagements, calendar, filings — not banking", "SCOPED"],
  ["Contractor", "Only the engagement they are assigned to", "LIMITED"],
  ["Accountant", "Invoices and filings, read only", "READ ONLY"]
];

export default function HubApp() {
  const [view, setView] = useState<ViewId>("today");
  const [toast, setToast] = useState("");
  const [approved, setApproved] = useState<number[]>([]);
  const [discarded, setDiscarded] = useState<number[]>([]);
  const [banner, setBanner] = useState(false);
  const [modal, setModal] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const say = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3200);
  }, []);

  useEffect(() => () => {if (timer.current) clearTimeout(timer.current);}, []);

  // Escape closes the review dialog; focus moves into it when it opens.
  useEffect(() => {
    if (!modal) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {if (e.key === "Escape") setModal(false);};
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const go = (id: ViewId) => {
    setView(id);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const label = views.find(v => v.id === view)?.label ?? "Today";

  return (
    <div className="hub">
      <aside className="hub-side">
        <div className="hub-side-brand">
          <span className="hub-mark" aria-hidden><i /><i /></span>
          <span>CUEPA</span>
        </div>

        <div className="hub-ws">
          <small>Internal sandbox</small>
          <b>ELIPAN GROUP LLC</b>
        </div>

        <nav className="hub-nav" aria-label="Operations hub sections">
          {views.map(v => (
            <button
              key={v.id}
              type="button"
              data-short={v.short}
              aria-current={view === v.id ? "page" : undefined}
              onClick={() => go(v.id)}
            >
              <span>{v.label}</span>
              {v.count ? <span className="hub-count">{v.count}</span> : null}
            </button>
          ))}
        </nav>

        <div className="hub-side-foot">
          <div className="hub-user">
            <span className="hub-avatar" aria-hidden>MC</span>
            <span><b>Workspace owner</b><br />Managing Member</span>
          </div>
        </div>
      </aside>

      <main className="hub-main">
        <header className="hub-top">
          <div className="hub-top-left">
            <Link className="hub-back" href="/">← Back to the site</Link>
            <span className="hub-crumb">CUEPA operations / {label}</span>
          </div>
          <div className="hub-top-right">
            <span className="hub-badge"><i aria-hidden />Internal Sandbox — No Client Systems Connected</span>
            <button
              type="button"
              className="hub-primary"
              onClick={() => {setBanner(true); say("A draft is ready for you to review. Nothing has been sent.");}}
            >
              Review drafted follow-ups
            </button>
          </div>
        </header>

        <div className="hub-content">
          {/* ── TODAY ─────────────────────────────────────── */}
          <section className="hub-view" id="hub-today" hidden={view !== "today"}>
            <div className="hub-hello">
              <div>
                <span className="hub-eyebrow">Internal Sandbox — Illustrative Data</span>
                <h1>Here’s what needs you.</h1>
                <p>
                  Three things need a decision. Everything else is being tracked in one place instead of
                  across a notes app, an inbox, and memory.
                </p>
              </div>
              <div className="hub-status">
                Sandbox
                <b>● No client systems connected</b>
              </div>
            </div>

            {banner && (
              <div className="hub-notice">
                <div>
                  <span className="hub-notice-k">DRAFT READY FOR REVIEW</span>
                  <p>
                    A deposit follow-up has been prepared. It is being held until bank details exist to
                    include, and it will not be sent without your confirmation.
                  </p>
                </div>
                <button type="button" className="hub-primary" onClick={() => setModal(true)}>
                  Review the draft
                </button>
              </div>
            )}

            <div className="hub-grid">
              <div className="hub-col hub-col-1">
                <div className="hub-card hub-needs">
                  <div className="hub-card-title">
                    <div>
                      <span className="hub-eyebrow">Ready for your decision</span>
                      <h2>What needs you today.</h2>
                    </div>
                  </div>
                  {needs.map((n, i) => (
                    <div className="hub-need" key={n.t}>
                      <span className="hub-need-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <b>{n.t}</b>
                        <p>{n.d}</p>
                        <button
                          type="button"
                          className={n.go ? "hub-go" : undefined}
                          disabled={approved.includes(i)}
                          onClick={() => {
                            setApproved(a => [...a, i]);
                            say("Marked as handled in this sandbox. Nothing outside it changed.");
                          }}
                        >
                          {approved.includes(i) ? "Handled ✓" : n.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hub-card hub-later">
                  <span className="hub-eyebrow">Why this exists</span>
                  <h3>Run the process here first.</h3>
                  <p>
                    This is the same hub a client gets, pointed at CUEPA’s own operations. It is where
                    the build and the workflow get exercised before anything touches a client system.
                  </p>
                  <ul>
                    <li>Nothing here reads from or writes to a client account</li>
                    <li>Mistakes cost nothing — break it freely</li>
                    <li>What works here becomes the pattern that ships</li>
                  </ul>
                </div>
              </div>

              <div className="hub-col hub-col-2">
                <div className="hub-card hub-sched">
                  <div className="hub-sched-head">
                    <div>
                      <span className="hub-eyebrow">One calendar</span>
                      <h2>Today, in one view.</h2>
                    </div>
                    <span className="hub-tag hub-tag-quiet">SAMPLE DAY</span>
                  </div>
                  <div className="hub-slots">
                    {day.map(s => (
                      <div className="hub-slot" key={s.time}>
                        <time>{s.time}</time>
                        <div>
                          {s.block && (
                            <div className={`hub-block ${s.block.k}`}>
                              <b>{s.block.t}</b>
                              <small>{s.block.s}</small>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hub-sched-actions">
                    <button type="button" className="hub-ghost" onClick={() => go("calendar")}>
                      Open the full calendar
                    </button>
                    <button
                      type="button"
                      className="hub-ghost"
                      onClick={() => say("Sandbox only — no calendar is connected yet.")}
                    >
                      ↻ Resync sources
                    </button>
                  </div>
                </div>
              </div>

              <div className="hub-col hub-col-3">
                <div className="hub-card">
                  <div className="hub-card-title">
                    <div>
                      <span className="hub-eyebrow">Prepared for you</span>
                      <h3>Drafted follow-ups</h3>
                    </div>
                    <span className="hub-tag">NOT SENT</span>
                  </div>
                  {reminders.map((r, i) => (
                    <div
                      className="hub-item"
                      key={r.t}
                      style={discarded.includes(i) ? {opacity: 0.4} : undefined}
                    >
                      <span className="hub-when">{r.when}</span>
                      <b>{r.t}</b>
                      <p>{r.d}</p>
                      <div className="hub-mini">
                        <button
                          type="button"
                          className="hub-send"
                          onClick={() => say("Opened for your review. Nothing is sent in this sandbox.")}
                        >
                          Review &amp; send
                        </button>
                        <button type="button" onClick={() => say("Editing would open here in the built system.")}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDiscarded(d => [...d, i]);
                            say("Draft discarded. Nothing was sent.");
                          }}
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hub-card">
                  <div className="hub-card-title">
                    <div>
                      <span className="hub-eyebrow">Activity</span>
                      <h3>What the hub did today</h3>
                    </div>
                    <span className="hub-tag hub-tag-quiet">SAMPLE</span>
                  </div>
                  <div className="hub-log">
                    {log.map(([t, what, tag]) => (
                      <div className="hub-event" key={what}>
                        <time>{t}</time>
                        <span>{what}</span>
                        <span className="hub-tag">{tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="hub-trustline">
                    <i aria-hidden />
                    <span>Preparing and flagging happen automatically. Sending and approving stay with a person.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CALENDAR ──────────────────────────────────── */}
          <section className="hub-view" id="hub-calendar" hidden={view !== "calendar"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">01 — See</span>
              <h1>One calendar.</h1>
              <p>
                Filing deadlines, tax dates, invoice due dates and engagement commitments in a single
                view, so a deadline that was agreed in a contract is visible next to the week it lands in.
              </p>
            </div>
            <div className="hub-table">
              {calendarRows.map(([t, when, src, kind]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{src}</small></div>
                  <span className="hub-meta">{when}</span>
                  <span className={`hub-state${kind === "BLOCKING" || kind === "OVERDUE" ? " hub-open" : ""}`}>{kind}</span>
                </div>
              ))}
            </div>
            <div className="hub-card hub-later" style={{marginTop: 18}}>
              <span className="hub-eyebrow">Sandbox</span>
              <h3>Nothing above is connected.</h3>
              <p>
                These rows are typed in by hand to exercise the layout. Connecting a real calendar is a
                build step, and it happens here first before it happens for a client.
              </p>
            </div>
          </section>

          {/* ── INVOICES ──────────────────────────────────── */}
          <section className="hub-view" id="hub-invoices" hidden={view !== "invoices"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">02 — Get paid</span>
              <h1>Invoices and milestones.</h1>
              <p>
                What has been sent, what is outstanding, and what cannot be issued yet — so the thing
                standing between work done and money received is visible rather than remembered.
              </p>
            </div>
            <div className="hub-table">
              {invoiceRows.map(([t, when, state, cls]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{when}</small></div>
                  <span className="hub-meta">Engagement</span>
                  <span className={`hub-state ${cls}`}>{state}</span>
                </div>
              ))}
            </div>
            <div className="hub-strip" style={{marginTop: 18}}>
              {[
                ["Issued", "The invoice goes out with the agreement, not after it."],
                ["Outstanding", "What is unpaid is on the same screen as the work it paid for."],
                ["Blocked", "If something cannot be invoiced yet, the reason is named."],
                ["Cleared", "Payment is recorded against the milestone it belongs to."]
              ].map(([t, d], i) => (
                <div className="hub-card" key={t}>
                  <span className="hub-eyebrow">Step {String(i + 1).padStart(2, "0")}</span>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ENGAGEMENTS ───────────────────────────────── */}
          <section className="hub-view" id="hub-engagements" hidden={view !== "engagements"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">03 — Follow through</span>
              <h1>Engagements and what they are waiting on.</h1>
              <p>
                Every piece of work, and the one thing blocking each of them, in a single list — so a
                project that is quietly stalled looks different from one that is moving.
              </p>
            </div>
            <div className="hub-table">
              {engagementRows.map(([t, d, state, cls]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{d}</small></div>
                  <span className="hub-meta">Engagement</span>
                  <span className={`hub-state ${cls}`}>{state}</span>
                </div>
              ))}
            </div>
            <div className="hub-meets" style={{marginTop: 18}}>
              {meetings.map(m => (
                <div className="hub-card hub-meet" key={m.t}>
                  <div className="hub-card-title">
                    <div>
                      <span className="hub-eyebrow">{m.when}</span>
                      <h3>{m.t}</h3>
                    </div>
                    <span className="hub-tag hub-tag-quiet">SAMPLE</span>
                  </div>
                  <ul>
                    {m.items.map(([t, s]) => (
                      <li key={t}><span>{t}</span><span>{s}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── FILINGS ───────────────────────────────────── */}
          <section className="hub-view" id="hub-filings" hidden={view !== "filings"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">04 — Stay legal</span>
              <h1>Filings and obligations.</h1>
              <p>
                Formation, tax registration, banking, insurance and the recurring filings that follow —
                tracked in the same place as the work, because missing one of them stops the work.
              </p>
            </div>
            <div className="hub-table">
              {filingRows.map(([t, d, state, cls]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{d}</small></div>
                  <span className="hub-meta">Obligation</span>
                  <span className={`hub-state ${cls}`}>{state}</span>
                </div>
              ))}
            </div>
            <div className="hub-card hub-later" style={{marginTop: 18}}>
              <span className="hub-eyebrow">Dependency</span>
              <h3>These block each other in order.</h3>
              <p>
                Formation confirmation unlocks the EIN. The EIN unlocks the bank account. The bank
                account unlocks the deposit. A hub that shows the chain is more useful than four
                separate reminders.
              </p>
            </div>
          </section>

          {/* ── ACCESS ────────────────────────────────────── */}
          <section className="hub-view" id="hub-access" hidden={view !== "access"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">Basic access controls</span>
              <h1>Who sees what.</h1>
              <p>
                The same model a client gets, tested here first. Financial and client information stays
                visible only to the appropriate role, described in plain language and reversible.
              </p>
            </div>
            <div className="hub-strip">
              {accessCards.map(([t, d]) => (
                <div className="hub-card" key={t}>
                  <span className="hub-eyebrow">Control</span>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <div className="hub-table">
              {accessRows.map(([role, sees, level]) => (
                <div className="hub-row" key={role}>
                  <div><b>{role}</b><small>{sees}</small></div>
                  <span className="hub-meta">Illustrative role</span>
                  <span className={`hub-state ${level === "FULL" ? "hub-human" : ""}`}>{level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ── review dialog ───────────────────────────────── */}
      {modal && (
        <div
          className="hub-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hub-modal-title"
          onClick={e => {if (e.target === e.currentTarget) setModal(false);}}
        >
          <div className="hub-modal">
            <div className="hub-modal-head">
              <div>
                <span className="hub-eyebrow">Nothing is sent without you</span>
                <h2 id="hub-modal-title">Review the drafted follow-up</h2>
              </div>
              <button
                type="button"
                className="hub-x"
                ref={closeRef}
                aria-label="Close"
                onClick={() => setModal(false)}
              >
                ×
              </button>
            </div>
            <div className="hub-modal-body">
              <span className="hub-eyebrow">Draft text</span>
              <p className="hub-quote">
                “Following up on the deposit invoice. Remittance details are attached — let me know if
                anything needs to go to a different address and I’ll reissue it.”
              </p>
              <span className="hub-eyebrow">What would happen</span>
              <div className="hub-change"><b>SEND TO</b><span>The billing contact on the engagement</span></div>
              <div className="hub-change"><b>WHEN</b><span>Held until bank details exist to include</span></div>
              <div className="hub-change"><b>REPEAT</b><span>Once more after seven days, if still outstanding</span></div>
              <p className="hub-sub" style={{marginTop: 16}}>
                Nothing has been sent. In this sandbox, confirming only closes this window — no message
                leaves the system and no calendar is changed.
              </p>
            </div>
            <div className="hub-modal-actions">
              <button type="button" className="hub-ghost" onClick={() => say("Editing would open here in the built system.")}>
                Edit the draft
              </button>
              <button
                type="button"
                className="hub-ghost"
                onClick={() => {setModal(false); setBanner(false); say("Draft discarded. Nothing was sent.");}}
              >
                Discard
              </button>
              <button
                type="button"
                className="hub-ghost hub-confirm"
                onClick={() => {setModal(false); setBanner(false); say("Confirmed in this sandbox. No follow-up was actually sent.");}}
              >
                Confirm the schedule
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`hub-toast${toast ? " hub-show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
