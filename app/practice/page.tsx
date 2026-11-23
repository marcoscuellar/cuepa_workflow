import Nav from "../Nav";
import {pageMeta,JsonLd,breadcrumb,CtaBand,SiteFooter} from "../PageShell";

export const metadata=pageMeta(
  "/practice",
  "How CUEPA Works: Find, Flow, Prove, Grow | CUEPA",
  "CUEPA maps how your business really runs, builds a working system around it, proves what changed, then finds what's next. You keep every decision."
);

const steps=[
  {num:"01 · Find",title:"The Room Map",body:(<>
    <p>We sit with you and your team and map how work really gets done, and how many hours it takes. Every task gets one of five calls:</p>
    <ul>
      <li><b>Eliminate.</b> It doesn&rsquo;t need doing.</li>
      <li><b>Simplify.</b> It needs doing, with fewer steps.</li>
      <li><b>Redesign.</b> It needs a better way.</li>
      <li><b>Automate.</b> A system can carry it, with you approving.</li>
      <li><b>Keep human.</b> It&rsquo;s yours, and it stays that way.</li>
    </ul>
    <p>Automation is one answer, not the first one. In one week, you have the Room Map: where your hours go, what we&rsquo;d change first, and a fixed price and timeline for each phase. The Room Map is a full operational workflow audit, including a full, detailed findings report: $1,500, credited toward your first phase.</p>
  </>)},
  {num:"02 · Flow",title:"The Working System",body:(<>
    <p>We build around how your business already runs, in the tools you already use. Actions get prepared, drafts get cued, exceptions get flagged. Nothing sends without your OK.</p>
    <p>The noise resolves. The day gets a shape.</p>
  </>)},
  {num:"03 · Prove",title:"The Room Report",body:(<>
    <p>We don&rsquo;t say it worked. We show you. The Room Report measures what changed against your week-one baseline, so the answer to &ldquo;is this working?&rdquo; is a number you can check. <a href="/room-report">See the Room Report →</a></p>
  </>)},
  {num:"04 · Grow ↻",title:"The Next Opportunity",body:(<>
    <p>Once the system is running, it surfaces what&rsquo;s next: the next contract, the next hire, the next location. Every opportunity arrives as a draft for you to review, never as an automatic action. Then we turn back to Find.</p>
  </>)}
];

const service={"@context":"https://schema.org","@type":"Service","name":"The CUEPA Practice","url":"https://www.makingcuepa.com/practice",
  "provider":{"@id":"https://www.makingcuepa.com/#business"},
  "description":"Find, Flow, Prove, Grow: map how work gets done, build a working system around it, measure what changed against a week-one baseline, and surface the next opportunity. The owner keeps every decision.",
  "offers":{"@type":"Offer","name":"The Room Map","description":"A full operational workflow audit, including a full, detailed findings report. Credited toward the first phase.","price":"1500","priceCurrency":"USD"}};

export default function PracticePage(){
  return (<main>
    <Nav current="how"/>
    <JsonLd data={breadcrumb("/practice","The Practice")}/>
    <JsonLd data={service}/>

    <section className="help-band light first">
      <div className="shell">
        <p className="eyebrow">The CUEPA Practice</p>
        <h1>How we make room: Find, Flow, Prove, Grow<span className="help-dot">.</span></h1>
        <p className="help-lead">CUEPA starts with your goal, not the technology. We map how the work actually gets done, build a working system around how you already operate, show you what changed against a week-one baseline, and then look for the next opportunity. Four turns, always in this order. You keep the decisions the whole way.</p>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell">
        <div className="page-copy">
          <h2>Start with the goal, not the tool<span className="help-dot">.</span></h2>
          <p>Most AI projects start with a tool and go looking for a problem. That&rsquo;s how businesses end up making the wrong things faster. We start with what you want the business to do next, then find the work standing in the way.</p>
        </div>
        <div className="page-steps">
          {steps.map(s=>(<div key={s.num}><span className="num">{s.num}</span><div><h3>{s.title}</h3>{s.body}</div></div>))}
        </div>
      </div>
    </section>

    <section className="help-band dark">
      <div className="shell page-copy">
        <h2>Protected the whole way<span className="help-dot">.</span></h2>
        <p>CHIMAL surrounds every turn: Protect. Challenge. Verify. It protects your customers, data and reputation. The system checks its own work and flags what looks off. A person signs off before anything goes out. <a href="/trust">How we protect your business →</a></p>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell page-copy">
        <h2>Who leads it<span className="help-dot">.</span></h2>
        <p>Marcos Cuellar leads CUEPA. His background is in go-to-market leadership, staffing and operational strategy, and he has implemented change inside Fortune 100 organizations. So the work starts with the business outcome, not the technology.</p>
        <h3>Why it&rsquo;s called CUEPA</h3>
        <p>The name joins Spanish and Nahuatl. <b>Quepa</b>, from <i>caber</i>, means to fit: making room. <b>Cuepa</b> means to turn, to return, to restore something to its proper order. That&rsquo;s the practice: Find, Flow, Prove, Grow, and back again. CHIMAL comes from <i>chīmalli</i>, the shield: guardianship, not combat.</p>
      </div>
    </section>

    <CtaBand line="The process is consistent. The solution is yours."/>
    <SiteFooter/>
  </main>);
}
