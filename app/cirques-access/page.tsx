import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../Logo";

export const metadata: Metadata = {
  title: "Sign in — CUEPA",
  description: "This page is private.",
  robots: {index: false, follow: false}
};

/* Same look as the hub sign-in at app.makingcuepa.com: pure white, centered,
   a time-of-day greeting, and a black sign-in card with a teal button. */
function greeting() {
  const h = Number(new Intl.DateTimeFormat("en-US", {hour: "numeric", hour12: false, timeZone: "America/Chicago"}).format(new Date())) % 24;
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const css = `
.sx{min-height:100vh;background:#FFFFFF;color:#0A0C0F;font-family:'Inter',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:28px 16px 32px}
.sx-top{width:100%;max-width:1080px;display:flex;justify-content:center}
.sx-main{flex:1;width:100%;max-width:440px;display:flex;flex-direction:column;justify-content:center;gap:28px;padding:40px 0}
.sx-hello{text-align:center}
.sx-hello h1{margin:0;font-size:clamp(30px,5vw,40px);font-weight:800;letter-spacing:-.035em;line-height:1.08}
.sx-hello p{margin:12px auto 0;font-size:16px;line-height:1.55;color:#5E6670;max-width:36ch}
.sx-card{background:#0A0C0F;color:#FFFFFF;border-radius:24px;padding:28px;display:grid;gap:12px;box-shadow:0 2px 4px rgba(0,0,0,.06),0 24px 48px rgba(0,0,0,.18)}
.sx-card label{font-size:14px;font-weight:600}
.sx-card input[type=password]{font:inherit;font-size:16px;padding:14px 16px;border-radius:12px;border:1px solid #2A3138;background:#14191E;color:#FFFFFF;outline:none}
.sx-card input[type=password]:focus{border-color:#2DD4BF;box-shadow:0 0 0 3px rgba(45,212,191,.25)}
.sx-card button{margin-top:6px;min-height:50px;border:0;border-radius:12px;background:#2DD4BF;color:#0A0C0F;font:inherit;font-size:16px;font-weight:800;cursor:pointer}
.sx-card button:hover{background:#5EEAD4}
.sx-card button:focus-visible{outline:3px solid #FFFFFF;outline-offset:3px}
.sx-err{margin:0;font-size:14px;line-height:1.45;color:#FCA5A5}
.sx-help{margin:0;font-size:13px;color:#9AA4A4}
.sx-help a{color:#2DD4BF}
.sx-foot{font-size:12px;color:#5E6670;text-align:center}
`;

export default async function CirquesAccess({searchParams}: {searchParams: Promise<{next?: string; wrong?: string}>}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/cirques-experience") ? sp.next : "/cirques-experience";
  return (
    <main className="sx">
      <style dangerouslySetInnerHTML={{__html: css}}/>
      <div className="sx-top">
        <Link href="/" aria-label="CUEPA home"><Logo dark/></Link>
      </div>
      <div className="sx-main">
        <div className="sx-hello">
          <h1>{greeting()}, Team Cirques Experience.</h1>
          <p>We are looking forward to supporting you and making room for what matters most.</p>
        </div>
        <form className="sx-card" method="post" action="/api/cirques-access">
          <input type="hidden" name="next" value={next}/>
          <label htmlFor="cx-pw">Password</label>
          <input id="cx-pw" name="password" type="password" required autoComplete="current-password" autoFocus/>
          {sp.wrong ? <p role="alert" className="sx-err">That password didn’t work. Try again.</p> : null}
          <button type="submit">Sign in</button>
          <p className="sx-help">Need the password? Email <a href="mailto:marcoscuellar@elipangroup.com">marcoscuellar@elipangroup.com</a></p>
        </form>
      </div>
      <p className="sx-foot">Private to Cirques Experience · CUEPA by ELIPAN GROUP</p>
    </main>
  );
}
