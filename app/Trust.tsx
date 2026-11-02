// Human in the Middle — on Pure White. One Anton statement, three shadow-lifted cards (no outlines,
// no accent bars). CHIMAL: Protect · Challenge · Verify.
const rows:[string,string,string][]=[
  ["Protect","Self-QA","Each workflow checks its output against approved source information and flags what it cannot support."],
  ["Challenge","Outlier watch","A second layer watches for results that fall outside expected patterns, even when they look valid."],
  ["Verify","Human authority","A person is notified whenever review is required. The technology carries the work. The human keeps the authority."]
];

export default function Trust(){return (
  <section className="tr" id="trust">
    <div className="tr-shell">
      <div className="tr-head">
        <div>
          <p className="tr-eyebrow">Human in the Middle</p>
          <h2>The system supports. <span>The human decides.</span></h2>
        </div>
        <div>
          <p className="tr-lead">Technology should expand human capacity, not quietly replace human judgment. CUEPA protects sensitive information, challenges outputs, verifies what matters, and keeps people present at consequential moments.</p>
          <p className="tr-shield">CHIMAL <i aria-hidden="true">·</i> Protect <i aria-hidden="true">·</i> Challenge <i aria-hidden="true">·</i> Verify</p>
        </div>
      </div>
      <div className="tr-grid">
        {rows.map(([k,title,body],i)=>(
          <article className="tr-card" key={title}>
            <span className="tr-num">0{i+1} — {k}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)}
