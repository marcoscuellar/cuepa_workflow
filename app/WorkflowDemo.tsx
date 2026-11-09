"use client";
import {useState} from "react";

const stages=[
 {number:"01",title:"Room Conversation",meta:"START WITH YOUR PEOPLE",status:"TOGETHER",summary:"We listen to the people doing the work—where it gets stuck, what matters most, and what must never be disrupted.",artifact:<><span className="artifact-label">ROOM CONVERSATION</span><strong>“What keeps following your team home?”</strong><p>Real friction · Existing strengths · Clear boundaries</p></>},
 {number:"02",title:"Map the work together",meta:"OBSERVE · DOCUMENT · BASELINE",status:"MAPPED",summary:"We follow the work across people, tools, decisions, and handoffs so everyone can see the same reality before anything changes.",artifact:<><span className="artifact-label">YOUR ROOM MAP</span><ul><li>Where capacity is disappearing</li><li>What should move differently</li><li>What stays human and protected</li></ul></>},
 {number:"03",title:"One contained flow",meta:"BUILT AROUND YOUR REALITY",status:"CO-DESIGNED",summary:"We choose one meaningful place to begin and build around your current tools, policies, and people—not a generic template.",artifact:<><span className="artifact-label">ONE CONTAINED FLOW</span><strong>One workflow. Clear boundaries.</strong><p>Your tools preserved · Approval points defined · Team feedback included</p></>},
 {number:"04",title:"Tested baseline",meta:"YOUR BASELINE · CHIMAL",status:"TESTED",summary:"We test the workflow in a contained environment, challenge its outputs, and measure it against the baseline we established together.",artifact:<><span className="artifact-label">TESTED BASELINE · CHIMAL</span><ul><li>Time and capacity returned</li><li>Errors, exceptions, and evidence</li><li>What earned trust—and what did not</li></ul></>},
 {number:"05",title:"Your decision",meta:"EXPAND OR STOP · YOUR CALL",status:"YOUR DECISION",summary:"You see the evidence, hear from your team, and decide whether the workflow stays contained, changes, expands, or stops.",artifact:<><span className="artifact-label">YOUR DECISION</span><strong>Does this earn more responsibility?</strong><p>Evidence attached · Team feedback included · Nothing expands automatically</p><div className="artifact-actions"><button type="button">Expand this flow</button><button type="button" className="secondary">Stop here</button></div></>}
];

export default function WorkflowDemo(){
 const [open,setOpen]=useState(0);
 return <section className="living-workflow" id="workflow" aria-labelledby="workflow-title"><div className="workflow-shell shell">
  <header className="workflow-heading"><p className="eyebrow">The engagement · How a team actually starts</p><h2 id="workflow-title">WE BUILD IT WITH YOU.<br/><span>YOU DECIDE WHAT GROWS.</span></h2><p>Start with your people. Prove one contained flow. Then decide together whether it expands—or stops.</p></header>
  <div className="workflow-layout">
  <div className="workflow-canvas">
   <div className="workflow-legend" aria-label="Partnership journey legend"><span><i className="input-dot"/>What your team shares</span><span><i/>What we build together</span><span><i className="human-dot"/>What only you decide</span></div>
   <div className="workflow-pulse" aria-hidden>{stages.map(x=><i key={x.number}/>)}</div>
   <div className="workflow-stages">{stages.map((stage,index)=>{const active=open===index;return <article className={`workflow-stage ${active?"is-open":""} ${index===4?"human-stage":""}`} key={stage.number}>
    <button className="stage-trigger" type="button" onClick={()=>setOpen(active?-1:index)} aria-expanded={active}><span className="stage-number">{stage.number}</span><span className="stage-title"><small>{stage.meta}</small><strong>{stage.title}</strong></span><span className="stage-status">{stage.status}</span><span className="stage-toggle" aria-hidden>{active?"−":"+"}</span></button>
    <div className="stage-detail" aria-hidden={!active}><p>{stage.summary}</p><div className="stage-artifact">{stage.artifact}</div></div>
   </article>})}</div>
   <footer className="workflow-output"><span>WHAT YOU RECEIVE</span><strong>One proven workflow—with boundaries, evidence, and ownership already built in.</strong><small>No black box. No forced rollout.</small></footer>
  </div>
  <aside className="workflow-human"><img src="/human-team.png" alt="A small business team working together"/><div><small>BUILT WITH THE PEOPLE WHO KNOW THE WORK</small><strong>Your team shapes the system.<br/>You choose what earns more responsibility.</strong></div></aside>
  </div>
 </div></section>
}
