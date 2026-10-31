// Room Stories: structured proof cards.
// [Trade / Industry] · [Baseline hours lost] · [Tools connected] · [Time recovered]
//
// Honesty rule (Brand Book / ELIPAN non-negotiable #2): every number here must come
// from a real Room Report. Leave a field undefined until it is measured; the card
// then says "Being measured" instead of showing a made-up figure.
// Stories stay anonymized until the client gives written permission.

type Story = {
  trade: string;
  baselineLost?: string;   // e.g. "14 hrs/wk lost to billing"
  tools?: string;          // e.g. "QuickBooks + Dentrix"
  recovered?: string;      // e.g. "11 hrs/wk returned"
  quote: string;
  who: string;
};

const stories: Story[] = [
  {
    trade: "Small business",
    quote: "He didn’t make us feel incompetent. He knew AI very well, gave us a quick demo and was prompt with following up. His demo was exactly what I had been hoping to do but had no idea where to start.",
    who: "Small business owner"
  },
  {
    trade: "Small business",
    quote: "He’s a straight shooter. He won’t shy away from what’s needed.",
    who: "Small business owner"
  },
  {
    trade: "Nonprofit",
    quote: "When I heard Marcos say ‘because we have always done it’ is what lets your competition eat your lunch, I knew he meant business. He came up with some great time-saving capabilities.",
    who: "Nonprofit director"
  }
];

function Metric({label, value, pending = "Being measured"}: {label: string; value?: string; pending?: string}) {
  return (
    <div className="rs-metric">
      <dt>{label}</dt>
      <dd className={value ? "" : "is-pending"}>
        {value ?? <><span className="rs-clock" aria-hidden="true" />{pending}</>}
      </dd>
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="rs" id="stories" aria-labelledby="rs-title">
      <div className="shell">
        <div className="rs-head">
          <div>
            <p className="rm-eyebrow">Room Stories</p>
            <h2 id="rs-title">What owners tell us, and what we measure.</h2>
          </div>
          <p>Real words from Room Conversations. Numbers appear only after they are measured in a Room Report. <b>Nothing here is estimated.</b></p>
        </div>

        <ul className="rs-grid">
          {stories.map((s, i) => (
            <li className="rs-card" key={i}>
              <span className="rs-tag">{s.trade}</span>
              <blockquote>
                <p>&ldquo;{s.quote}&rdquo;</p>
                <cite>{s.who}</cite>
              </blockquote>
              <dl className="rs-metrics">
                <Metric label="Baseline hours lost" value={s.baselineLost} />
                <Metric label="Tools connected" value={s.tools} pending="Being confirmed" />
                <Metric label="Time recovered" value={s.recovered} />
              </dl>
            </li>
          ))}
        </ul>

        <p className="rs-note">Stories are anonymized. Names, trades and numbers are shared only with written permission.</p>
      </div>
    </section>
  );
}
