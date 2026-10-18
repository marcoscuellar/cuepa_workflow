const rows:[string,string][]=[
  ["CHECKS ITS OWN WORK","Every workflow checks its output against your approved sources and flags anything it can’t back up."],
  ["WATCHES FOR ODD RESULTS","A second check catches results outside your normal patterns, even when they look fine."],
  ["YOU KEEP THE FINAL SAY","When something needs review, a person is told right away. The technology carries the work. You keep the authority."]
];

export default function Trust(){return (
  <section className="trust-sec" id="trust">
    <div className="trust-copy">
      <p className="rm-eyebrow">HUMAN IN THE MIDDLE</p>
      <h2>THE SYSTEM<br/>SUPPORTS.<br/><span>THE HUMAN</span><br/>DECIDES.</h2>
      <p>Technology should expand human capacity, not quietly replace human judgment. CUEPA prepares, drafts and flags. Sending, approving and deciding stay with you.</p>
      <div className="trust-tags"><span>PROTECT</span><span>CHALLENGE</span><span>VERIFY</span></div>
      <div className="trust-rows">
        {rows.map(([label,body])=>(
          <p key={label}><b>{label}</b><span>{body}</span></p>
        ))}
      </div>
    </div>
  </section>
)}
