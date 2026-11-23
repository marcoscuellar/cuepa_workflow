import Nav from "../Nav";
import ContactForm from "../ContactForm";
import {pageMeta,SiteFooter} from "../PageShell";

export const metadata=pageMeta(
  "/contact",
  "Book a 20-Minute Room Conversation | CUEPA",
  "See how CUEPA can make room in your week. Leave your email and a real person replies. No deck, no sales call."
);

export default function ContactPage(){
  return (<main>
    <Nav current="contact"/>
    <section className="contact-page">
      <div className="shell contact-grid">
        <figure className="contact-photo">
          <img src="/contact-team.jpg" alt="Three people working together over pattern pieces and drawings at a studio worktable"/>
        </figure>
        <div className="contact-copy">
          <h1>SEE HOW WE<br/>CAN MAKE<br/>ROOM FOR<br/>YOU</h1>
          <ContactForm/>
          <p className="contact-mail">Prefer email? <a href="mailto:marcoscuellar@elipangroup.com">marcoscuellar@elipangroup.com</a></p>
        </div>
      </div>
    </section>
    <SiteFooter/>
  </main>);
}
