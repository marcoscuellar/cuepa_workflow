import "./whereai.css";
import {RETURN_C_PATH} from "./ReturnMark";

// Section 3 — "Where AI meets the work." A calm bridge between The Reality and The Practice.
// It does not introduce a process or a set of steps: one illustration of CUEPA connecting the
// everyday places work lives, with the capacity landing back with people.
// Replaces "Your Room Worth" (RoomWorth.tsx and roomEstimatePdf.ts are kept in the repo, unmounted —
// see docs/ARCHIVED_ROOM_WORTH_CALCULATOR.md).

// Everyday work surfaces — generic labels on purpose (no third-party brands, no integration claims).
const nodes=[
  {label:"Email",x:95,y:70},
  {label:"Calendar",x:280,y:70},
  {label:"Invoices",x:465,y:70},
  {label:"Customers",x:95,y:370},
  {label:"Documents",x:280,y:370}
];
const HUB={x:280,y:220};
// Pulse timing (6s loop): the five surfaces send work in one after another, then capacity goes out to people.
const STEP=0.45;                                   // seconds between each surface
const OUT_DELAY=(nodes.length-1)*STEP+1.6;          // after the last pulse reaches CUEPA
const at=(sec:number)=>({"--d":`${sec}s`} as React.CSSProperties);
const PEOPLE={x:465,y:370};

export default function WhereAiMeetsWork(){
  return <section id="where-ai" className="wai" aria-labelledby="wai-title">
    <div className="wai-band">
      <div className="wai-grid">
        <div className="wai-copy wai-reveal">
          <h2 id="wai-title">Where AI meets the work.</h2>
          <p className="wai-lead">AI isn&rsquo;t another layer of work. It&rsquo;s a way to rethink how the work gets done.</p>
          <p className="wai-body">From everyday operations to complex workflows, CUEPA helps businesses put AI to work&mdash;connecting systems, automating processes, and giving people more capacity to focus on what matters.</p>
        </div>
        <figure className="wai-visual wai-reveal">
          <svg viewBox="0 0 560 440" role="img" aria-labelledby="wai-fig-title wai-fig-desc" focusable="false">
            <title id="wai-fig-title">CUEPA connecting everyday work</title>
            <desc id="wai-fig-desc">Illustration: CUEPA sits at the center, connecting everyday work such as email, calendar, invoices, customers and documents, with the capacity coming back to your people.</desc>
            {/* connections: quiet guide lines, then pulses of work travelling in toward CUEPA and capacity out to people */}
            <g className="wai-lines" fill="none" strokeLinecap="round">
              {nodes.map(n=><line key={n.label} className="wai-line" x1={n.x} y1={n.y} x2={HUB.x} y2={HUB.y}/>)}
              <line className="wai-line wai-line--out" x1={HUB.x} y1={HUB.y} x2={PEOPLE.x} y2={PEOPLE.y}/>
              {nodes.map((n,i)=><line key={`p-${n.label}`} className="wai-pulse" pathLength={100} style={at(i*STEP)} x1={n.x} y1={n.y} x2={HUB.x} y2={HUB.y}/>)}
              <line className="wai-pulse wai-pulse--out" pathLength={100} style={at(OUT_DELAY)} x1={HUB.x} y1={HUB.y} x2={PEOPLE.x} y2={PEOPLE.y}/>
            </g>
            {/* hub */}
            <circle className="wai-orbit" cx={HUB.x} cy={HUB.y} r={108}/>
            <circle className="wai-halo" cx={HUB.x} cy={HUB.y} r={92}/>
            <circle cx={HUB.x} cy={HUB.y} r={64} fill="#0F766E"/>
            <g transform={`translate(${HUB.x} ${HUB.y}) scale(.55) translate(-95 -100)`}>
              <path d={RETURN_C_PATH} fill="none" stroke="#FFFFFF" strokeWidth={22} strokeLinecap="round"/>
            </g>
            {/* everyday work */}
            {nodes.map((n,i)=><g key={n.label}>
              <rect className="wai-pill" style={at(i*STEP)} x={n.x-75} y={n.y-26} width={150} height={52} rx={26}/>
              <text className="wai-label" x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central">{n.label}</text>
            </g>)}
            {/* your people */}
            <g>
              <rect className="wai-ping" style={at(OUT_DELAY+1.6)} x={PEOPLE.x-85} y={PEOPLE.y-26} width={170} height={52} rx={26}/>
              <rect x={PEOPLE.x-85} y={PEOPLE.y-26} width={170} height={52} rx={26} fill="#FFFFFF"/>
              <g transform={`translate(${PEOPLE.x-58} ${PEOPLE.y})`} fill="#080B0F">
                <circle cx={0} cy={-6} r={6}/>
                <path d="M-11 11 a11 11 0 0 1 22 0 Z"/>
              </g>
              <text x={PEOPLE.x-38} y={PEOPLE.y} textAnchor="start" dominantBaseline="central" className="wai-label wai-label--people">Your people</text>
            </g>
          </svg>
          <figcaption>We put AI to work inside your operations, so your people can focus on what matters.</figcaption>
        </figure>
      </div>
    </div>
  </section>;
}
