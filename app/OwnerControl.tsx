export default function OwnerControl(){return (
  <section className="report-showcase" id="product">
    <div className="report-intro">
      <p className="lbl">SEE WHAT YOU GET</p>
      <h3>YOUR ROOM,<br/>ON ONE SCREEN.</h3>
      <p>Not a promise — a diagnostic. Your baseline, what the system handled, what it found, and the few things that need you. This is the screen we stand behind.</p>
    </div>

    <div className="rrStage rrStage--ops">
      <div className="rrFrame">
        <div className="rrChrome">
          <span className="rrDots"><i/><i/><i/></span>
          <span className="rrUrl">app.makingcuepa.com · Operations Overview</span>
          <span className="rrBadge">● DEMO · SAMPLE DATA</span>
        </div>
        <picture>
          <source media="(max-width: 639px)" srcSet="/hero-operations-overview-phone.jpg" width={786} height={1572}/>
          <img src="/hero-operations-overview.png" width={1225} height={887} loading="lazy"
            alt="CUEPA Operations Overview: Capacity and ROI, the Decision Station approval feed, and Live Engine Activity (demo with sample data)"
            className="rrShot"/>
        </picture>
      </div>
      <p className="rrNote">Demo with sample data. Yours starts with your baseline and ends with your numbers.</p>
    </div>

    <p className="doorway">The process is consistent. <span>The solution is yours.</span></p>
  </section>
)}
