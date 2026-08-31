"use client";
import {useState} from "react";

const chipOptions=["One more customer","The next location","Dinner at home","The idea","More time, period","Not sure yet — that's fine"];

export default function Conversation(){
  const [chips,setChips]=useState<string[]>([]);
  const [name,setName]=useState("");
  const [note,setNote]=useState("");

  const toggle=(c:string)=>setChips(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c]);

  const go=()=>{
    const lines:string[]=[];
    if(name) lines.push(`I'm ${name}.`);
    if(chips.length) lines.push(`I want to make room for: ${chips.join(", ")}.`);
    if(note) lines.push(`What feels heavier than it should: ${note}`);
    const body=lines.join("\n\n")||"I'd like to start a Room Conversation.";
    window.location.href=`mailto:marcos@ollinos.com?subject=${encodeURIComponent("Room Conversation - CUEPA")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media">Human photo</div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>WHAT ARE YOU<br/>MAKING ROOM<br/>FOR?</h2>
        <p className="convo-lead">Pick what fits — or just tell us what feels heavier than it should. A real person reads every one.</p>
        <div className="convo-chips">
          {chipOptions.map(c=>(
            <button key={c} type="button" className={`convo-chip ${chips.includes(c)?"on":""}`} onClick={()=>toggle(c)}>{c}</button>
          ))}
        </div>
        <div className="convo-fields">
          <label><span>Name</span><input type="text" value={name} onChange={e=>setName(e.target.value)}/></label>
          <label className="wide"><span>What feels heavier than it should?</span><textarea rows={2} value={note} onChange={e=>setNote(e.target.value)}/></label>
        </div>
        <button type="button" className="convo-cta" onClick={go}>Start a Room Conversation <span>↗</span></button>
        <p className="convo-note">Opens your email — no forms lost to the void.</p>
      </div>
    </section>
  );
}
