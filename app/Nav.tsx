"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";
import Logo from "./Logo";

const items=[
  {key:"room",label:"Making Room",href:"#top",sections:["top","reality"]},
  {key:"how",label:"How it works",href:"#find",sections:["find","flow","prove","grow"]},
  {key:"dashboard",label:"Dashboard",href:"#product",sections:["product"]},
  {key:"trust",label:"Trust",href:"#trust",sections:["trust","conversation"]}
];

export default function Nav(){
  const [active,setActive]=useState("room");
  // The glass is designed against the dark hero photo. Over the light acts below
  // it becomes a grey slab with content showing through, so it goes solid once
  // the hero has passed under it.
  const [solid,setSolid]=useState(false);
  // While a click-scroll is in flight the scroll-spy would briefly re-report the
  // section we're leaving, snapping the pill backwards mid-slide. Ignore the spy
  // until it agrees with the clicked tab (or the scroll has had time to land).
  const clickLock=useRef<{key:string;until:number}|null>(null);

  useEffect(()=>{
    const hero=document.getElementById("top");
    if(!hero) return;
    const io=new IntersectionObserver(([e])=>setSolid(!e.isIntersecting),{rootMargin:"-92px 0px 0px 0px",threshold:0});
    io.observe(hero);
    return ()=>io.disconnect();
  },[]);

  useEffect(()=>{
    const sectionToKey:Record<string,string>={};
    items.forEach(it=>it.sections.forEach(s=>{sectionToKey[s]=it.key;}));
    const ids=Object.keys(sectionToKey);
    const els=ids.map(id=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if(!els.length) return;

    const ratios=new Map<string,number>();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);});
      let bestId="";let bestRatio=0;
      ratios.forEach((r,id)=>{if(r>bestRatio){bestRatio=r;bestId=id;}});
      const nextKey=bestId?sectionToKey[bestId]:"";
      if(!nextKey) return;

      const lock=clickLock.current;
      if(lock){
        if(nextKey===lock.key||performance.now()>lock.until) clickLock.current=null;
        else return;
      }
      setActive(nextKey);
    },{threshold:[0,.15,.3,.5,.75,1],rootMargin:"-92px 0px -40% 0px"});

    els.forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);

  return (
    <nav className={`nav-fixed ${solid?"is-solid":""}`}>
      <a className="brand" href="#top"><Logo/></a>
      <div className="navlinks-tabs">
        {items.map(it=>(
          <a key={it.key} href={it.href} className={`navtab ${active===it.key?"is-active":""}`} onClick={()=>{clickLock.current={key:it.key,until:performance.now()+1500};setActive(it.key);}}>
            {active===it.key && (
              <motion.span
                layoutId="navpill"
                className="navpill"
                transition={{type:"spring",stiffness:420,damping:34}}
              />
            )}
            <span className="navtab-label">{it.label}</span>
          </a>
        ))}
      </div>
      <a href="#conversation" className="nav-cta">Let&rsquo;s make room <span aria-hidden>↗</span></a>
    </nav>
  );
}
