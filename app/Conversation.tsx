"use client";
import {useState} from "react";

const chipOptions=["One more customer","The next location","Dinner at home","The idea","More time, period","Not sure yet — that's fine"];

export default function Conversation(){
  const [chips,setChips]=useState<string[]>([]);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [note,setNote]=useState("");
  const [company,setCompany]=useState(""); // honeypot
  const [state,setState]=useState<"idle"|"sending"|"sent">("idle");
  const [error,setError]=useState("");

  const toggle=(c:string)=>setChips(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c]);

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setError("");
    setState("sending");
    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,note,chips,company})
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||"Something went wrong. Please try again.");
      setState("sent");
    }catch(err){
      setError(err instanceof Error?err.message:"Something went wrong. Please try again.");
      setState("idle");
    }
  };

  return (
    <section className="convo-sec" id="conversation">
      <div className="convo-media"><img src="/conversation-human.jpg" alt="A couple cooking dinner together at home in the evening"/></div>
      <div className="convo-body">
        <p className="rm-eyebrow">Start here</p>
        <h2>WHAT ARE YOU<br/>MAKING ROOM<br/>FOR?</h2>

        {state==="sent" ? (
          <div className="convo-sent" role="status">
            <p className="convo-sent-h">Thank you — that&rsquo;s with us.</p>
            <p>A real person reads every one. We&rsquo;ll come back to you at <strong>{email}</strong>, usually within a day.</p>
          </div>
        ) : (
        <form onSubmit={submit} noValidate>
          <p className="convo-lead">Pick what fits — or just tell us what feels heavier than it should. A real person reads every one.</p>
          <div className="convo-chips">
            {chipOptions.map(c=>(
              <button key={c} type="button" aria-pressed={chips.includes(c)} className={`convo-chip ${chips.includes(c)?"on":""}`} onClick={()=>toggle(c)}>{c}</button>
            ))}
          </div>
          <div className="convo-fields">
            <label><span>Name</span>
              <input type="text" name="name" autoComplete="name" required value={name} onChange={e=>setName(e.target.value)}/>
            </label>
            <label><span>Email</span>
              <input type="email" name="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
            </label>
            <label className="wide"><span>What feels heavier than it should?</span>
              <textarea rows={3} name="note" value={note} onChange={e=>setNote(e.target.value)}/>
            </label>
          </div>
          {/* Hidden from people, catnip for bots. */}
          <div className="convo-hp" aria-hidden>
            <label>Company<input type="text" tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)}/></label>
          </div>
          {error && <p className="convo-error" role="alert">{error}</p>}
          <button type="submit" className="convo-cta" disabled={state==="sending"}>
            {state==="sending"?"Sending…":"Start a Room Conversation"} <span aria-hidden>↗</span>
          </button>
          <p className="convo-note">We&rsquo;ll only use this to reply. No lists, no automated sequences.</p>
        </form>
        )}
      </div>
    </section>
  );
}
