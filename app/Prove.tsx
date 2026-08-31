const beats:[string,string][]=[
  ["01 · BASELINE","Before we build anything, we measure how things stand today."],
  ["02 · MEASURE","After: hours returned, response times, errors caught — in your numbers."],
  ["03 · VERIFY","Every claim ties to evidence. The report shows it — it doesn't just say it."]
];

export default function Prove(){return (
  <section className="rm" id="prove">
    <div className="shell">
      <div className="rm-head">
        <div>
          <p className="rm-eyebrow">03 — PROVE</p>
          <h2>WE DON&rsquo;T SAY IT WORKED.<br/>WE SHOW YOU.</h2>
        </div>
        <p>He&rsquo;s back at the bench — the room he got back went into the work he loves. <b>The Room Report holds the proof:</b> baseline before, evidence after, in his numbers.</p>
      </div>

      <div className="rm-beats">
        {beats.map(([label,body])=>(
          <article key={label}><b>{label}</b><p>{body}</p></article>
        ))}
        <div className="rm-out"><span>YOU WALK AWAY WITH</span><b>THE ROOM REPORT</b></div>
      </div>

      <div className="rm-body">
        <div className="rm-stage" style={{height:690}}>
          <svg className="rm-route" viewBox="0 0 1240 690" preserveAspectRatio="none" aria-hidden="true">
            <path d="M -60,390 C 200,370 420,420 660,398 C 900,376 1080,388 1300,392" fill="none" stroke="#2DD4BF" strokeWidth={4.5} strokeLinecap="round"/>
          </svg>

          <div className="rm-photo" style={{width:360,height:650}}>
            <img src="/prove-workbench.jpg" alt="A craftsman back at his workbench"/>
          </div>

          <div className="rm-note" style={{left:402,top:96}}>
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>6:12 PM</i><em>DONE</em></div>
            <p>Your 4pm moved to tomorrow — notes sent, client covered. You&rsquo;re clear for the night.</p>
          </div>
          <div className="rm-note" style={{left:452,top:300}}>
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>Month 2</i><em>REPORTED</em></div>
            <p>Your Room Report is in. 11.5 hours came back this week — most of it evenings. That was the point.</p>
          </div>

          <div className="rm-plat" style={{top:30}}>
            <div className="rm-map-chrome">
              <span className="rm-dots"><i/><i/><i/></span>
              <span className="rm-pill">cuepa · room report</span>
              <span className="rm-draft">● VERIFIED</span>
            </div>
            <div className="rm-plat-body">
              <h4>Your room, before → after</h4>
              <p className="sub">measured against the baseline from week one</p>
              <div style={{marginTop:8}}>
                <div className="rm-barow"><span className="lbl">Lead response<span>a new customer waits…</span></span><span className="was">42 min</span><span>→</span><span className="now">4<small> min</small></span></div>
                <div className="rm-barow"><span className="lbl">Hours returned<span>to your calendar, weekly</span></span><span className="was">0</span><span>→</span><span className="now">11.5<small> hrs</small></span></div>
                <div className="rm-barow"><span className="lbl">Invoice errors<span>caught before sending</span></span><span className="was">?</span><span>→</span><span className="now">17<small> caught</small></span></div>
              </div>
              <div className="rm-verified">
                <span className="rm-vring"><svg viewBox="0 0 88 88"><circle cx="44" cy="44" r="38" stroke="#eceded" strokeWidth={7} fill="none"/><circle cx="44" cy="44" r="38" stroke="#2DD4BF" strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="239" strokeDashoffset="10" transform="rotate(-90 44 44)"/></svg><span className="vt">✓</span></span>
                <p><b>Verified against baseline.</b> Every number ties to a measurement we took before we built anything.</p>
              </div>
              <div className="rm-foot">
                <span className="k">The evenings came back</span>
                <div className="n">Most of it after 6 PM</div>
                <p className="rm-note-fine">That was the point.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}
