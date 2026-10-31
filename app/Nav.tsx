"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";
import Logo from "./Logo";

const items=[
  {key:"room",label:"Making room",href:"#top",sections:["top","reality","worth"]},
  {key:"how",label:"How it works",href:"#find",sections:["find","flow","prove","grow"]},
  {key:"dashboard",label:"Dashboard",href:"#product",sections:["product"]},
  {key:"trust",label:"Trust",href:"#trust",sections:["trust","next","conversation"]},
  {key:"help",label:"Help",href:"/help",sections:[]}
];

// `current` is set on pages other than the home page (e.g. "help"): that tab
// shows as active, and the section links point back to the home page.
export default function Nav({current}:{current?:string}={}){
  const link=(href:string)=>current&&href.startsWith("#")?`/${href}`:href;
  const [active,setActive]=useState(current??"room");
  // Below 900px the tabs are hidden, so without this there is no way to reach
  // any section from a phone.
  const [open,setOpen]=useState(false);
  // While a click-scroll is in flight the scroll-spy would briefly re-report the
  // section we're leaving, snapping the pill backwards mid-slide. Ignore the spy
  // until it agrees with the clicked tab (or the scroll has had time to land).
  const clickLock=useRef<{key:string;until:number}|null>(null);

  useEffect(()=>{
    if(!open) return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape") setOpen(false);};
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    window.addEventListener("keydown",onKey);
    return ()=>{document.body.style.overflow=prev;window.removeEventListener("keydown",onKey);};
  },[open]);

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
    <><nav className={`nav-fixed ${open?"is-open":""}`}>
      <a className="brand" href={link("#top")} aria-label="CUEPA for Work by ELIPAN GROUP"><Logo offering="for Work" lockup dark/></a>
      <div className="navlinks-tabs">
        {items.map(it=>(
          <a key={it.key} href={link(it.href)} className={`navtab ${active===it.key?"is-active":""}`} onClick={()=>{clickLock.current={key:it.key,until:performance.now()+1500};setActive(it.key);}}>
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
      <a href="/contact" className="nav-cta">Book a 20-Min Conversation</a>
      <button
        type="button"
        className={`nav-burger ${open?"is-open":""}`}
        aria-label={open?"Close menu":"Open menu"}
        aria-expanded={open}
        aria-controls="nav-drawer"
        onClick={()=>setOpen(v=>!v)}
      ><span/><span/></button>
    </nav>
    <div id="nav-drawer" className={`nav-drawer ${open?"is-open":""}`} hidden={!open}>
      {items.map(it=>(
        <a key={it.key} href={link(it.href)} className={`nav-drawer-link ${active===it.key?"is-active":""}`}
           onClick={()=>{clickLock.current={key:it.key,until:performance.now()+1500};setActive(it.key);setOpen(false);}}>
          {it.label}
        </a>
      ))}
      <a href="/contact" className="nav-drawer-cta" onClick={()=>setOpen(false)}>Book a 20-Min Conversation</a>
    </div></>
  );
}
