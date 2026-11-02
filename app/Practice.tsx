"use client";

// The CUEPA Practice: four turns, told once, always in order (FIND → FLOW → PROVE → GROW ↻).
// Each turn pairs a business moment (photo, with see-through CUEPA notes on it) with an iPhone
// showing the work getting done at that moment. One company goal runs through all four, so the
// story is: we start with the goal, then put AI only where it pays off.
// All numbers are labeled Sample. Nothing here is a real client result.
// Motion (motion.dev): each turn plays as it scrolls in. Head rises, the photo settles, notes arrive
// one by one, the teal line draws to the phone, the phone rises and its rows tick in. Plays once.
// Off entirely when the visitor prefers reduced motion.

import {motion, useReducedMotion, type Variants} from "motion/react";

const EASE=[0.22,1,0.36,1] as const;
const VIEW={once:true,amount:0.3} as const;
const rise:Variants={hidden:{opacity:0,y:28,filter:"blur(6px)"},show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.7,ease:EASE}}};
const stagger=(gap:number,delay=0):Variants=>({hidden:{},show:{transition:{staggerChildren:gap,delayChildren:delay}}});
const note:Variants={hidden:{opacity:0,y:18,scale:.96},show:{opacity:1,y:0,scale:1,transition:{duration:.55,ease:EASE}}};
const row:Variants={hidden:{opacity:0,x:14},show:{opacity:1,x:0,transition:{duration:.45,ease:EASE}}};

type Note = {time: string; tag: string; body: string; warn?: boolean};
type Row = {title: string; sub?: string; hrs?: string; act: string; why?: string; human?: boolean; hideSm?: boolean};
type Turn = {
  id: string; n: string; name: string; deliverable: string;
  headline: string; lead: React.ReactNode;
  img: string; alt: string; caption: string;
  notes: Note[];
  phone: {time: string; app: string; title?: string; sub?: string; sample?: string; goal?: boolean; found?: string; rows: Row[]; foot: React.ReactNode};
};

const GOAL = "Open a second location by next fall.";

const turns: Turn[] = [
  {
    id: "find", n: "01", name: "Find", deliverable: "The Room Map",
    headline: "First, your goal. Then, the work in the way.",
    lead: <>We start with where you want the business to go. Then we sit with your people and map how work actually gets done, and how many hours it takes. <b>Every call on the map ties back to your goal,</b> so AI only goes where it pays off.</>,
    img: "/img/find-goal-meeting.jpg", alt: "An owner talking through her goal with a team member, a whiteboard of plans behind them", caption: "Setting the goal for location two",
    notes: [
      {time: "Day 1", tag: "Goal set", body: "Second location by next fall. Everything we map gets measured against that."},
      {time: "Day 5", tag: "Mapped", body: "11.5 hours a week of busywork found. 1 to automate, 1 to simplify, 1 to stop, 1 stays with you."}
    ],
    phone: {
      time: "5:42", app: "Room Map", goal: true, found: "11.5 hrs / wk",
      rows: [
        {title: "Invoicing by hand", hrs: "5 hrs", act: "Automate", why: "Your hours go to site visits for location two"},
        {title: "Lead follow-up", hrs: "4 hrs", act: "Simplify", why: "Faster replies fill the new location's calendar", hideSm: true},
        {title: "Weekly status report", hrs: "2.5 hrs", act: "Eliminate", why: "Nobody reads it. Stop making it"},
        {title: "Client relationships", act: "Stays human", why: "This is how you win the second location", human: true}
      ],
      foot: <><span className="pr-sample"><i aria-hidden="true"/>Sample</span><br/><b>Every call ties back to your goal.</b> Nothing is built until you approve it.</>
    }
  },
  {
    id: "flow", n: "02", name: "Flow", deliverable: "The Working System",
    headline: "The noise resolves. The day gets a shape.",
    lead: <>A Tuesday, already sorted, <b>while she&rsquo;s on the floor with her team.</b> The system does the sorting. She keeps the say.</>,
    img: "/img/flow-studio-team.jpg", alt: "An owner walking her design team through new samples at the studio table", caption: "On the floor with her team",
    notes: [
      {time: "1:22 PM", tag: "Caught", body: "Two emails from the client came in. Replies drafted from your templates."},
      {time: "1:36 PM", tag: "Confirmed", body: "Robert asked to push to 3pm. Your calendar was open, so it's confirmed."},
      {time: "1:48 PM", tag: "Needs a look", body: "Invoice #1048 nudged politely. Third late one this month, flagged.", warn: true}
    ],
    phone: {
      time: "7:58", app: "Today", title: "Good morning.", sub: "Tuesday · first meeting in 48 min", goal: true,
      rows: [
        {title: "Approve Lakeshore estimate", sub: "2 minutes", act: "Decision"},
        {title: "Rivera brief", sub: "Ready for the 10:30", act: "Prepared"},
        {title: "Invoice #1048", sub: "Drafted, waiting on your OK", act: "Handled"},
        {title: "Samples review with the team", sub: "Protected until 3:00 PM", act: "Room", human: true},
        {title: "Focus: finish the proposal", sub: "9:00 to 11:00, no meetings", act: "Protected", hideSm: true}
      ],
      foot: <>Everything else is handled. <b>1 thing needs you.</b></>
    }
  },
  {
    id: "prove", n: "03", name: "Prove", deliverable: "The Room Report",
    headline: "We don’t say it worked. We show you.",
    lead: <>The team sits down with the Room Report. <b>Baseline before, evidence after,</b> in your own numbers, so everyone sees what changed and what it&rsquo;s worth.</>,
    img: "/human-team.png", alt: "An owner and two team members reviewing work together at the studio table", caption: "Reviewing the numbers together",
    notes: [
      {time: "6:12 PM", tag: "Done", body: "Your 4pm moved to tomorrow. Notes sent, client covered. You're clear for the night."},
      {time: "Month 2", tag: "Reported", body: "Your Room Report is in. Measured against the baseline from week one."}
    ],
    phone: {
      time: "6:14", app: "Room Report", sample: "Sample · illustrative numbers", title: "Your room, before → after", sub: "Measured against the week-one baseline", goal: true,
      rows: [
        {title: "Lead response", sub: "42 min → 4 min", act: "Faster"},
        {title: "Hours returned", sub: "0 → 11.5 hrs / week", act: "Returned"},
        {title: "Invoice errors", sub: "17 caught before sending", act: "Caught"}
      ],
      foot: <><b>Verified against baseline.</b> Every number ties to a measurement taken before anything was built.</>
    }
  },
  {
    id: "grow", n: "04", name: "Grow ↻", deliverable: "The Next Opportunity",
    headline: "The room becomes what’s next.",
    lead: <>The room she got back <b>became the next hire.</b> The system keeps looking for what a busy owner can&rsquo;t see, then asks. Then it turns back to Find.</>,
    img: "/img/grow-new-hire.jpg", alt: "An owner welcoming a new hire with a handshake", caption: "Welcoming the new hire",
    notes: [
      {time: "Month 3", tag: "Ready", body: "The hours you got back cover a new role. A job description is drafted from your Room Map."},
      {time: "4:20 PM", tag: "Found", body: "Work that was never billed, across 4 clients. Invoices drafted for your review."}
    ],
    phone: {
      time: "4:31", app: "Found", title: "Room for what’s next.", sub: "Drafts only. Nothing goes out without you.", goal: true,
      rows: [
        {title: "Room for 1 new hire", sub: "Job description drafted from your Room Map", act: "Review"},
        {title: "Unbilled work", sub: "4 clients · invoices drafted", act: "Review"},
        {title: "Warm win-back", sub: "A regular went quiet", act: "Read note", hideSm: true}
      ],
      foot: <><span className="pr-sample"><i aria-hidden="true"/>Sample</span><br/><b>↻ What we learn goes back into Find.</b></>
    }
  }
];

function Mark({size=14}:{size?:number}){
  return <svg width={size} height={size} viewBox="14 14 72 72" aria-hidden="true"><rect x="14" y="14" width="30" height="72" fill="#030303"/><rect x="56" y="14" width="30" height="72" fill="#0F766E"/></svg>;
}

function Phone({p,reduce}:{p:Turn["phone"];reduce:boolean}){
  return (
    <motion.div className="pr-phone" role="img" aria-label={`CUEPA on a phone: ${p.app}`}
      initial={reduce?false:{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={VIEW}
      transition={{duration:.85,delay:.35,ease:EASE}}>
      <motion.div className="pr-screen" variants={stagger(.09,.75)} initial={reduce?false:"hidden"} whileInView="show" viewport={VIEW}>
        <span className="pr-island" aria-hidden="true"/>
        <span className="pr-sbar" aria-hidden="true"><span>{p.time}</span><span>●●●</span></span>
        <div className="pr-app"><Mark size={16}/>CUEPA<span>{p.app}</span></div>
        {p.sample && <span className="pr-sample"><i aria-hidden="true"/>{p.sample}</span>}
        {p.title && <h4>{p.title}</h4>}
        {p.sub && <p className="pr-sub">{p.sub}</p>}
        {p.goal && <motion.div variants={row} className="pr-goal"><small>Company goal</small><b>{GOAL}</b></motion.div>}
        {p.found && <motion.div variants={row} className="pr-found"><span>Busywork found</span><b>{p.found}</b></motion.div>}
        {p.rows.map(r=>(
          <motion.div variants={row} key={r.title} className={`pr-row${r.why?" has-why":""}${r.hideSm?" hide-sm":""}`}>
            <span className="pr-rt"><b>{r.title}</b>{r.hrs && <span className="pr-hrs"> · {r.hrs}</span>}{r.sub && <small>{r.sub}</small>}</span>
            <span className={`pr-act${r.human?" is-human":""}`}>{r.act}</span>
            {r.why && <span className="pr-why">{r.why}</span>}
          </motion.div>
        ))}
        <p className="pr-foot">{p.foot}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Practice(){
  const reduce=!!useReducedMotion();
  const init=reduce?false:"hidden";
  return (
    <div className="pr">
      <section className="pr-way" aria-labelledby="pr-way-h">
        <div className="pr-shell">
          <p className="pr-eyebrow">The CUEPA way</p>
          <h2 id="pr-way-h">Work gets done. Life keeps going.</h2>
          <p className="pr-lead">Four turns, always in order. While you run the business, CUEPA carries the work, and you keep every decision.</p>
          <motion.ol className="pr-rail" variants={stagger(.14,.15)} initial={init} whileInView="show" viewport={VIEW}>
            <motion.li className="pr-rail-line" aria-hidden="true" initial={reduce?false:{scaleX:0}} whileInView={{scaleX:1}} viewport={VIEW} transition={{duration:1.2,ease:EASE}}/>
            {turns.map(t=>(
              <motion.li variants={rise} key={t.id}><a href={`#${t.id}`}><span className="pr-step">{t.n}</span><b>{t.name}</b><small>{t.deliverable}</small></a></motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {turns.map((t,i)=>(
        <div key={t.id}>
          {i>0 && <p className="pr-then" aria-hidden="true">Then <b>{t.n} {t.name.replace(" ↻","")}</b></p>}
          <section className="pr-turn" id={t.id} aria-labelledby={`pr-${t.id}-h`}>
            <div className="pr-shell">
              <motion.div className="pr-head" variants={rise} initial={init} whileInView="show" viewport={VIEW}>
                <div>
                  <p className="pr-label"><span className="pr-step">{t.n}</span><span className="pr-name">{t.name}</span></p>
                  <h3 id={`pr-${t.id}-h`}>{t.headline}</h3>
                </div>
                <div>
                  <p className="pr-deliv">Deliverable · <b>{t.deliverable}</b></p>
                  <p className="pr-lead">{t.lead}</p>
                </div>
              </motion.div>
              <div className="pr-stage">
                <svg className="pr-route" viewBox="0 0 1200 680" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path d="M 300,420 C 520,400 640,300 760,330 C 880,360 940,340 1060,340" fill="none" stroke="#0F766E" strokeWidth={4} strokeLinecap="round"
                    initial={reduce?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={VIEW} transition={{duration:1.1,delay:.55,ease:"easeInOut"}}/>
                </svg>
                <motion.div className="pr-life" initial={reduce?false:{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={VIEW} transition={{duration:.8,ease:EASE}}>
                  <motion.img src={t.img} alt={t.alt} loading="lazy" initial={reduce?false:{scale:1.08}} whileInView={{scale:1}} viewport={VIEW} transition={{duration:1.4,ease:EASE}}/>
                  <span className="pr-cap"><i aria-hidden="true"/>{t.caption}</span>
                  <motion.ul className="pr-notes" aria-label="CUEPA notifications" variants={stagger(.28,.6)} initial={init} whileInView="show" viewport={VIEW}>
                    {t.notes.map(n=>(
                      <motion.li variants={note} key={n.time+n.tag} className="pr-note">
                        <span className="pr-note-top"><Mark/>CUEPA <em>· {n.time}</em><span className={`pr-tag${n.warn?" is-warn":""}`}><i aria-hidden="true"/>{n.tag}</span></span>
                        <span className="pr-note-body">{n.body}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                <Phone p={t.phone} reduce={reduce}/>
              </div>
            </div>
          </section>
        </div>
      ))}
      <p className="pr-then pr-then-last" aria-hidden="true">↻ Back to <b>01 Find</b>, and the line turns again</p>
    </div>
  );
}
