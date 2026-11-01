"use client";

import {useRef, type ReactNode} from "react";
import {motion, useReducedMotion, useScroll, useTransform, type MotionValue} from "motion/react";

// "How it works" deck: four full-width turns that pin under the fixed nav and stack as you scroll.
// Each card is a 50/50 split: photo with floating CUEPA notifications | the turn and its deliverable.
// Copy and notification text are as supplied by Marcos (Nov 1, 2026).
// Motion: as the next card slides over, the one beneath scales back slightly (off when reduced motion is on).

type TurnStep = {
  number: string;
  verb: string;
  deliverable: string;
  headline: string;
  subtext: string;
  imageSrc: string;
  imageAlt: string;
  floatingNotifications: {tag: string; tagColor: string; body: string; meta?: string}[];
  deliverableCard: {
    header: string;
    badge: string;
    rows: {label: string; value: string; action?: string}[];
    footerNotice: string;
  };
};

const turns: TurnStep[] = [
  {
    number: "01",
    verb: "FIND",
    deliverable: "The Room Map",
    headline: "We learn the way you make room.",
    subtext: "We sit with the people doing the work and map how tasks actually flow: tools, handoffs, friction, and hidden scope.",
    imageSrc: "/contact-team.jpg",
    imageAlt: "Small studio team planning workflows together",
    floatingNotifications: [
      {tag: "LISTENED", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Sat with all 6 of your people. Wrote down how the work really moves — in their words."},
      {tag: "MAPPED", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Your Room Map is drafted: 3 builds recommended, 2 things stay human, 1 protected."}
    ],
    deliverableCard: {
      header: "How work moves — mapped.",
      badge: "11 workflows observed • 6 people heard",
      rows: [
        {label: "Invoicing & billing", value: "Rebuilt by hand weekly", action: "AUTOMATE"},
        {label: "Lead follow-up", value: "42 min average response", action: "AUTOMATE"},
        {label: "Scheduling changes", value: "3.1 hrs/wk back-and-forth", action: "AUTOMATE"},
        {label: "Client relationships", value: "The part only you can do", action: "STAYS HUMAN"}
      ],
      footerNotice: "Room Found: 11.5 hrs / week. Nothing is built until you approve it."
    }
  },
  {
    number: "02",
    verb: "FLOW",
    deliverable: "The Working System",
    headline: "The noise resolves. The day gets a shape.",
    subtext: "The system is built around how you already operate. Actions prepared, drafts cued, exceptions flagged. You keep the decisions.",
    imageSrc: "/flow-cubs-game.jpg",
    imageAlt: "Father and son cheering at Wrigley Field in Cubs jerseys",
    floatingNotifications: [
      {tag: "CAUGHT", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Two emails from client came in. Replies drafted from your verified templates."},
      {tag: "CONFIRMED", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Robert asked to push meeting to 3pm. Schedule was open — confirmed."},
      {tag: "QUEUED", tagColor: "text-[#E3A33B] border-[#E3A33B]/30", body: "Invoice #1048 nudged politely. Third late one this month — flagged for review."}
    ],
    deliverableCard: {
      header: "Good morning, Marcos.",
      badge: "Tuesday • Operating Plan Protected",
      rows: [
        {label: "Approve estimate", value: "Lakeshore review: 2 min", action: "DECISION"},
        {label: "Rivera brief", value: "Ready for 11:30 call", action: "PREPARED"},
        {label: "Invoice #1048", value: "Drafted & queued", action: "HANDLED"},
        {label: "Cubs with son", value: "Protected until 6:00 PM", action: "ROOM"}
      ],
      footerNotice: "Everything else is handled. 1 item needs your sign-off today."
    }
  },
  {
    number: "03",
    verb: "PROVE",
    deliverable: "The Room Report",
    headline: "We don’t say it worked. We show you.",
    subtext: "Audited before-and-after metrics measured directly against your ledger, calendar, and payroll hours.",
    imageSrc: "/prove-workbench.jpg",
    imageAlt: "Craftsman focused on detailed work at bench beside window",
    floatingNotifications: [
      {tag: "DONE", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Your 4pm moved to tomorrow — notes sent, client covered. Clear for the night."},
      {tag: "REPORTED", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "11.5 hours verified back this week. Most of it after 6:00 PM. That was the point."}
    ],
    deliverableCard: {
      header: "Your room, before → after",
      badge: "Measured against week 1 baseline",
      rows: [
        {label: "Lead response speed", value: "42 min → 4 min", action: "10x FASTER"},
        {label: "Weekly payroll hours returned", value: "0 hrs → 11.5 hrs", action: "RECLAIMED"},
        {label: "Invoice syntax errors", value: "8 caught before sending", action: "ZERO LEAK"}
      ],
      footerNotice: "The evenings came back. Verified against actual time logs."
    }
  },
  {
    number: "04",
    verb: "GROW",
    deliverable: "The Next Opportunity",
    headline: "The room becomes what’s next.",
    subtext: "The running system keeps looking for what a busy human cannot see. Opportunities surface as drafts—never autonomous risks.",
    imageSrc: "/trust-woman-evening.jpg",
    imageAlt: "Woman smiling, walking her dog outside in evening light",
    floatingNotifications: [
      {tag: "FOUND • UNBILLED", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "Found $3,180 across 4 clients, back 62 days. Drafted for your approval."},
      {tag: "WARM WIN-BACK", tagColor: "text-[#2DD4BF] border-[#2DD4BF]/30", body: "92 days since regular client ordered. Note drafted based on past orders."}
    ],
    deliverableCard: {
      header: "Capacity reinvested.",
      badge: "Continuous cycle ↻",
      rows: [
        {label: "Tuesday capacity", value: "Runs 34% under ceiling", action: "OPTIMIZED"},
        {label: "Next hire scope", value: "Role spec drafted from logs", action: "READY"},
        {label: "New client runway", value: "Room for 3 accounts", action: "UNLOCKED"}
      ],
      footerNotice: "Growth feeds directly back into FIND. The cycle turns again."
    }
  }
];

export default function HowItWorksDeck() {
  const deck = useRef<HTMLOListElement>(null);
  const {scrollYProgress} = useScroll({target: deck, offset: ["start start", "end end"]});
  return (
    <section aria-label="The four turns" className="relative w-full bg-[#030303] text-[#F4F5F5] py-24 md:py-36 px-4 sm:px-6 lg:px-8 selection:bg-[#2DD4BF] selection:text-black">
      {/* Sticky deck: each card pins 112px from the top (clears the 92px fixed nav), offset 16px per card so the stack shows. */}
      <ol ref={deck} className="max-w-7xl mx-auto flex flex-col gap-24 relative list-none m-0 p-0">
        {turns.map((step, index) => (
          <DeckCard key={step.number} index={index} total={turns.length} progress={scrollYProgress}>
            {/* Top step meta rail */}
            <div className="px-6 sm:px-10 py-5 bg-[#070A0A] border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#2DD4BF]">{step.number}</span>
                <span className="h-4 w-px bg-neutral-800" aria-hidden="true"/>
                <h3 className="m-0 text-xl sm:text-2xl font-black uppercase tracking-wider text-white">{step.verb}</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131919] border border-neutral-700/60 text-xs font-mono uppercase tracking-wider text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" aria-hidden="true"/>
                Deliverable: <strong className="text-white">{step.deliverable}</strong>
              </div>
            </div>

            {/* Body: 50/50 split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[580px]">
              {/* Left: full-height photo with floating notifications */}
              <div className="relative min-h-[420px] lg:min-h-full overflow-hidden bg-neutral-950">
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full max-w-none object-cover object-center brightness-[0.78] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-[#0B0F0F]" aria-hidden="true"/>
                <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-12 flex flex-col gap-3.5 z-10">
                  {step.floatingNotifications.map((notif, nIdx) => (
                    <div key={nIdx} className="backdrop-blur-xl bg-black/75 border border-white/10 rounded-2xl p-4 shadow-2xl max-w-lg">
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${notif.tagColor}`}>{notif.tag}</span>
                        <span className="text-[11px] font-mono text-neutral-400">CUEPA • ACTIVE</span>
                      </div>
                      <p className="m-0 text-sm font-medium text-neutral-200 leading-snug">{notif.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: the turn and its deliverable */}
              <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#0B0F0F] min-w-0">
                <div>
                  <p className="m-0 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">{step.headline}</p>
                  <p className="m-0 text-sm sm:text-base text-neutral-400 mt-3 font-normal leading-relaxed">{step.subtext}</p>

                  <div className="mt-8 rounded-2xl bg-[#121818] border border-neutral-800 p-5 shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3 mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">{step.deliverableCard.header}</span>
                      <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded">{step.deliverableCard.badge}</span>
                    </div>
                    <div className="space-y-3">
                      {step.deliverableCard.rows.map((row, rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between gap-3 text-xs py-1.5 border-b border-neutral-800/40 last:border-0">
                          <div className="min-w-0">
                            <p className="m-0 font-semibold text-neutral-200">{row.label}</p>
                            <p className="m-0 text-[11px] text-neutral-400">{row.value}</p>
                          </div>
                          {row.action && (
                            <span className="shrink-0 font-mono text-[10px] font-bold text-neutral-300 bg-black/60 border border-neutral-700 px-2 py-1 rounded">{row.action}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                  <p className="m-0 text-xs text-neutral-400 font-mono">{step.deliverableCard.footerNotice}</p>
                  <span className="shrink-0 text-sm font-bold text-[#2DD4BF] flex items-center gap-1">Inspect <span aria-hidden="true">→</span></span>
                </div>
              </div>
            </div>
          </DeckCard>
        ))}
      </ol>
    </section>
  );
}

function DeckCard({index, total, progress, children}: {index: number; total: number; progress: MotionValue<number>; children: ReactNode}) {
  const reduce = useReducedMotion();
  // Card i starts shrinking when its own turn in the scroll begins; earlier cards end smaller (stacked further back).
  const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : 1 - (total - 1 - index) * 0.04]);
  return (
    <li className="sticky" style={{top: `calc(112px + ${index * 16}px)`, zIndex: index + 10}}>
      <motion.div
        style={{scale, transformOrigin: "top center"}}
        className="rounded-3xl border border-neutral-800 bg-[#0B0F0F] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {children}
      </motion.div>
    </li>
  );
}
