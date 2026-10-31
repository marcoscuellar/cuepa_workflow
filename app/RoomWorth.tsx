"use client";

import {useId, useState} from "react";
import {downloadRoomEstimate} from "./roomEstimatePdf";

// Answers the first question every owner and manager asks: "How much time and
// money is this costing me right now?" It uses only their own numbers and makes
// no promise about savings — the Room Map and Room Report do that, with evidence.
const WEEKS_PER_YEAR=48;

type Field={key:"people"|"hours"|"rate";label:string;help:string;min:number;max:number;step:number;format:(v:number)=>string};

const fields:Field[]=[
  {key:"people",label:"People on the team",help:"Count yourself.",min:1,max:50,step:1,format:v=>`${v}`},
  {key:"hours",label:"Hours each, per week, on repeat work",help:"Inbox, scheduling, follow-ups, invoices, copy-paste.",min:1,max:25,step:1,format:v=>`${v} hrs`},
  {key:"rate",label:"What an hour costs you",help:"Pay plus overhead. A rough number is fine.",min:15,max:150,step:5,format:v=>`$${v}`}
];

// Common small-business tools. "Other" lets people name anything else.
const TOOLS=["Google Workspace","Microsoft 365","QuickBooks","Square","HubSpot","Calendly","Salesforce","Excel / Sheets"];
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
const count=new Intl.NumberFormat("en-US");

export default function RoomWorth(){
  const [vals,setVals]=useState({people:5,hours:6,rate:35});
  const id=useId();
  const [email,setEmail]=useState("");
  const [tools,setTools]=useState<string[]>([]);
  const [other,setOther]=useState("");
  const [company,setCompany]=useState(""); // honeypot
  const [status,setStatus]=useState<"idle"|"error"|"done">("idle");
  const toggle=(t:string)=>setTools(cur=>cur.includes(t)?cur.filter(x=>x!==t):[...cur,t]);

  // Progressive gate: the numbers above are free. The PDF asks for a work email
  // and tools. Download first (instant), then notify Marcos in the background.
  const getEstimate=(e:React.FormEvent)=>{
    e.preventDefault();
    const clean=email.trim();
    if(!EMAIL.test(clean)){setStatus("error");return;}
    const allTools=[...tools,...other.split(",").map(t=>t.trim()).filter(Boolean)];
    downloadRoomEstimate({email:clean,people:vals.people,hours:vals.hours,rate:vals.rate,tools:allTools,weeksPerYear:WEEKS_PER_YEAR});
    setStatus("done");
    const note=[
      `Work email: ${clean}`,
      `People on the team: ${vals.people}`,
      `Hours each per week on repeat work: ${vals.hours}`,
      `Hourly cost: $${vals.rate}`,
      `Estimate: ${count.format(vals.people*vals.hours)} hrs/week · ${count.format(vals.people*vals.hours*WEEKS_PER_YEAR)} hrs/year · ${money.format(vals.people*vals.hours*WEEKS_PER_YEAR*vals.rate)}/year`,
      `Tools: ${allTools.length?allTools.join(", "):"Not shared"}`
    ].join("\n");
    fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:clean,company,subject:`Room Estimate downloaded — ${clean}`,note})}).catch(()=>{});
  };
  const weekly=vals.people*vals.hours;
  const yearly=weekly*WEEKS_PER_YEAR;
  const cost=yearly*vals.rate;

  return (
    <section className="rw" id="worth">
      <div className="shell">
        <div className="rm-head">
          <div>
            <p className="rm-eyebrow">The first question</p>
            <h2>What&rsquo;s the room <span className="rw-accent">worth?</span></h2>
          </div>
          <p>Every owner and manager asks it first: <b>how much time and money is the busywork costing us?</b> Start with your own numbers. We&rsquo;ll measure the real ones together.</p>
        </div>

        <div className="rw-body">
          <form className="rw-inputs" onSubmit={e=>e.preventDefault()} aria-label="Estimate the room">
            {fields.map(f=>{
              const inputId=`${id}-${f.key}`;
              return (
                <div className="rw-field" key={f.key}>
                  <div className="rw-field-top">
                    <label htmlFor={inputId}>{f.label}</label>
                    <output htmlFor={inputId}>{f.format(vals[f.key])}</output>
                  </div>
                  <input
                    id={inputId} type="range" min={f.min} max={f.max} step={f.step}
                    value={vals[f.key]}
                    aria-describedby={`${inputId}-help`}
                    aria-valuetext={f.format(vals[f.key])}
                    onChange={e=>setVals(v=>({...v,[f.key]:Number(e.target.value)}))}
                  />
                  <small id={`${inputId}-help`}>{f.help}</small>
                </div>
              );
            })}
          </form>

          <div className="rw-result" aria-live="polite">
            <p className="rw-k">Right now, the repeat work takes</p>
            <div className="rw-nums">
              <div><strong>{count.format(weekly)}</strong><span>hours a week</span></div>
              <div><strong>{count.format(yearly)}</strong><span>hours a year</span></div>
              <div className="rw-money"><strong>{money.format(cost)}</strong><span>a year in time</span></div>
            </div>
            <p className="rw-that">That&rsquo;s the room on the table.</p>
            <ol className="rw-steps">
              <li><b>Room Map</b><span>We find how much of it we can take off your plate.</span></li>
              <li><b>Room Report</b><span>We prove what actually came back, measured against today.</span></li>
            </ol>
            <form className="rw-gate" onSubmit={getEstimate} noValidate aria-labelledby={`${id}-gate`}>
              <p className="rw-gate-h" id={`${id}-gate`}>Get your Room Estimate <span>PDF</span></p>
              <label className="rw-gate-label" htmlFor={`${id}-email`}>Work email</label>
              <input id={`${id}-email`} className="rw-gate-input" type="email" autoComplete="email" inputMode="email"
                value={email} onChange={e=>{setEmail(e.target.value);if(status==="error")setStatus("idle");}}
                aria-invalid={status==="error"} aria-describedby={status==="error"?`${id}-err`:undefined} placeholder="you@yourbusiness.com"/>
              {status==="error" && <p className="rw-gate-err" id={`${id}-err`} role="alert"><span aria-hidden="true">!</span>Please add a valid work email.</p>}
              <fieldset className="rw-tools">
                <legend>Tools you use <small>(optional)</small></legend>
                <div className="rw-chips">
                  {TOOLS.map(t=>(
                    <label key={t} className={`rw-chip ${tools.includes(t)?"is-on":""}`}>
                      <input type="checkbox" checked={tools.includes(t)} onChange={()=>toggle(t)}/>
                      <span aria-hidden="true" className="rw-tick">✓</span>{t}
                    </label>
                  ))}
                </div>
                <label className="rw-gate-label rw-other-l" htmlFor={`${id}-other`}>Other tools</label>
                <input id={`${id}-other`} className="rw-gate-input" type="text" value={other} onChange={e=>setOther(e.target.value)} placeholder="e.g. Jobber, Dentrix"/>
              </fieldset>
              <input className="rw-hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={e=>setCompany(e.target.value)} name="company"/>
              <button type="submit" className="rw-cta">Download your Room Estimate <span aria-hidden>↓</span></button>
              <p className="rw-gate-sub">Your estimate, not a quote. It downloads right away.</p>
              {status==="done" && <p className="rw-gate-ok" role="status"><span aria-hidden="true">✓</span>Your Room Estimate is downloading.</p>}
            </form>
            <a href="#conversation" className="rw-alt">Or book a 20-Minute Room Conversation <span aria-hidden>→</span></a>
            <p className="rw-fine">Your own estimate, not a quote or a promise. Based on {WEEKS_PER_YEAR} working weeks a year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
