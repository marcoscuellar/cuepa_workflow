// "I want to grow, but I feel stuck." The Next series answers that: the room we
// make goes somewhere specific. Closes on the brand question.
const lines=[
  "the next contract.",
  "the next customer call.",
  "the next five-star review.",
  "the next hire.",
  "the next location.",
  "audit day.",
  "the slow season.",
  "your team."
];

export default function NextLines(){return (
  <section className="nx" id="next">
    <div className="shell">
      <p className="rm-eyebrow">Feeling stuck?</p>
      <h2 className="nx-h">GROWTH NEEDS ROOM.<br/>HERE&rsquo;S WHERE IT GOES.</h2>
      <ul className="nx-list">
        {lines.map(l=><li key={l}><span>Making room for</span> <b>{l}</b></li>)}
      </ul>
      <p className="nx-close">What are you making room for?</p>
    </div>
  </section>
)}
