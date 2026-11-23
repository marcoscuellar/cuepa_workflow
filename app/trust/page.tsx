import Nav from "../Nav";
import {pageMeta,JsonLd,breadcrumb,CtaBand,SiteFooter} from "../PageShell";

export const metadata=pageMeta(
  "/trust",
  "Safe AI for Small Business: CHIMAL and You | CUEPA",
  "How CUEPA keeps AI safe in your business: workflows check their own work, a second layer watches for outliers, and nothing sends without your OK."
);

const chimal=[
  ["Protect","Your customers, your data and your reputation."],
  ["Challenge","The system checks its own work and flags what looks off."],
  ["Verify","A person signs off before anything goes out."]
];

export default function TrustPage(){
  return (<main>
    <Nav current="trust"/>
    <JsonLd data={breadcrumb("/trust","Trust")}/>

    <section className="help-band light first">
      <div className="shell">
        <p className="eyebrow">Trust · Human in the Middle</p>
        <h1>The system supports. The human decides<span className="help-dot">.</span></h1>
        <p className="help-lead">AI is safe to use in a small business when a person keeps the final say. At CUEPA, nothing goes out without your OK. Every workflow checks its own work against your approved sources, a second layer watches for anything unusual, and you&rsquo;re told whenever something needs a human look.</p>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell page-copy">
        <h2>Human in the Middle<span className="help-dot">.</span></h2>
        <p>AI takes the busywork. You keep the decisions. Human in the middle, always.</p>
        <p>The technology carries the work. You keep the authority. CUEPA prepares the email, the reminder, the reconciliation. You decide what goes out. That&rsquo;s not a setting you turn on. It&rsquo;s how every system we build is designed.</p>
      </div>
    </section>

    <section className="help-band dark">
      <div className="shell">
        <p className="eyebrow">CHIMAL</p>
        <h2>Protect. Challenge. Verify<span className="help-dot">.</span></h2>
        <div className="page-copy"><p>CHIMAL is the protection used across all ELIPAN GROUP brands, including CUEPA. It surrounds every step of the practice, from the first Room Map to the next opportunity.</p></div>
        <div className="help-split three">
          {chimal.map(([t,d])=>(<div className="help-panel" key={t}><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell page-copy">
        <h2>Three layers on every cycle<span className="help-dot">.</span></h2>
        <ol>
          <li><b>Self-QA.</b> Every workflow checks its own output against approved sources before it reaches you.</li>
          <li><b>Outlier watch.</b> A second layer looks across the whole system for results that are technically valid but don&rsquo;t look right.</li>
          <li><b>Human authority.</b> When something is flagged, you&rsquo;re notified to check it yourself. You&rsquo;re not a rubber stamp at the end. You&rsquo;re in the loop where it counts.</li>
        </ol>
        <h3>Your accounts stay yours</h3>
        <ul>
          <li>You sign in to Google and QuickBooks on their own pages. CUEPA never sees your passwords.</li>
          <li>CUEPA doesn&rsquo;t run payroll or send invoices for you. It prepares the work; you make the call.</li>
          <li>Your team&rsquo;s timecard links are private to each person.</li>
        </ul>
        <h3>Not everything should be automated</h3>
        <p>Some work should stay human: the hard conversation with a customer, the judgment call on a sensitive situation, the welcome for a new hire. In every Room Map, &ldquo;keep human&rdquo; is a real answer, and we use it.</p>
      </div>
    </section>

    <CtaBand line="We handle the noise. You get the room."/>
    <SiteFooter/>
  </main>);
}
