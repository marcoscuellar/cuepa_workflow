"use client";
import {useState} from "react";
import {CONTACT_EMAIL} from "./SiteFooter";

// The entry ritual: every first touch asks what the owner is making room for.
// Optional — the email alone is enough to start.
const CHIPS=["Dinner at home","One more client","The next location","The idea","Nothing at all"];
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({hint="No deck, no sales call. A real person replies."}:{hint?:string}){
  const [email,setEmail]=useState("");
  const [chips,setChips]=useState<string[]>([]);
  const [company,setCompany]=useState(""); // honeypot
  const [state,setState]=useState<"idle"|"sending"|"sent">("idle");
  const [error,setError]=useState("");

  const toggle=(c:string)=>setChips(cur=>cur.includes(c)?cur.filter(x=>x!==c):[...cur,c]);

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setError("");
    if(!EMAIL_RE.test(email.trim())){
      setError("That email doesn’t look right. Check it and try again.");
      return;
    }
    setState("sending");
    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,chips,company})
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||"");
      setState("sent");
    }catch(err){
      const msg=err instanceof Error&&err.message?err.message:"That didn’t send.";
      setError(`${msg} You can also email ${CONTACT_EMAIL}.`);
      setState("idle");
    }
  };

  if(state==="sent") return (
    <div className="capture-sent" role="status">
      <p className="capture-sent-h">Got it.</p>
      <p>Marcos will write back to <strong>{email}</strong> personally, usually within a day.</p>
    </div>
  );

  return (
    <form className="capture" onSubmit={submit} noValidate>
      <fieldset className="capture-chips">
        <legend>What are you making room for? <span>(optional)</span></legend>
        <div className="convo-chips">
          {CHIPS.map(c=>(
            <button type="button" key={c} className={`convo-chip ${chips.includes(c)?"on":""}`}
              aria-pressed={chips.includes(c)} onClick={()=>toggle(c)}>{c}</button>
          ))}
        </div>
      </fieldset>
      <div className="capture-pill">
        <input
          type="email" name="email" required
          autoComplete="email" placeholder="you@yourbusiness.com"
          aria-label="Your email address"
          aria-invalid={!!error}
          value={email} onChange={e=>setEmail(e.target.value)}
        />
        <button type="submit" disabled={state==="sending"}>
          {state==="sending"?"Sending…":<>Make room <span aria-hidden>→</span></>}
        </button>
      </div>
      <div className="capture-hp" aria-hidden>
        <label>Company<input type="text" tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)}/></label>
      </div>
      {error ? <p className="capture-error" role="alert">{error}</p> : <p className="capture-hint">{hint}</p>}
    </form>
  );
}
