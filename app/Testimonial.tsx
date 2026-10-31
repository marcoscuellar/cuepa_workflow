// Room Stories: real client quotes with two metadata tags (Focus, Engagement).
//
// Honesty rule (Brand Book / ELIPAN non-negotiable #2): no numbers appear here
// until a Room Report verifies them and the client approves them in writing.
// Stories stay anonymized until the client gives written permission.

type Story = {
  trade: string;
  focus: string;
  engagement: string;
  quote: string;
  who: string;
};

const stories: Story[] = [
  {
    trade: "Small business",
    focus: "Practical AI & Tool Onboarding",
    engagement: "Verified client",
    quote: "He didn’t make us feel incompetent. He knew AI very well, gave us a quick demo and was prompt with following up. His demo was exactly what I had been hoping to do but had no idea where to start.",
    who: "Small business owner"
  },
  {
    trade: "Small business",
    focus: "Operational Clarity & Team Alignment",
    engagement: "Verified client",
    quote: "He’s a straight shooter. He won’t shy away from what’s needed.",
    who: "Small business owner"
  },
  {
    trade: "Nonprofit",
    focus: "Process Modernization & Capacity Relief",
    engagement: "Verified client",
    quote: "When I heard Marcos say ‘because we have always done it’ is what lets your competition eat your lunch, I knew he meant business. He came up with some great time-saving capabilities.",
    who: "Nonprofit director"
  }
];

export default function Testimonial() {
  return (
    <section className="rs" id="stories" aria-labelledby="rs-title">
      <div className="shell">
        <div className="rs-head">
          <div>
            <p className="rm-eyebrow">Room Stories</p>
            <h2 id="rs-title">What owners tell us.</h2>
          </div>
          <p>Real words from real clients. <b>Numbers join these stories once a Room Report verifies them</b> and the client says yes.</p>
        </div>

        <ul className="rs-grid">
          {stories.map((s, i) => (
            <li className="rs-card" key={i}>
              <div className="rs-top">
                <span className="rs-tag">{s.trade}</span>
                <blockquote>
                  <p>&ldquo;{s.quote}&rdquo;</p>
                  <cite>{s.who}</cite>
                </blockquote>
              </div>
              <dl className="rs-meta">
                <div><dt>Focus</dt><dd>{s.focus}</dd></div>
                <div><dt>Engagement</dt><dd><span className="rs-check" aria-hidden="true">✓</span>{s.engagement}</dd></div>
              </dl>
            </li>
          ))}
        </ul>

        <p className="rs-note">Stories are anonymized. Names, trades and numbers are shared only with written permission.</p>
      </div>
    </section>
  );
}
