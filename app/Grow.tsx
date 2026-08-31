const beats:[string,string][]=[
  ["01 · WATCH","The running system keeps looking for what a busy human can't see."],
  ["02 · SURFACE","Opportunities arrive as drafts — found money, quiet customers, patterns. Never actions."],
  ["03 · RETURN","What we learn feeds back into FIND, and the line turns again. ↻"]
];

export default function Grow(){return (
  <section className="rm" id="grow" style={{background:"#fff"}}>
    <div className="shell">
      <div className="rm-head">
        <div>
          <p className="rm-eyebrow">04 — GROW</p>
          <h2>THE ROOM BECOMES<br/>WHAT&rsquo;S NEXT.</h2>
        </div>
        <p>She&rsquo;s on a walk. The room she got back is why. <b>The line keeps looking</b> — surfacing what a busy human can&rsquo;t see, then asking. And then it curls back to FIND. ↻</p>
      </div>

      <div className="rm-beats">
        {beats.map(([label,body])=>(
          <article key={label}><b>{label}</b><p>{body}</p></article>
        ))}
        <div className="rm-out"><span>YOU WALK AWAY WITH</span><b>THE NEXT OPPORTUNITY</b></div>
      </div>

      <div className="rm-body">
        <div className="rm-stage" style={{height:600}}>
          <svg className="rm-route" viewBox="0 0 1240 560" preserveAspectRatio="none" aria-hidden="true">
            <path d="M -60,330 C 200,310 480,340 720,318 C 900,302 1040,290 1092,340 C 1130,378 1112,448 1048,452 C 990,455 962,400 1006,368 C 1028,352 1060,352 1080,366" fill="none" stroke="#2DD4BF" strokeWidth={4.5} strokeLinecap="round"/>
            <circle r={6} fill="#2DD4BF">
              <animateMotion dur="7s" begin="1.2s" repeatCount="indefinite" path="M 1092,340 C 1130,378 1112,448 1048,452 C 990,455 962,400 1006,368 C 1028,352 1060,352 1080,366"/>
            </circle>
          </svg>

          <div className="rm-photo" style={{width:340,height:560}}>
            <img src="/grow-dog-walk.jpg" alt="A woman walking her dog"/>
          </div>

          <div className="rm-found" style={{left:390,top:110}}>
            <span className="fb">✦ FOUND — UNBILLED WORK</span><span className="fa">$3,180</span>
            <p>Across 4 clients, back 62 days. Invoices drafted.</p>
            <span className="act">Review &amp; send →</span>
          </div>
          <div className="rm-found" style={{left:700,top:88}}>
            <span className="fb">✦ FOUND — WARM WIN-BACK</span><span className="fa">A regular went quiet</span>
            <p>92 days since her last order — but she&rsquo;s opened your last 3 emails. Note drafted.</p>
            <span className="act">Read the note →</span>
          </div>
          <div className="rm-found" style={{left:390,top:400}}>
            <span className="fb">✦ FOUND — QUIET TUESDAYS</span><span className="fa">A pattern in your week</span>
            <p>Tuesdays run 34% under capacity. A pilot idea is sketched for your review.</p>
            <span className="act">See the sketch →</span>
          </div>

          <div className="rm-loop">↻ BACK TO FIND</div>
        </div>
      </div>
    </div>
  </section>
)}
