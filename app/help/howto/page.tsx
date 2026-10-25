import type {Metadata} from "next";
import Nav from "../../Nav";
import Logo from "../../Logo";
import "../help.css";

// Members-only by link: not in the nav, not linked from /help, hidden from search.
export const metadata:Metadata={
  title:"Set up your hub — CUEPA",
  robots:{index:false,follow:false}
};

const MAIL="marcoscuellar@elipangroup.com";
const BOOK=`mailto:${MAIL}?subject=Book%20a%20setup%20call&body=Business%20name%3A%0ATimes%20that%20work%20for%20me%3A%0A`;

export default function HowToPage(){
  return (<main>
    <Nav current="help"/>

    <section className="help-band light first">
      <div className="help-narrow">
        <p className="eyebrow">Setup · About 5 minutes</p>
        <h1>Set up your hub<span className="help-dot">.</span></h1>
        <p className="help-lead">Watch the 1-minute video, then open <b>Setup</b> in your hub and start at the top.</p>
        <div className="help-video">
          <video controls playsInline preload="metadata" poster="/help/setup-video-poster.jpg">
            <source src="/help/setup-video.mp4" type="video/mp4"/>
            Your browser can&rsquo;t play this video. <a href="/help/setup-video.mp4">Download it here</a>.
          </video>
        </div>
      </div>
    </section>

    <section className="help-band dark">
      <div className="help-narrow">
        <h2>The 4 steps</h2>
        <ol className="help-steps">
          <li><em>1</em><div><b>Connect your calendar</b><span>Tap &ldquo;Connect calendar,&rdquo; sign in on Google&rsquo;s own page, and pick the calendars to show on Today.</span></div><small>About 1 min</small></li>
          <li><em>2</em><div><b>Set up email</b><span>Tap &ldquo;Set up email.&rdquo; We finish the connection with you. Nothing sends without your OK.</span></div><small>About 1 min</small></li>
          <li><em>3</em><div><b>Connect QuickBooks</b><span>Tap &ldquo;Start&rdquo; and we set it up together. Until then, download approved hours from Timecards as a spreadsheet.</span></div><small>About 1 min</small></li>
          <li><em>4</em><div><b>Add your team</b><span>Add each person who fills out a timecard. Each one gets a private link. No app, no password.</span></div><small>About 2 min</small></li>
        </ol>
        <p className="help-note">Then on Friday: review your team&rsquo;s timecards and approve them.</p>
      </div>
    </section>

    <section className="help-band light help-stuck">
      <div className="help-narrow">
        <h2>Stuck<span className="help-dot">?</span> We&rsquo;re here.</h2>
        <p>A setup call is always optional. Employees: ask your account owner for access.</p>
        <div className="help-row">
          <a className="help-btn" href={BOOK}>Book a setup call <span aria-hidden>↗</span></a>
          <a className="help-btn ghost" href="https://app.makingcuepa.com">Sign in</a>
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
