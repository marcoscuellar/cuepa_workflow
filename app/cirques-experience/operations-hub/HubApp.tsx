"use client";

/* ─────────────────────────────────────────────────────────────
   Cirques Experience Operations Hub — Phase One concept.

   Everything on this screen is illustrative. There is no backend,
   no integration, and no stored data: buttons change local state
   and raise a message, nothing is sent anywhere.

   All sample content is generic by design — roles, not people;
   categories, not vendors; dates, not amounts. Do not replace it
   with real employee, payroll, vendor, family, or financial
   information while this is a shared concept.
   ───────────────────────────────────────────────────────────── */

import {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";

type ViewId = "today" | "calendar" | "timecards" | "vendors" | "meetings" | "access";

const views: {id: ViewId; label: string; short: string; count?: number}[] = [
  {id: "today", label: "Today", short: "NOW", count: 3},
  {id: "calendar", label: "Calendar", short: "CAL"},
  {id: "timecards", label: "Timecards", short: "TIME", count: 2},
  {id: "vendors", label: "Vendors", short: "VEND"},
  {id: "meetings", label: "Meetings", short: "MEET", count: 1},
  {id: "access", label: "Access", short: "WHO"}
];

const needs = [
  {
    t: "Approve the timecards for this period",
    d: "Two timecards are still outstanding for the period that closes Friday.",
    cta: "Review & approve",
    go: true
  },
  {
    t: "Confirm the payroll submission date",
    d: "The next payroll deadline falls the day after a scheduled program event.",
    cta: "Review"
  },
  {
    t: "Assign an owner to an open vendor task",
    d: "A follow-up from last week’s operations meeting has no owner yet.",
    cta: "Choose"
  }
];

const day = [
  {time: "9:00 AM", block: {t: "Operations check-in", s: "Recurring · 30 minutes", k: ""}},
  {time: "10:00 AM", block: null},
  {time: "11:00 AM", block: {t: "Timecard submission closes", s: "Payroll deadline", k: "hub-deadline"}},
  {time: "12:00 PM", block: null},
  {time: "1:00 PM", block: {t: "Program event — afternoon session", s: "Organizational calendar", k: "hub-program"}},
  {time: "3:00 PM", block: {t: "Vendor call — equipment scheduling", s: "Meeting · 30 minutes", k: ""}}
];

const reminders = [
  {
    t: "Timecard reminder",
    d: "Drafted for the two staff roles with outstanding timecards, scheduled ahead of Friday’s close.",
    when: "SCHEDULED · THU 8:00 AM"
  },
  {
    t: "Payroll deadline notice",
    d: "Drafted for the approver, so the submission date is confirmed before the deadline.",
    when: "SCHEDULED · MON 9:00 AM"
  }
];

const log = [
  ["8:02 AM", "Timecard status refreshed from the connected source", "PREPARED"],
  ["8:14 AM", "Calendar conflict flagged between an event and a deadline", "FLAGGED"],
  ["8:31 AM", "Vendor follow-up added to the open list", "QUEUED"]
];

const calendarRows = [
  ["Payroll submission deadline", "Recurs each period", "Payroll calendar", "DEADLINE"],
  ["Program event — afternoon session", "This week", "Organizational calendar", "EVENT"],
  ["Operations check-in", "Weekly", "Meeting calendar", "MEETING"],
  ["Vendor payment date", "This month", "Vendor tracking", "PAYMENT"],
  ["Timecard submission closes", "Each period", "Payroll calendar", "DEADLINE"]
];

const timecardRows = [
  ["Current period", "Closes Friday", "2 outstanding", "hub-open"],
  ["Previous period", "Closed", "All received", ""],
  ["Reminder — before close", "Drafted, awaiting your review", "Not sent", "hub-open"],
  ["Reminder — day of close", "Drafted, awaiting your review", "Not sent", "hub-open"]
];

const vendorRows = [
  ["Equipment rental — scheduling confirmation", "Follow-up from the operations meeting", "Owner needed", "hub-open"],
  ["Transportation vendor — date change", "Confirm the revised date with the vendor", "In progress", ""],
  ["Facility services — payment date", "Tracked against the vendor calendar", "Scheduled", ""],
  ["Catering — final headcount", "Waiting on the program lead", "Waiting", "hub-open"]
];

const meetings = [
  {
    t: "Operations check-in",
    when: "Weekly",
    items: [
      ["Confirm the payroll submission date for the period", "OPEN"],
      ["Assign an owner to the equipment rental follow-up", "OPEN"],
      ["Review the outstanding timecards before Friday", "DONE"]
    ]
  },
  {
    t: "Program planning",
    when: "Monthly",
    items: [
      ["Add the confirmed event dates to the shared calendar", "DONE"],
      ["Send the revised date to the transportation vendor", "OPEN"]
    ]
  }
];

const accessCards = [
  ["Roles, not individuals", "Access is granted by role so it can be reviewed and changed without touching each account."],
  ["Least visibility that works", "Payroll and vendor detail is limited to the people who need it for their part of the work."],
  ["Visible and revocable", "Who can see what is written down, reviewable, and reversible at any time."],
  ["Approvals stay human", "Reminders and follow-ups are prepared for a person to review. Nothing is sent on its own."]
];

const accessRows = [
  ["Workspace owner", "Everything in the hub, including approvals", "FULL"],
  ["Operations approver", "Timecards, payroll dates, vendor tasks, calendar", "SCOPED"],
  ["Program lead", "Calendar, meetings, and their own next steps", "SCOPED"],
  ["Staff role", "Their own timecard status and reminders", "LIMITED"]
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
          <small>Concept workspace</small>
          <b>Cirques Experience</b>
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
            <span className="hub-avatar" aria-hidden>CE</span>
            <span><b>Workspace owner</b><br />Illustrative role</span>
          </div>
        </div>
      </aside>

      <main className="hub-main">
        <header className="hub-top">
          <div className="hub-top-left">
            <Link className="hub-back" href="/cirques-experience">← Back to the proposal</Link>
            <span className="hub-crumb">Operations hub / {label}</span>
          </div>
          <div className="hub-top-right">
            <span className="hub-badge"><i aria-hidden />Phase One Concept — Illustrative Data</span>
            <button
              type="button"
              className="hub-primary"
              onClick={() => {setBanner(true); say("A reminder draft is ready for you to review. Nothing has been sent.");}}
            >
              Review drafted reminders
            </button>
          </div>
        </header>

        <div className="hub-content">
          {/* ── TODAY ─────────────────────────────────────── */}
          <section className="hub-view" id="hub-today" hidden={view !== "today"}>
            <div className="hub-hello">
              <div>
                <span className="hub-eyebrow">Phase One Concept — Illustrative Data</span>
                <h1>Here’s what needs you.</h1>
                <p>
                  Three things need a decision from you. Everything else is being tracked in one place
                  instead of across separate systems.
                </p>
              </div>
              <div className="hub-status">
                Concept preview
                <b>● No live systems connected</b>
              </div>
            </div>

            {banner && (
              <div className="hub-notice">
                <div>
                  <span className="hub-notice-k">DRAFT READY FOR REVIEW</span>
                  <p>
                    A timecard reminder has been prepared for the two roles with outstanding timecards.
                    It has not been sent, and it will not be sent without your confirmation.
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
                            say("Marked as handled in this concept. No system was changed.");
                          }}
                        >
                          {approved.includes(i) ? "Handled ✓" : n.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hub-card hub-later">
                  <span className="hub-eyebrow">After launch</span>
                  <h3>Results are measured, not estimated.</h3>
                  <p>
                    This concept does not show performance results, because there is nothing to measure
                    yet. Reporting becomes available after Phase One launches and a baseline has been
                    taken from how the work runs today.
                  </p>
                  <ul>
                    <li>A baseline is recorded before anything changes</li>
                    <li>Reporting starts after launch, against that baseline</li>
                    <li>Every figure traces back to a source you can check</li>
                  </ul>
                </div>
              </div>

              <div className="hub-col hub-col-2">
                <div className="hub-card hub-sched">
                  <div className="hub-sched-head">
                    <div>
                      <span className="hub-eyebrow">Unified calendar</span>
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
                      onClick={() => say("Concept only — no calendar is connected yet.")}
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
                      <h3>Drafted reminders</h3>
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
                          onClick={() => say("Opened for your review. Nothing is sent in this concept.")}
                        >
                          Review & send
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
                Important dates, organizational events, payroll deadlines, meetings, and vendor payment
                dates in a single view, so a deadline and an event landing on the same day is visible
                before it becomes a problem.
              </p>
            </div>
            <div className="hub-table">
              {calendarRows.map(([t, when, src, kind]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{src}</small></div>
                  <span className="hub-meta">{when}</span>
                  <span className="hub-state">{kind}</span>
                </div>
              ))}
            </div>
            <div className="hub-card hub-later" style={{marginTop: 18}}>
              <span className="hub-eyebrow">Illustrative</span>
              <h3>Sources are confirmed during discovery.</h3>
              <p>
                The calendars above are placeholders. Which calendars are included, and who can see
                each one, is decided together in Week 1 before anything is connected.
              </p>
            </div>
          </section>

          {/* ── TIMECARDS ─────────────────────────────────── */}
          <section className="hub-view" id="hub-timecards" hidden={view !== "timecards"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">02 — Track</span>
              <h1>Timecards and payroll.</h1>
              <p>
                What is outstanding, when the deadline is, and which reminders are drafted — without
                chasing anyone by hand. Reminders are prepared automatically and sent only after review.
              </p>
            </div>
            <div className="hub-table">
              {timecardRows.map(([t, when, state, cls]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{when}</small></div>
                  <span className="hub-meta">Payroll period</span>
                  <span className={`hub-state ${cls}`}>{state}</span>
                </div>
              ))}
            </div>
            <div className="hub-strip" style={{marginTop: 18}}>
              {[
                ["Outstanding", "See who has not submitted, by role, before the period closes."],
                ["Deadline", "The submission date sits on the same calendar as everything else."],
                ["Reminder", "Drafted ahead of the close and held for your review."],
                ["Confirmation", "Approval is recorded so there is a trail of who signed off."]
              ].map(([t, d], i) => (
                <div className="hub-card" key={t}>
                  <span className="hub-eyebrow">Step {String(i + 1).padStart(2, "0")}</span>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── VENDORS ───────────────────────────────────── */}
          <section className="hub-view" id="hub-vendors" hidden={view !== "vendors"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">03 — Follow through</span>
              <h1>Vendors and payments.</h1>
              <p>
                Open vendor tasks, payment dates, and anything still unresolved, kept in one list so a
                follow-up does not depend on someone remembering it.
              </p>
            </div>
            <div className="hub-table">
              {vendorRows.map(([t, d, state, cls]) => (
                <div className="hub-row" key={t}>
                  <div><b>{t}</b><small>{d}</small></div>
                  <span className="hub-meta">Vendor task</span>
                  <span className={`hub-state ${cls}`}>{state.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <div className="hub-card hub-later" style={{marginTop: 18}}>
              <span className="hub-eyebrow">Illustrative</span>
              <h3>Categories, not real vendors.</h3>
              <p>
                The rows above are generic categories used to show the layout. Actual vendors, dates,
                and amounts stay inside your own systems and are added only with your approval.
              </p>
            </div>
          </section>

          {/* ── MEETINGS ──────────────────────────────────── */}
          <section className="hub-view" id="hub-meetings" hidden={view !== "meetings"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">04 — Decide</span>
              <h1>Meetings and next steps.</h1>
              <p>
                Decisions and next steps stay attached to the meeting they came from, with an owner and
                a date, so post-meeting responsibilities do not disappear into a notes document.
              </p>
            </div>
            <div className="hub-meets">
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

          {/* ── ACCESS ────────────────────────────────────── */}
          <section className="hub-view" id="hub-access" hidden={view !== "access"}>
            <div className="hub-pagehead">
              <span className="hub-eyebrow">Basic access controls</span>
              <h1>Who sees what.</h1>
              <p>
                Operational and financial information stays visible only to the appropriate people.
                Access is described in plain language, reviewable, and reversible.
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
                <h2 id="hub-modal-title">Review the drafted reminder</h2>
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
                “A quick reminder that timecards for this period close on Friday at 11:00 AM. If yours
                is already in, no action is needed.”
              </p>
              <span className="hub-eyebrow">What would happen</span>
              <div className="hub-change"><b>SEND TO</b><span>The roles with an outstanding timecard for this period</span></div>
              <div className="hub-change"><b>WHEN</b><span>Thursday at 8:00 AM, one day before the close</span></div>
              <div className="hub-change"><b>REPEAT</b><span>Once more on the morning of the deadline, if still outstanding</span></div>
              <p className="hub-sub" style={{marginTop: 16}}>
                Nothing has been sent. In this concept, confirming only closes this window — no message
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
                onClick={() => {setModal(false); setBanner(false); say("Confirmed in this concept. No reminder was actually sent.");}}
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
