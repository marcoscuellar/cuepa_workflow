"use client";
import {useState} from "react";

export default function ContactForm({hint="No deck, no sales call. A real person replies."}:{hint?:string}){
  const [email,setEmail]=useState("");
  const [company,setCompany]=useState(""); // honeypot
  const [state,setState]=useState<"idle"|"sending"|"sent">("idle");
  const [error,setError]=useState("");

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setError("");
    setState("sending");
    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,company})
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||"Something went wrong. Please try again.");
      setState("sent");
    }catch(err){
      setError(err instanceof Error?err.message:"Something went wrong. Please try again.");
      setState("idle");
    }
  };

  if(state==="sent") return (
    <div className="capture-sent" role="status">
      <p className="capture-sent-h">Got it.</p>
      <p>We&rsquo;ll come back to you at <strong>{email}</strong>, usually within a day.</p>
    </div>
  );

  return (
    <form className="capture" onSubmit={submit} noValidate>
      <div className="capture-pill">
        <input
          type="email" name="email" required
          autoComplete="email" placeholder="you@company.com"
          aria-label="Your email address"
          value={email} onChange={e=>setEmail(e.target.value)}
        />
        <button type="submit" disabled={state==="sending"}>
          <span aria-hidden>→</span> {state==="sending"?"Sending…":"Start here"}
        </button>
      </div>
      <div className="capture-hp" aria-hidden>
        <label>Company<input type="text" tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)}/></label>
      </div>
      {error ? <p className="capture-error" role="alert">{error}</p> : <p className="capture-hint">{hint}</p>}
    </form>
  );
}
