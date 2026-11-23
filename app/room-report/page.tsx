import Nav from "../Nav";
import {pageMeta,JsonLd,breadcrumb,CtaBand,SiteFooter} from "../PageShell";

export const metadata=pageMeta(
  "/room-report",
  "The Room Report: Proof Your AI Workflows Work | CUEPA",
  "How do you know AI automation is working? The Room Report measures hours, tasks and accuracy against your week-one baseline. Proof, not promises."
);

const measures=[
  ["Hours","Time your team spent on the work before, and after."],
  ["Task completion","What got done, on time, without chasing."],
  ["Accuracy","How often the work was right the first time, and what got caught before it reached a customer."],
  ["Visibility","What you can now see on one screen that used to live in five places."]
];

export default function RoomReportPage(){
  return (<main>
    <Nav current="room-report"/>
    <JsonLd data={breadcrumb("/room-report","The Room Report")}/>

    <section className="help-band light first">
      <div className="shell">
        <p className="eyebrow">Prove</p>
        <h1>The Room Report: proof, not promises<span className="help-dot">.</span></h1>
        <p className="help-lead">You know AI automation is working when you can measure it against where you started. Before we change anything, we record a week-one baseline. The Room Report then shows what changed: the hours your team got back, the work that got done, how accurate it was, and what you can now see that you couldn&rsquo;t before.</p>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell">
        <div className="page-copy">
          <h2>Why a report, not a promise<span className="help-dot">.</span></h2>
          <p>When someone asks &ldquo;does CUEPA actually work?&rdquo;, we don&rsquo;t answer with another ad. We show them the Room Report. Every claim in it traces back to your own numbers.</p>
        </div>
        <div className="help-cards four">
          {measures.map(([t,d],i)=>(<div className="help-card" key={t}><span>{String(i+1).padStart(2,"0")}</span><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </div>
    </section>

    <section className="help-band dark">
      <div className="shell page-copy">
        <h2>How it&rsquo;s built<span className="help-dot">.</span></h2>
        <ol>
          <li><b>Week one: the baseline.</b> During Find, we measure how the work runs today. That&rsquo;s the &ldquo;before.&rdquo;</li>
          <li><b>The system runs.</b> Flow goes live in the tools you already use.</li>
          <li><b>Measured again.</b> We compare against the same baseline, the same way.</li>
          <li><b>You read it.</b> Plain numbers, before and after, with nothing rounded up to look better.</li>
        </ol>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell page-copy">
        <h2>What it isn&rsquo;t<span className="help-dot">.</span></h2>
        <ul>
          <li><b>Not a guess.</b> If we can&rsquo;t measure it, it doesn&rsquo;t go in the report.</li>
          <li><b>Not a sales deck.</b> It&rsquo;s written for you, about your business.</li>
          <li><b>Not the end.</b> Every Room Report feeds Grow: the room it made becomes the next opportunity. <a href="/practice">See the full practice →</a></li>
        </ul>
      </div>
    </section>

    <CtaBand line="We don't say it worked. We show you."/>
    <SiteFooter/>
  </main>);
}
