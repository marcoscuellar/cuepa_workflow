import ContactForm from "./ContactForm";

export default function Conversation(){
  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/conversation-human.jpg" alt="A couple cooking dinner together at home in the evening"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>WHAT ARE YOU<br/>MAKING ROOM<br/>FOR?</h2>
        <ContactForm/>
      </div>
    </section>
  );
}
