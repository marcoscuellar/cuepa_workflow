import ContactForm from "./ContactForm";

export default function Conversation(){
  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/contact-team.jpg" alt="Three people working together over pattern pieces and drawings at a studio worktable"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>SEE HOW WE<br/>CAN MAKE<br/>ROOM FOR<br/>YOU</h2>
        <ContactForm/>
      </div>
    </section>
  );
}
