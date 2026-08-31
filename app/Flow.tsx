const beats:[string,string][]=[
  ["01 · BUILD","The system is built around how you already operate — nothing new for your team to learn."],
  ["02 · CONNECT","Information gathered, actions prepared, decisions routed to the right person."],
  ["03 · HAND OFF","Every flow stops at a human. Your sign-off is the last step, always."]
];

export default function Flow(){return (
  <section className="rm" id="flow" style={{background:"#fff"}}>
    <div className="shell">
      <div className="rm-head">
        <div>
          <p className="rm-eyebrow">02 — FLOW</p>
          <h2>THE NOISE RESOLVES.<br/>THE DAY GETS A SHAPE.</h2>
        </div>
        <p>A Tuesday, already sorted. <b>The day starts with what matters</b> — while he&rsquo;s in the stands with his son. The line does the sorting. He keeps the say.</p>
      </div>

      <div className="rm-beats">
        {beats.map(([label,body])=>(
          <article key={label}><b>{label}</b><p>{body}</p></article>
        ))}
        <div className="rm-out"><span>YOU WALK AWAY WITH</span><b>THE WORKING SYSTEM</b></div>
      </div>

      <div className="rm-body">
        <div className="rm-stage" style={{height:700}}>
          <svg className="rm-route" viewBox="0 0 1240 700" preserveAspectRatio="none" aria-hidden="true">
            <path d="M -60,390 C 200,370 420,420 660,398 C 900,376 1080,388 1300,392" fill="none" stroke="#2DD4BF" strokeWidth={4.5} strokeLinecap="round"/>
          </svg>

          <div className="rm-photo" style={{width:360,height:660}}>
            <img src="/flow-cubs-game.jpg" alt="A father and son cheering at a ballgame"/>
          </div>

          <div className="rm-note" style={{left:402,top:96}}>
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>1:22 PM</i><em>CAUGHT</em></div>
            <p>Two emails from the client came in. Replies drafted from your templates.</p>
          </div>
          <div className="rm-note" style={{left:470,top:286}}>
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>1:36 PM</i><em>CONFIRMED</em></div>
            <p>Robert asked to push to 3pm. Your calendar was open — confirmed.</p>
          </div>
          <div className="rm-note" style={{left:408,top:494}}>
            <div className="rm-note-top"><span className="av"/><b>CUEPA</b><i>1:48 PM</i><em>QUEUED</em></div>
            <p>Invoice #1048 nudged, politely. Third late one this month — flagged.</p>
          </div>

          <div className="rm-spill" style={{left:565,top:428}}><i>sorted</i> · 3 priorities</div>
          <div className="rm-spill" style={{left:695,top:250}}><i>resolved</i> · 2 conflicts</div>

          <div className="rm-phone">
            <span className="rm-island"/>
            <span className="rm-pstatus"><b>7:58</b><em>▪▪▪</em></span>
            <div className="rm-fplan">
              <p className="rm-fkick">YOUR DAY · OPERATING PLAN</p>
              <h4>Good morning, Marcos<span>.</span></h4>
              <p className="rm-fdate"><b>Tuesday · Aug 25</b> · First meeting in 48 minutes</p>
              <div className="rm-fprio">
                <article><i>01 · DECISION</i><b>Approve the Lakeshore estimate</b><p>2 minutes. Keeps Thursday&rsquo;s install on schedule.</p></article>
                <article><i>02 · PREPARED</i><b>Rivera brief — ready</b><p>Read it before the 10:30. Four minutes, everything you need.</p></article>
                <article><i>03 · HANDLED</i><b>Invoice #1048 — drafted</b><p>Checked against the estimate. Waiting on your OK.</p></article>
              </div>
              <div className="rm-fcal">
                <div className="rm-fslot hot"><time>8:15</time><span><b>Approve Lakeshore estimate</b></span><em>2 MIN</em></div>
                <div className="rm-fslot"><time>9:00</time><span><b>Focus — finish the proposal</b></span><em>PROTECTED</em></div>
                <div className="rm-fslot"><time>12:00</time><span>Lunch with your daughter</span><em>PERSONAL</em></div>
              </div>
              <p className="rm-fneeds">Everything else is handled. <b>1 thing needs you.</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}
