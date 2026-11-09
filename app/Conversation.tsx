import ContactForm from "./ContactForm";

export default function Conversation(){
  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/hero-work-breathe.jpg" alt="A business owner leaning back at her desk, eyes closed, taking a breath"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start a Room Conversation</p>
        <h2>What are<br/>you making<br/>room for?</h2>
        <ContactForm/>
      </div>
    </section>
  );
}
