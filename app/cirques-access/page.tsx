import type {Metadata} from "next";
import Link from "next/link";
import Logo from "../Logo";
import "../cirques-experience/cirques.css";

export const metadata: Metadata = {
  title: "Private page — CUEPA",
  description: "This page is private.",
  robots: {index: false, follow: false}
};

export default async function CirquesAccess({searchParams}: {searchParams: Promise<{next?: string; wrong?: string}>}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/cirques-experience") ? sp.next : "/cirques-experience";
  return (
    <main className="cx">
      <header className="cx-top">
        <div className="shell cx-top-in">
          <Link href="/" className="cx-brand" aria-label="CUEPA home"><Logo dark/></Link>
        </div>
      </header>
      <section className="cx-sec">
        <div className="shell" style={{maxWidth: 520}}>
          <p className="cx-eyebrow">Private</p>
          <h1 className="cx-h1">This page is for our client.</h1>
          <p className="cx-lead">Enter the password Marcos sent you.</p>
          <form method="post" action="/api/cirques-access" style={{display: "grid", gap: 12, marginTop: 24}}>
            <input type="hidden" name="next" value={next}/>
            <label htmlFor="cx-pw" style={{fontWeight: 600}}>Password</label>
            <input id="cx-pw" name="password" type="password" required autoComplete="current-password" autoFocus
              style={{font: "inherit", fontSize: 16, padding: "12px 14px", borderRadius: 10, border: "1px solid #c9c9c9"}}/>
            {sp.wrong ? <p role="alert" style={{color: "#b42318", margin: 0}}>That password didn’t work. Try again, or email marcoscuellar@elipangroup.com.</p> : null}
            <button type="submit" className="cx-btn cx-btn-primary" style={{justifySelf: "start"}}>Open</button>
          </form>
        </div>
      </section>
    </main>
  );
}
