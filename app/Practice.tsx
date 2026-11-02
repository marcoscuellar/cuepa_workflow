// The CUEPA Practice: four turns, told once, always in order (FIND → FLOW → PROVE → GROW ↻).
// Each turn pairs a business moment (photo, with see-through CUEPA notes on it) with an iPhone
// showing the work getting done at that moment. One company goal runs through all four, so the
// story is: we start with the goal, then put AI only where it pays off.
// All numbers are labeled Sample. Nothing here is a real client result.

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
    img: "/img/architecture-studio.jpg", alt: "An owner walking her team through plans at the studio table", caption: "Planning location two",
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

function Phone({p}:{p:Turn["phone"]}){
  return (
    <div className="pr-phone" role="img" aria-label={`CUEPA on a phone: ${p.app}`}>
      <div className="pr-screen">
        <span className="pr-island" aria-hidden="true"/>
        <span className="pr-sbar" aria-hidden="true"><span>{p.time}</span><span>●●●</span></span>
        <div className="pr-app"><Mark size={16}/>CUEPA<span>{p.app}</span></div>
        {p.sample && <span className="pr-sample"><i aria-hidden="true"/>{p.sample}</span>}
        {p.title && <h4>{p.title}</h4>}
        {p.sub && <p className="pr-sub">{p.sub}</p>}
        {p.goal && <div className="pr-goal"><small>Company goal</small><b>{GOAL}</b></div>}
        {p.found && <div className="pr-found"><span>Busywork found</span><b>{p.found}</b></div>}
        {p.rows.map(r=>(
          <div key={r.title} className={`pr-row${r.why?" has-why":""}${r.hideSm?" hide-sm":""}`}>
            <span className="pr-rt"><b>{r.title}</b>{r.hrs && <span className="pr-hrs"> · {r.hrs}</span>}{r.sub && <small>{r.sub}</small>}</span>
            <span className={`pr-act${r.human?" is-human":""}`}>{r.act}</span>
            {r.why && <span className="pr-why">{r.why}</span>}
          </div>
        ))}
        <p className="pr-foot">{p.foot}</p>
      </div>
    </div>
  );
}

export default function Practice(){
  return (
    <div className="pr">
      <section className="pr-way" aria-labelledby="pr-way-h">
        <div className="pr-shell">
          <p className="pr-eyebrow">The CUEPA way</p>
          <h2 id="pr-way-h">Work gets done. Life keeps going.</h2>
          <p className="pr-lead">Four turns, always in order. While you run the business, CUEPA carries the work, and you keep every decision.</p>
          <ol className="pr-rail">
            {turns.map(t=>(
              <li key={t.id}><a href={`#${t.id}`}><span className="pr-step">{t.n}</span><b>{t.name}</b><small>{t.deliverable}</small></a></li>
            ))}
          </ol>
        </div>
      </section>

      {turns.map((t,i)=>(
        <div key={t.id}>
          {i>0 && <p className="pr-then" aria-hidden="true">Then <b>{t.n} {t.name.replace(" ↻","")}</b></p>}
          <section className="pr-turn" id={t.id} aria-labelledby={`pr-${t.id}-h`}>
            <div className="pr-shell">
              <div className="pr-head">
                <div>
                  <p className="pr-label"><span className="pr-step">{t.n}</span><span className="pr-name">{t.name}</span></p>
                  <h3 id={`pr-${t.id}-h`}>{t.headline}</h3>
                </div>
                <div>
                  <p className="pr-deliv">Deliverable · <b>{t.deliverable}</b></p>
                  <p className="pr-lead">{t.lead}</p>
                </div>
              </div>
              <div className="pr-stage">
                <svg className="pr-route" viewBox="0 0 1200 680" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 300,420 C 520,400 640,300 760,330 C 880,360 940,340 1060,340" fill="none" stroke="#0F766E" strokeWidth={4} strokeLinecap="round"/>
                </svg>
                <div className="pr-life">
                  <img src={t.img} alt={t.alt} loading="lazy"/>
                  <span className="pr-cap"><i aria-hidden="true"/>{t.caption}</span>
                  <ul className="pr-notes" aria-label="CUEPA notifications">
                    {t.notes.map(n=>(
                      <li key={n.time+n.tag} className="pr-note">
                        <span className="pr-note-top"><Mark/>CUEPA <em>· {n.time}</em><span className={`pr-tag${n.warn?" is-warn":""}`}><i aria-hidden="true"/>{n.tag}</span></span>
                        <span className="pr-note-body">{n.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Phone p={t.phone}/>
              </div>
            </div>
          </section>
        </div>
      ))}
      <p className="pr-then pr-then-last" aria-hidden="true">↻ Back to <b>01 Find</b>, and the line turns again</p>
    </div>
  );
}
