import Nav from "../Nav";
import {pageMeta,JsonLd,breadcrumb,CtaBand,SiteFooter} from "../PageShell";

export const metadata=pageMeta(
  "/faq",
  "AI Consulting for Small Business: Questions | CUEPA",
  "Straight answers for owners and managers: what CUEPA does, what it costs, how long it takes, what stays human, and which tools it works with."
);

/* One list drives both the page and the FAQPage schema, so they always match word for word. */
const faqs:{q:string;a:string;link?:[string,string]}[]=[
  {q:"What does CUEPA do?",a:"CUEPA puts AI to work inside your operations so your people can focus on what matters. We map how work gets done, build a working system around it, prove what changed, and find what's next. You keep every decision.",link:["/practice","See the practice →"]},
  {q:"Who is CUEPA for?",a:"Small-business owners and the managers who run the place day to day, plus their teams."},
  {q:"What does it cost?",a:"It starts with the Room Map, a full operational workflow audit of your business, including a full, detailed findings report: $1,500, credited toward your first phase if you go ahead. From there, every phase gets a fixed price before any work starts, based on what we found. No surprises, and you decide what comes next."},
  {q:"How long until it's working?",a:"One week to your Room Map: what we found in your business, what we'd change first, and a fixed price and timeline for each phase. Every phase after that is sized to the work, and you see its timeline before you say yes."},
  {q:"Will AI replace my team?",a:"No. CUEPA takes the busywork off their plate so they have room for the work only people can do. Some tasks are marked \"keep human\" on purpose."},
  {q:"Does anything send without my approval?",a:"No. Actions are prepared, drafts are cued, exceptions are flagged. Nothing goes out without your OK. That's Human in the Middle."},
  {q:"Which tools does CUEPA work with?",a:"We build around the tools you already use, including Google (Gmail and Calendar) and QuickBooks. You sign in to each one on its own page, and CUEPA never sees your passwords."},
  {q:"Does CUEPA run payroll or send invoices?",a:"No. Those stay with you. CUEPA prepares the work; you make the call."},
  {q:"How do I know it's working?",a:"The Room Report. We record a week-one baseline, then show you what changed.",link:["/room-report","See how it works →"]},
  {q:"How is my business kept safe?",a:"CHIMAL: Protect. Challenge. Verify. Workflows check their own work, a second layer watches for outliers, and a person signs off before anything goes out.",link:["/trust","Read about trust →"]},
  {q:"What if we want to do more later?",a:"Good. That's Grow. As the system runs, it surfaces the next opportunity. Each new piece gets its own fixed price and timeline, and you approve it before anything starts."},
  {q:"What happens on the Room Conversation?",a:"Twenty minutes, no deck and no sales call. You tell us what you want room for, we ask how the work runs today, and a real person follows up."}
];

const faqSchema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))};

export default function FaqPage(){
  return (<main>
    <Nav current="faq"/>
    <JsonLd data={breadcrumb("/faq","FAQ")}/>
    <JsonLd data={faqSchema}/>

    <section className="help-band light first">
      <div className="shell">
        <p className="eyebrow">FAQ</p>
        <h1>Questions owners ask before we start<span className="help-dot">.</span></h1>
        <p className="help-lead">Straight answers, in plain words. Already a member and need sign-in or setup help? <a href="/help">Go to Help</a>.</p>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell">
        <div className="help-faq">
          {faqs.map(f=>(<div key={f.q}><b>{f.q}</b><span>{f.a}{f.link&&<> <a href={f.link[0]}>{f.link[1]}</a></>}</span></div>))}
        </div>
      </div>
    </section>

    <CtaBand line="Let's make room."/>
    <SiteFooter/>
  </main>);
}
