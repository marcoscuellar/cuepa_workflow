import type {Metadata} from "next";
import Nav from "../Nav";
import Logo from "../Logo";
import ContactForm from "../ContactForm";

export const metadata:Metadata={
  title:"Contact — CUEPA",
  description:"Start a Room Conversation. Tell us what feels heavier than it should, and a real person will come back to you.",
  alternates:{canonical:"/contact"}
};

export default function ContactPage(){
  return (<main>
    <Nav/>
    <section className="contact-page">
      <div className="shell contact-grid">
        <div className="contact-intro">
          <p className="rm-eyebrow">Start here</p>
          <h1>SEE HOW WE CAN<br/>MAKE TIME FOR WHAT<br/>MATTERS TO YOU.</h1>
          <p className="contact-lead">Leave your email. A real person reads every one and comes back to you — usually within a day.</p>
          <dl className="contact-meta">
            <div><dt>Email</dt><dd><a href="mailto:marcos@ollinos.com">marcos@ollinos.com</a></dd></div>
            <div><dt>What happens next</dt><dd>We read it, then reply with a question or two. No deck, no sequence.</dd></div>
            <div><dt>Who you get</dt><dd>A person, not a queue.</dd></div>
          </dl>
        </div>
        <div className="contact-form">
          <ContactForm/>
        </div>
      </div>
    </section>
    <footer className="site-footer">
      <p className="wordmark"><Logo/></p>
      <p>MAKING ROOM FOR WHAT MATTERS.</p>
      <p>© 2026 CUEPA</p>
      <p className="footer-ollin">CUEPA — an Ollin company</p>
    </footer>
  </main>);
}
