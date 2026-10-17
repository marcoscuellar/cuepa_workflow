"use client";
import {useEffect, useRef, useState} from "react";
import ContactForm from "./ContactForm";

// Pop-up contact form, like elipangroup.com. Any link marked data-contact opens
// it; without JavaScript those links still go to /contact.
export default function ContactModal(){
  const ref=useRef<HTMLDialogElement>(null);
  const [key,setKey]=useState(0); // fresh form each time it opens

  const close=()=>ref.current?.close();

  useEffect(()=>{
    const onClick=(e:MouseEvent)=>{
      const a=(e.target as HTMLElement|null)?.closest?.("[data-contact]");
      if(!a||!ref.current) return;
      e.preventDefault();
      if(!ref.current.open){setKey(k=>k+1);ref.current.showModal();}
    };
    document.addEventListener("click",onClick);
    return ()=>document.removeEventListener("click",onClick);
  },[]);

  return (
    <dialog ref={ref} className="cm" aria-labelledby="cm-title"
      onClick={e=>{if(e.target===ref.current) close();}}>
      <div className="cm-card">
        <button type="button" className="cm-x" aria-label="Close" onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <p className="cm-eyebrow">Room Conversation</p>
        <h2 id="cm-title">LET&rsquo;S MAKE ROOM.</h2>
        <ContactForm key={key} tone="light" onClose={close}/>
      </div>
    </dialog>
  );
}
