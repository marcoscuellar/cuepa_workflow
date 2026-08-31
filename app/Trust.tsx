const rows:[string,string][]=[
  ["SELF-QA","Each workflow checks its output against approved source information and flags what it cannot support."],
  ["OUTLIER WATCH","A second layer watches for results that fall outside expected patterns — even when they look valid."],
  ["HUMAN AUTHORITY","A person is notified whenever review is required. The technology carries the work. The human keeps the authority."]
];

export default function Trust(){return (
  <section className="trust-sec" id="trust-2">
    <div className="trust-img">
      <img src="/trust-woman-evening.jpg" alt="A woman walking home in the evening light"/>
      <div className="trust-signals" aria-hidden="true">
        <span>FLOW / COMPLETE</span>
        <span>EXCEPTIONS / 0</span>
        <span>HUMAN / OFFLINE</span>
      </div>
    </div>
    <div className="trust-copy">
      <p className="rm-eyebrow">HUMAN IN THE MIDDLE</p>
      <h2>THE SYSTEM<br/>SUPPORTS.<br/><span>THE HUMAN</span><br/>DECIDES.</h2>
      <p>Technology should expand human capacity—not quietly replace human judgment. CUEPA protects sensitive information, challenges outputs, verifies what matters, and keeps people present at consequential moments.</p>
      <div className="trust-tags"><span>PROTECT</span><span>CHALLENGE</span><span>VERIFY</span></div>
      <div className="trust-rows">
        {rows.map(([label,body])=>(
          <p key={label}><b>{label}</b><span>{body}</span></p>
        ))}
      </div>
    </div>
  </section>
)}
