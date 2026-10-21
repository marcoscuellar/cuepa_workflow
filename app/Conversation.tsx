import ContactForm from "./ContactForm";

export default function Conversation(){
  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/hero-work-breathe.jpg" alt="A business owner leaning back at her desk, eyes closed, taking a breath"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>WHERE DO<br/>YOU WANT<br/>TO MAKE<br/>ROOM?</h2>
        <ContactForm/>
      </div>
    </section>
  );
}
