"use client";
import {useId, useState} from "react";
import {CONTACT_EMAIL} from "./SiteFooter";

// Same shape as the ELIPAN contact form: name, email, message, send.
// CUEPA adds the entry ritual as optional chips: what are you making room for?
const CHIPS=["Dinner at home","One more client","The next location","The idea","Nothing at all"];
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field="name"|"email"|"";

export default function ContactForm({tone="dark",onClose}:{tone?:"dark"|"light";onClose?:()=>void}){
  const uid=useId();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [note,setNote]=useState("");
  const [chips,setChips]=useState<string[]>([]);
  const [company,setCompany]=useState(""); // honeypot
  const [state,setState]=useState<"idle"|"sending"|"sent">("idle");
  const [error,setError]=useState("");
  const [bad,setBad]=useState<Field>("");

  const toggle=(c:string)=>setChips(cur=>cur.includes(c)?cur.filter(x=>x!==c):[...cur,c]);

  const fail=(msg:string,field:Field)=>{
    setError(msg);setBad(field);
    if(field) document.getElementById(`${uid}-${field}`)?.focus();
  };

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(state==="sending") return;
    if(!name.trim()) return fail("Add your name.","name");
    if(!EMAIL_RE.test(email.trim())) return fail("Enter a valid email address.","email");
    setError("");setBad("");setState("sending");
    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,note,chips,company})
      });
      if(!res.ok) throw new Error();
      setState("sent");
    }catch{
      setState("idle");
      fail(`That didn’t go through. Please try again, or write to ${CONTACT_EMAIL}.`,"");
    }
  };

  if(state==="sent") return (
    <div className={`cf cf-${tone} cf-done`} role="status">
      <span className="cf-check" aria-hidden>✓</span>
      <p className="cf-done-h" tabIndex={-1}>Message sent.</p>
      <p>Thank you, {name.split(" ")[0]}. Marcos will get back to you soon.</p>
      {onClose && <button type="button" className="cf-again" onClick={onClose}>Close</button>}
    </div>
  );

  return (
    <form className={`cf cf-${tone}`} onSubmit={submit} noValidate>
      <label className={`cf-field ${bad==="name"?"bad":""}`}>
        <span>Name</span>
        <input id={`${uid}-name`} name="name" type="text" autoComplete="name" placeholder="Your name"
          value={name} onChange={e=>setName(e.target.value)} aria-invalid={bad==="name"}/>
      </label>
      <label className={`cf-field ${bad==="email"?"bad":""}`}>
        <span>Email</span>
        <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="you@yourbusiness.com"
          value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={bad==="email"}/>
      </label>
      <fieldset className="cf-chips">
        <legend>What are you making room for? <em>(optional)</em></legend>
        <div>
          {CHIPS.map(c=>(
            <button type="button" key={c} className={`cf-chip ${chips.includes(c)?"on":""}`}
              aria-pressed={chips.includes(c)} onClick={()=>toggle(c)}>{c}</button>
          ))}
        </div>
      </fieldset>
      <label className="cf-field">
        <span>Message <em>(optional)</em></span>
        <textarea name="message" rows={4} placeholder="Where does your week feel heavier than it should?"
          value={note} onChange={e=>setNote(e.target.value)}/>
      </label>
      <label className="cf-trap" aria-hidden>Company<input name="company" tabIndex={-1} autoComplete="off"
        value={company} onChange={e=>setCompany(e.target.value)}/></label>
      <p className="cf-err" role="alert">{error}</p>
      <button type="submit" className="cf-send" disabled={state==="sending"}>
        {state==="sending"?"Sending…":"Send"}
      </button>
      <p className="cf-hint">No deck, no sales call. A real person replies.</p>
    </form>
  );
}
