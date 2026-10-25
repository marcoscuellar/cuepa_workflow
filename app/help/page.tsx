import type {Metadata} from "next";
import Nav from "../Nav";
import Logo from "../Logo";
import "./help.css";

export const metadata:Metadata={
  title:"Help — CUEPA",
  description:"How CUEPA supports its members: a hub that sets up in about 5 minutes, and a real person behind it.",
  alternates:{canonical:"/help"}
};

const MAIL="marcoscuellar@elipangroup.com";
const BOOK=`mailto:${MAIL}?subject=Book%20a%20setup%20call&body=Business%20name%3A%0ATimes%20that%20work%20for%20me%3A%0A`;

export default function HelpPage(){
  return (<main>
    <Nav current="help"/>

    <section className="help-band light first">
      <div className="shell">
        <div className="help-hero">
          <div>
            <p className="eyebrow">Help &amp; support</p>
            <h1>Real help from a real person<span className="help-dot">.</span></h1>
            <p className="help-lead">Every CUEPA member gets a hub that sets itself up in about 5 minutes, and a person behind it who knows your business.</p>
          </div>
          <figure className="help-photo">
            <img src="/help/help-photo.jpg" alt="A smiling man on a phone call at his desk"/>
          </figure>
        </div>
        <div className="help-cards">
          <div className="help-card"><span>01</span><h3>Set up in about 5 minutes</h3><p>Guided steps, one at a time, with a 1-minute video. Built so you can finish on your own.</p></div>
          <div className="help-card"><span>02</span><h3>A person, not a ticket</h3><p>Questions go to the team that built your system. Reply to any email from us and we&rsquo;ll take it from there.</p></div>
          <div className="help-card"><span>03</span><h3>You stay in control</h3><p>Nothing sends without your OK. Human in the Middle, always.</p></div>
        </div>
      </div>
    </section>

    <section className="help-band dark">
      <div className="shell">
        <h2>Already a member<span className="help-dot">?</span></h2>
        <div className="help-split">
          <div className="help-panel">
            <h3>Account owners</h3>
            <p>Your 1-minute setup video is in your welcome email and on your hub&rsquo;s <b>Setup</b> page.</p>
            <p>Want a hand? Book a setup call. It&rsquo;s always optional.</p>
            <div className="help-row">
              <a className="help-btn" href={BOOK}>Book a setup call <span aria-hidden>↗</span></a>
              <a className="help-btn ghost" href="https://app.makingcuepa.com">Sign in</a>
            </div>
          </div>
          <div className="help-panel">
            <h3>Are you an employee?</h3>
            <p>Your account owner manages access for your team. Ask them to add you or share your timecard link again.</p>
            <p>Your timecard link is private to you. No app or password needed.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="help-band light">
      <div className="shell">
        <h2>Common questions</h2>
        <div className="help-faq">
          <div><b>I can&rsquo;t sign in.</b><span>Email us from the address you use for CUEPA and we&rsquo;ll get you back in.</span></div>
          <div><b>I lost my timecard link.</b><span>Ask your account owner. They can find it for you in the hub.</span></div>
          <div><b>Does CUEPA run payroll or send invoices for me?</b><span>No. Those stay with you. CUEPA prepares the work; you make the call.</span></div>
          <div><b>Can CUEPA see my passwords?</b><span>No. You sign in to Google and QuickBooks on their own pages.</span></div>
        </div>
      </div>
    </section>

    <section className="help-band dark help-stuck">
      <div className="shell">
        <h2>Still stuck<span className="help-dot">?</span></h2>
        <p>Write to us. A real person reads every message.</p>
        <div className="help-row">
          <a className="help-btn" href={`mailto:${MAIL}?subject=CUEPA%20help`}>{MAIL}</a>
        </div>
      </div>
    </section>

    <footer className="site-footer">
      <p className="wordmark"><Logo offering="for Work" lockup/></p>
      <p>MAKE ROOM FOR WHAT&rsquo;S NEXT.</p>
      <p className="footer-links">© 2026 CUEPA · <a href="/help">Help</a></p>
      <p className="footer-ollin">CUEPA for Work · An ELIPAN GROUP company</p>
    </footer>
  </main>);
}
