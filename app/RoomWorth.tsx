"use client";

import {useId, useState} from "react";

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

const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
const count=new Intl.NumberFormat("en-US");

export default function RoomWorth(){
  const [vals,setVals]=useState({people:5,hours:6,rate:35});
  const id=useId();
  const weekly=vals.people*vals.hours;
  const yearly=weekly*WEEKS_PER_YEAR;
  const cost=yearly*vals.rate;

  return (
    <section className="rw" id="worth">
      <div className="shell">
        <div className="rm-head">
          <div>
            <p className="rm-eyebrow">The first question</p>
            <h2>WHAT&rsquo;S THE<br/>ROOM <span className="rw-accent">WORTH?</span></h2>
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
            <a href="#conversation" className="rw-cta">Start a Room Conversation <span aria-hidden>→</span></a>
            <p className="rw-fine">Your own estimate, not a quote or a promise. Based on {WEEKS_PER_YEAR} working weeks a year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
