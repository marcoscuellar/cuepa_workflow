export default function OwnerControl(){return (
  <section className="report-showcase" id="product">
    <div className="report-intro">
      <p className="lbl">SEE WHAT YOU GET</p>
      <h3>YOUR ROOM,<br/>ON ONE SCREEN.</h3>
      <p>Not a promise — a diagnostic. Your baseline, what the system handled, what it found, and the few things that need you. This is the screen we stand behind.</p>
    </div>

    <div className="rrStage">
      <div className="rrFrame">
        <div className="rrChrome">
          <span className="rrDots"><i/><i/><i/></span>
          <span className="rrUrl">cuepa · owner control</span>
          <span className="rrBadge">● VERIFIED AGAINST BASELINE</span>
        </div>
        <div className="rrBody">
          <div className="rrHead">
            <div><h4>Good evening, Marcos.</h4><p>3 things need you. Everything else is handled.</p></div>
            <span className="rrPeriod">MARCH · WEEK 4</span>
          </div>

          <div className="rrStats">
            <div className="rrStat key"><span className="k">Needs you</span><span className="n">3</span><span className="c">held for your judgment</span></div>
            <div className="rrStat"><span className="k">Hours returned</span><span className="n">11.5 <em>▲ 34%</em></span><span className="c">this week, to your calendar</span></div>
            <div className="rrStat"><span className="k">Lead response</span><span className="n">4<small>min</small></span><span className="c">was 42 min at baseline</span></div>
            <div className="rrStat"><span className="k">Errors removed</span><span className="n">17</span><span className="c">invoices corrected before sending</span></div>
          </div>

          <div className="rrMain">
            <div className="rrCard">
              <p className="t">Hours returned to you</p>
              <p className="s">Last 8 weeks · measured against your baseline</p>
              <svg className="rrChart" viewBox="0 0 600 180" preserveAspectRatio="none">
                <defs><linearGradient id="rrArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.28"/><stop offset="100%" stopColor="#2DD4BF" stopOpacity="0"/></linearGradient></defs>
                <g stroke="#eee8da" strokeWidth={1}><line x1={0} y1={38} x2={600} y2={38}/><line x1={0} y1={80} x2={600} y2={80}/><line x1={0} y1={122} x2={600} y2={122}/><line x1={0} y1={160} x2={600} y2={160}/></g>
                <path d="M8,132 L92,120 L176,126 L260,101 L344,76 L428,84 L512,50 L592,34 L592,160 L8,160 Z" fill="url(#rrArea)"/>
                <path d="M8,132 L92,120 L176,126 L260,101 L344,76 L428,84 L512,50 L592,34" fill="none" stroke="#2DD4BF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx={592} cy={34} r={4.5} fill="#2DD4BF"/>
              </svg>
              <div className="rrWeeks"><span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>NOW</span></div>
            </div>
            <div className="rrRight">
              <div className="rrCard">
                <p className="t">Flow success</p>
                <p className="s">this month</p>
                <div className="rrGauge">
                  <div className="rrDial">
                    <svg viewBox="0 0 100 100"><circle cx={50} cy={50} r={40} fill="none" stroke="#eee8da" strokeWidth={9}/><circle cx={50} cy={50} r={40} fill="none" stroke="#6b7d72" strokeWidth={9} strokeLinecap="round" strokeDasharray="251.3" strokeDashoffset="3.3" transform="rotate(-90 50 50)"/></svg>
                    <span className="rrDialLbl"><b>98.7%</b></span>
                  </div>
                  <div className="rrGlist"><p>Completed <b>1,232</b></p><p>Escalated to you <b>14</b></p><p>Failed safely <b>2</b></p></div>
                </div>
              </div>
              <div className="rrFound">
                <span className="fb">✦ FOUND — WHAT A HUMAN WOULD MISS</span>
                <span className="fa">$3,180 unbilled</span>
                <p>Across 4 clients, going back 62 days. Invoices are drafted and waiting for your OK.</p>
              </div>
            </div>
          </div>

          <div className="rrApprove">
            <div className="rrApL">
              <span className="k">READY FOR YOUR SIGN-OFF</span>
              <span className="fa">$2,805 · contractor payout</span>
              <div className="rrChecks">
                <span className="rrChk"><b>✓</b>Protected — account details masked</span>
                <span className="rrChk"><b>✓</b>Challenged — matched against the estimate</span>
                <span className="rrChk"><b>✓</b>Verified — 3 receipts, itemized</span>
              </div>
            </div>
            <div className="rrBtns"><span className="rrGo">Approve</span><span className="rrHold">Hold</span></div>
          </div>
        </div>
      </div>

      <aside className="rrMini">
          <p className="t">Time back — this week</p>
          <div className="rrBars">
            <span className="rrBarW"><i style={{height:"38%"}}/></span>
            <span className="rrBarW"><i style={{height:"58%"}}/></span>
            <span className="rrBarW"><i style={{height:"46%"}}/></span>
            <span className="rrBarW hot"><em>3.1 hrs</em><i style={{height:"92%"}}/></span>
            <span className="rrBarW"><i style={{height:"66%"}}/></span>
            <span className="rrBarW"><i style={{height:"28%"}}/></span>
            <span className="rrBarW"><i style={{height:"20%"}}/></span>
          </div>
          <div className="rrDays"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
        </aside>
        <p className="rrNote">Representative Room Report. Yours starts with your baseline and ends with your numbers.</p>
      </div>

    <div className="doorway"><p>THE PROCESS IS CONSISTENT. <span>THE SOLUTION IS YOURS.</span></p></div>
  </section>
)}
