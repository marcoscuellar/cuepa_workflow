const beats:[string,string][]=[
  ["01 · LISTEN","We sit with the people doing the work — and write it down in their words."],
  ["02 · OBSERVE","We watch how work actually moves: tools, handoffs, decisions, friction."],
  ["03 · MARK","Every workflow gets a call: automate, stays human, or protected."]
];

const rows:[string,string,"auto"|"stay"|"prot"][]=[
  ["Invoicing & billing","rebuilt by hand every week","auto"],
  ["Lead follow-up","42 min average response","auto"],
  ["Scheduling changes","3.1 hrs/wk of back-and-forth","auto"],
  ["Client relationships","the part only you can do","stay"],
  ["Client records","never leaves your control","prot"]
];

const chipLabel={auto:"AUTOMATE",stay:"STAYS HUMAN",prot:"PROTECTED"};

export default function RoomMap(){return (
  <section className="rm" id="find">
    <div className="shell">
      <div className="rm-head">
        <div>
          <p className="rm-eyebrow">01 — FIND</p>
          <h2>WE LEARN THE WAY<br/>YOU MAKE ROOM.</h2>
        </div>
        <p>You keep meeting your clients. <b>We embed, listen, and map how work actually moves.</b> Nothing changes yet — the Room Map is drafted, and every call on it is yours.</p>
      </div>

      <div className="rm-beats">
        {beats.map(([label,body])=>(
          <article key={label}><b>{label}</b><p>{body}</p></article>
        ))}
        <div className="rm-out"><span>YOU WALK AWAY WITH</span><b>THE ROOM MAP</b></div>
      </div>

      <div className="rm-body">
        <div className="rm-stage">
          <svg className="rm-route" viewBox="0 0 1240 690" preserveAspectRatio="none" aria-hidden="true">
            <path d="M -60,390 C 200,370 420,420 660,398 C 900,376 1080,388 1300,392" fill="none" stroke="#2DD4BF" strokeWidth={4.5} strokeLinecap="round"/>
          </svg>

          <div className="rm-photo">
            <img src="/find-couple-kitchen.jpg" alt="A couple cooking together in their kitchen"/>
          </div>

          <div className="rm-note n1">
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>Day 1</i><em>LISTENED</em></div>
            <p>Sat with all 6 of your people. Wrote down how the work really moves — in their words.</p>
          </div>
          <div className="rm-note n2">
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>Day 3</i><em>LEARNING</em></div>
            <p>Watched the estimate go out today — 4 handoffs, 2 retypes of the same numbers. Noted. Keep doing it your way; I&rsquo;m just mapping.</p>
          </div>
          <div className="rm-note n3">
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>Day 5</i><em>MAPPED</em></div>
            <p>Your Room Map is drafted — 3 builds recommended, 2 things stay human, 1 protected.</p>
          </div>

          <div className="rm-map">
            <div className="rm-map-chrome">
              <span className="rm-dots"><i/><i/><i/></span>
              <span className="rm-pill">cuepa · room map</span>
              <span className="rm-draft">DRAFT — FOR YOUR OK</span>
            </div>
            <div className="rm-map-body">
              <h3>How work moves — mapped.</h3>
              <p>11 workflows observed · 6 people heard</p>
              {rows.map(([name,sub,type])=>(
                <div className="rm-row" key={name}>
                  <span className="nm"><b>{name}</b><span>{sub}</span></span>
                  <span className={`rm-chip ${type}`}>{type==="prot"?"▪ ":""}{chipLabel[type]}</span>
                </div>
              ))}
            </div>
            <div className="rm-foot">
              <span className="k">Room found</span>
              <div className="n">11.5<small>hrs / week</small></div>
              <div className="rm-bar"><i/></div>
              <p className="rm-note-fine"><b>Nothing is built until you approve it.</b> Every line of this map ends in your hands.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}
