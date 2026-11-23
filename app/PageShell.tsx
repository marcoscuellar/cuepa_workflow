import type {Metadata} from "next";
import Logo from "./Logo";
import "./help/help.css";
import "./pages.css";

/* Shared bits for the content pages (/practice, /room-report, /trust, /faq).
   They reuse the /help look: white and ink bands, one CTA band at the end. */

export function pageMeta(path:string,title:string,description:string):Metadata{
  return {
    title,description,
    alternates:{canonical:path},
    openGraph:{type:"website",url:path,siteName:"CUEPA",title,description,
      images:[{url:"/og.jpg?v=6",width:1200,height:630,alt:"CUEPA logo on a dark teal background. Making room for more."}]},
    twitter:{card:"summary_large_image",title,description,images:["/og.jpg?v=6"]}
  };
}

export function JsonLd({data}:{data:object}){
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>;
}

export function breadcrumb(path:string,name:string){
  return {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Home","item":"https://www.makingcuepa.com/"},
    {"@type":"ListItem","position":2,"name":name,"item":"https://www.makingcuepa.com"+path}
  ]};
}

export function CtaBand({line}:{line:string}){
  return (
    <section className="help-band dark help-stuck">
      <div className="shell">
        <h2>{line}</h2>
        <p>What are you making room for?</p>
        <div className="help-row">
          <a className="help-btn" href="/contact">Book a 20-Minute Room Conversation <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter(){
  return (
    <footer className="site-footer">
      <p className="wordmark"><Logo lockup size={26}/></p>
      <p>MAKE ROOM FOR WHAT&rsquo;S NEXT.</p>
      <p className="footer-links">© 2026 CUEPA · <a href="/practice">Practice</a> · <a href="/room-report">Room Report</a> · <a href="/trust">Trust</a> · <a href="/faq">FAQ</a> · <a href="/help">Help</a></p>
      <p className="footer-ollin">CUEPA · An ELIPAN GROUP company</p>
    </footer>
  );
}
