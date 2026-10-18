import ContactForm from "./ContactForm";

export default function Conversation(){
  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/convo-team-coffee.jpg" alt="Three coworkers laughing together over coffee in the office kitchen"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>SEE HOW WE<br/>CAN MAKE<br/>ROOM FOR<br/>YOU</h2>
        <ContactForm/>
      </div>
    </section>
  );
}
