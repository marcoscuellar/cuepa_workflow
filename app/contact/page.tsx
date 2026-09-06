import type {Metadata} from "next";
import Nav from "../Nav";
import Logo from "../Logo";
import ContactForm from "../ContactForm";

export const metadata:Metadata={
  title:"Contact — CUEPA",
  description:"See how we can make room for you. Leave your email and a real person comes back to you.",
  alternates:{canonical:"/contact"}
};

export default function ContactPage(){
  return (<main>
    <Nav/>
    <section className="contact-page">
      <div className="shell contact-grid">
        {/* FPO — swap for the tall portrait when it lands. Replace this whole
            block with: <img src="/contact-photo.jpg" alt="..."/> */}
        <figure className="contact-photo is-fpo" aria-hidden>
          <div className="fpo">
            <span className="fpo-tag">FPO</span>
            <p className="fpo-spec">TALL PORTRAIT<br/>4:5 &middot; 1200&times;1500 MIN</p>
          </div>
        </figure>
        <div className="contact-copy">
          <h1>SEE HOW WE<br/>CAN MAKE<br/>ROOM FOR<br/>YOU</h1>
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
