import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../Logo";

export const metadata: Metadata = {
  title: "Sign in — CUEPA",
  description: "This page is private.",
  robots: {index: false, follow: false}
};

/* Same look as the hub sign-in at app.makingcuepa.com (Nov 13, 2026):
   Return-C logo, half teal-blue glow / half white, glow Sign in button.
   The greeting is rendered in Central time, then the script below switches it
   to the visitor's own clock so it always matches their time of day. */
function greeting() {
  const h = Number(new Intl.DateTimeFormat("en-US", {hour: "numeric", hour12: false, timeZone: "America/Chicago"}).format(new Date())) % 24;
  if (h < 5) return "Good evening";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const GLOW = "radial-gradient(55% 75% at 12% 8%,rgba(45,212,191,.30),transparent 62%),radial-gradient(50% 70% at 88% 18%,rgba(14,116,144,.60),transparent 66%),radial-gradient(65% 80% at 70% 105%,rgba(15,118,110,.50),transparent 62%),radial-gradient(45% 60% at 6% 96%,rgba(14,116,144,.40),transparent 60%),#0A1216";
const BTN = "radial-gradient(160px 80px at 10% 0%,rgba(45,212,191,.45),transparent 70%),radial-gradient(220px 90px at 85% 15%,rgba(14,116,144,.85),transparent 70%),radial-gradient(200px 70px at 50% 130%,rgba(15,118,110,.7),transparent 70%),#0A1216";
const BTN_HOVER = "radial-gradient(160px 80px at 10% 0%,rgba(45,212,191,.6),transparent 70%),radial-gradient(220px 90px at 85% 15%,rgba(14,116,144,.95),transparent 70%),radial-gradient(200px 70px at 50% 130%,rgba(15,118,110,.85),transparent 70%),#0A1216";
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const css = `
.sx,.sx *{box-sizing:border-box}
.sx{min-height:100vh;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);background:#FFFFFF;color:#080B0F;font-family:'Inter',system-ui,sans-serif}
.sx-glow{position:relative;overflow:hidden;background:${GLOW};color:#FFFFFF;display:flex;flex-direction:column;padding:28px clamp(24px,5vw,80px) 40px}
.sx-glow::after{content:"";position:absolute;inset:0;background-image:${GRAIN};opacity:.16;mix-blend-mode:overlay;pointer-events:none}
.sx-glow>*{position:relative;z-index:1}
.sx-brand{display:flex;align-items:center;gap:12px}
.sx-brand a{display:inline-flex}
.sx-sep{width:1px;height:18px;background:rgba(255,255,255,.4)}
.sx-by{font-size:12px;font-weight:500;letter-spacing:.08em;color:rgba(255,255,255,.8);white-space:nowrap}
.sx-hello{flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;padding:40px 0}
.sx-day{margin:0;font:600 11px 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8FE6DA}
.sx-hello h1{margin:0;font-size:clamp(40px,5vw,64px);font-weight:800;letter-spacing:-.035em;line-height:1.0;text-wrap:balance}
.sx-hello h1 .dot{color:#2DD4BF}
.sx-hello p{margin:0;font-size:19px;line-height:1.55;color:#FFFFFF;max-width:38ch}
.sx-side{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px 28px}
.sx-card{width:min(460px,100%);background:#FFFFFF;border-radius:24px;padding:32px;display:grid;gap:12px;box-shadow:0 18px 50px rgba(8,11,15,.14)}
.sx-lead{margin:0 0 4px;font-size:15px;font-weight:600}
.sx-card label{font-size:12.5px;font-weight:600;color:#6B7575}
.sx-card input[type=password]{font:inherit;font-size:16px;min-height:48px;padding:0 14px;border-radius:12px;border:0;background:#FFFFFF;color:#080B0F;box-shadow:0 2px 9px rgba(0,0,0,.10);outline:none}
.sx-card input[type=password]:focus{outline:2px solid #0F766E}
.sx-card button{margin-top:6px;min-height:50px;border:0;border-radius:12px;background:${BTN};color:#FFFFFF;font:inherit;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 8px 22px rgba(10,18,22,.35);transition:transform .2s}
.sx-card button:hover{background:${BTN_HOVER};transform:translateY(-1px)}
.sx-card button:focus-visible{outline:2px solid #0F766E;outline-offset:3px}
.sx-err{margin:0;font-size:14px;line-height:1.45;color:#B42318}
.sx-help{margin:4px 0 0;font-size:13.5px;line-height:1.5;color:#6B7575}
.sx-help a{color:#0F766E;font-weight:600}
.sx-foot{margin:28px 0 0;font-size:12px;color:#5E6670;text-align:center}
@media (max-width:860px){.sx{grid-template-columns:minmax(0,1fr)}.sx-hello{padding:28px 0 8px}.sx-hello h1{font-size:clamp(32px,9vw,44px)}.sx-side{padding:0 20px 28px;margin-top:-24px}}
@media (prefers-reduced-motion:reduce){.sx-card button,.sx-card button:hover{transition:none;transform:none}}
`;

const clientGreeting = `(function(){try{var h=new Date().getHours(),p=h<5?"Good evening":h<12?"Good morning":h<17?"Good afternoon":"Good evening";var g=document.getElementById("sx-greet");if(g)g.textContent=p;var d=document.getElementById("sx-day");if(d)d.textContent=new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}catch(e){}})();`;

export default async function CirquesAccess({searchParams}: {searchParams: Promise<{next?: string; wrong?: string}>}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/cirques-experience") ? sp.next : "/cirques-experience";
  const day = new Intl.DateTimeFormat("en-US", {weekday: "long", month: "long", day: "numeric", timeZone: "America/Chicago"}).format(new Date());
  return (
    <main className="sx">
      <style dangerouslySetInnerHTML={{__html: css}}/>
      <section className="sx-glow">
        <div className="sx-brand"><Link href="/" aria-label="CUEPA home"><Logo size={14}/></Link><span className="sx-sep" aria-hidden="true"></span><span className="sx-by">by ELIPAN GROUP</span></div>
        <div className="sx-hello">
          <p className="sx-day" id="sx-day" suppressHydrationWarning>{day}</p>
          <h1><span id="sx-greet" suppressHydrationWarning>{greeting()}</span>, Team Cirques Experience<span className="dot">.</span></h1>
          <p>We are looking forward to supporting you and making room for what matters most.</p>
        </div>
        <script dangerouslySetInnerHTML={{__html: clientGreeting}}/>
      </section>
      <section className="sx-side">
        <form className="sx-card" method="post" action="/api/cirques-access">
          <input type="hidden" name="next" value={next}/>
          <p className="sx-lead">Sign in to your audit review.</p>
          <label htmlFor="cx-pw">Password</label>
          <input id="cx-pw" name="password" type="password" required autoComplete="current-password" autoFocus/>
          {sp.wrong ? <p role="alert" className="sx-err">That password didn’t work. Try again.</p> : null}
          <button type="submit">Sign in →</button>
          <p className="sx-help">Need the password? Email <a href="mailto:marcoscuellar@elipangroup.com">marcoscuellar@elipangroup.com</a></p>
        </form>
        <p className="sx-foot">Private to Cirques Experience · CUEPA by ELIPAN GROUP</p>
      </section>
    </main>
  );
}
