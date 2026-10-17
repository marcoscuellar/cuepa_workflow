"use client";
import {useEffect, useState} from "react";

// Phones hide the nav CTA (<560px), so the only way to book was a long scroll to
// the bottom form. This bar appears once the hero has passed and steps aside when
// the form itself is on screen. CSS shows it on narrow screens only.
export default function MobileCta(){
  const [pastHero,setPastHero]=useState(false);
  const [atForm,setAtForm]=useState(false);

  useEffect(()=>{
    const hero=document.getElementById("top");
    const form=document.getElementById("conversation");
    const obs:IntersectionObserver[]=[];
    if(hero){
      const o=new IntersectionObserver(([e])=>setPastHero(!e.isIntersecting),{threshold:0});
      o.observe(hero);obs.push(o);
    }
    if(form){
      const o=new IntersectionObserver(([e])=>setAtForm(e.isIntersecting),{threshold:0});
      o.observe(form);obs.push(o);
    }
    return ()=>obs.forEach(o=>o.disconnect());
  },[]);

  const show=pastHero&&!atForm;
  return (
    <div className={`mcta ${show?"is-on":""}`} aria-hidden={!show}>
      <a href="/contact" data-contact tabIndex={show?0:-1}>Let&rsquo;s make room <span aria-hidden>→</span></a>
    </div>
  );
}
