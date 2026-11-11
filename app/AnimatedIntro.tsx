"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";

const stats=[
  {
    value:"50–60%",
    quote:"Knowledge workers can spend 50–60% of their time coordinating work rather than doing skilled work.",
    source:"Asana, Anatomy of Work"
  },
  {
    value:"32%",
    quote:"In the U.S., just 32% of people say they trust AI.",
    source:"2025 Edelman Trust Barometer"
  },
  {
    value:"21×",
    quote:"Respond to a new lead in 5 minutes instead of 30 and you're up to 21× more likely to qualify it.",
    source:"MIT / Lead Response Management Study"
  }
];

// Act 2 shows the promise rather than asserting it: CUEPA carries the work, a person approves.
// Same see-through notification treatment as The CUEPA Practice photos.
const notes=[
  {time:"1:36 PM",tag:"Confirmed",body:"Rescheduled your 3pm. Your calendar was open."},
  {time:"4:10 PM",tag:"Needs you",body:"New workflow drafted, waiting on your final approval."}
];

const heroContainer={
  hidden:{opacity:1},
  show:{opacity:1,transition:{staggerChildren:.14,delayChildren:.1}}
};
const heroChild={
  hidden:{opacity:0,y:26,filter:"blur(8px)"},
  show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.7,ease:[0.22,1,0.36,1]}}
};

export default function AnimatedIntro(){
  const realityRef=useRef<HTMLElement>(null);
  const [statsVisible,setStatsVisible]=useState(false);


  useEffect(()=>{
    const node=realityRef.current;
    if(!node) return;
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        setStatsVisible(true);
        observer.disconnect();
      }
    },{threshold:0,rootMargin:"0px 0px -6% 0px"});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);

  return <>
    {/* Hero (Nov 9, 2026) — enterprise hierarchy.
        The nav owns the logo. Here: H1 focal point -> subhead -> two CTAs ->
        Operations Overview peeking above the fold. Photo + banner overlay live in brand-nov.css (.hero4). */}
    <section id="top" className="hero4 hero4--ink bg-white px-3 pt-20 sm:px-4 sm:pt-[88px]">
      <div className="hero4-band relative isolate flex flex-col items-center overflow-hidden rounded-[20px] px-4 pt-12 text-white sm:rounded-3xl sm:px-6 sm:pt-16 lg:pt-20">
        <div className="hero4-photo" aria-hidden="true"><img src="/hero-meeting.jpg" alt=""/></div>

        <motion.div variants={heroContainer} initial="hidden" animate="show"
          className="relative z-[3] flex max-w-4xl flex-col items-center text-center">
          <motion.p variants={heroChild}
            className="mb-5 text-balance text-sm font-semibold tracking-wide text-white/90 sm:text-base">
            <span aria-hidden="true" className="mr-2.5 inline-block h-2 w-2 -translate-y-px rounded-full align-middle bg-[#2DD4BF] shadow-[0_0_8px_2px_rgba(45,212,191,.75),0_0_20px_4px_rgba(45,212,191,.35)]"/>
            Human-governed AI workflows for growing businesses
          </motion.p>
          <motion.h1 variants={heroChild}
            className="hero4-h1 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Making room for more.
          </motion.h1>
          <motion.p variants={heroChild}
            className="hero4-sub mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            We take the busywork off your team&rsquo;s plate, so there&rsquo;s room for what&rsquo;s next. You keep the decisions.
          </motion.p>
          <motion.div variants={heroChild}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a href="#conversation"
              className="hero4-cta inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-7 text-base font-bold text-[#080B0F] shadow-[0_10px_28px_rgba(8,11,15,.3)] transition hover:-translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white sm:w-auto">
              <span className="hidden sm:inline">Book a 20-Minute Room Conversation</span>
              <span className="sm:hidden">Book a 20-Min Conversation</span>
            </a>
            <a href="#method"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white/15 px-7 text-base font-bold text-white shadow-[0_10px_28px_rgba(8,11,15,.18)] backdrop-blur-md transition hover:-translate-y-px hover:bg-white/25 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white sm:w-auto">
              See the method
            </a>
          </motion.div>
        </motion.div>

        {/* Operations Overview — peeks above the fold */}
        <motion.div initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.5,ease:[0.22,1,0.36,1]}}
          className="relative z-[3] mt-12 w-full max-w-[1080px] max-sm:h-[190px] max-sm:overflow-hidden rounded-t-[22px] bg-white/20 px-3 pt-3 shadow-[0_-10px_60px_rgba(8,11,15,.35)] backdrop-blur-xl sm:mt-14">
          <div className="flex items-center gap-[7px] px-2 pb-3 pt-1" aria-hidden="true">
            <i className="h-[11px] w-[11px] rounded-full bg-white/70"/><i className="h-[11px] w-[11px] rounded-full bg-white/70"/><i className="h-[11px] w-[11px] rounded-full bg-white/70"/>
            <span className="ml-3 truncate text-[13px] font-medium text-white/85"><span className="hidden sm:inline">app.makingcuepa.com / </span>Operations Overview</span>
          </div>
          <picture>
            <source media="(max-width: 639px)" srcSet="/hero-operations-overview-phone.jpg" width={786} height={1572}/>
            <img src="/hero-operations-overview.png" width={1225} height={887}
              alt="CUEPA Operations Overview: Capacity and ROI, the Decision Station approval feed, and Live Engine Activity (demo with sample data)"
              className="block h-auto w-full rounded-t-[14px] bg-white"/>
          </picture>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080B0F]/80 to-transparent sm:hidden"/>
        </motion.div>
      </div>
    </section>
    <section ref={realityRef} id="reality" className={`reality ${statsVisible?"is-visible":""}`}>
      <div className="shell reality-shell">
        <div className="reality-lead">
          <div className="reality-stage reality-reveal" style={{"--stat-order":0} as React.CSSProperties}>
            <div className="reality-photo">
              <img src="/convo-team-coffee.jpg" alt="Three teammates laughing together over coffee in the office kitchen"/>
              <ul className="pr-notes reality-notes" aria-label="CUEPA notifications">
                {notes.map((n,index)=><li className="pr-note" key={n.tag} style={{"--note-order":index} as React.CSSProperties}>
                  <span className="pr-note-top">
                    <svg width={14} height={14} viewBox="-456 -2695 3900 3900" aria-hidden="true" style={{fill:"none",stroke:"none"}}><rect x="-456" y="-2695" width="3900" height="3900" rx="858" fill="#080B0F"/><path d="M764 24C1145 24 1414 -208 1456 -560H1037C1011 -420 915 -336 772 -336C569 -336 460 -484 460 -744C460 -1005 570 -1154 772 -1154C915 -1154 1012 -1069 1037 -928H1456C1415 -1280 1145 -1514 764 -1514C357 -1514 40 -1242 40 -744C40 -250 357 24 764 24Z" fill="#FFFFFF"/><rect x="1760" y="-266" width="1188" height="266" fill="#2DD4BF"/></svg>
                    CUEPA <em>· {n.time}</em><span className="pr-tag"><i aria-hidden="true"/>{n.tag}</span>
                  </span>
                  <span className="pr-note-body">{n.body}</span>
                </li>)}
              </ul>
            </div>
          </div>
          <div className="reality-copy reality-reveal" style={{"--stat-order":1} as React.CSSProperties}>
          <p className="reality-eyebrow">The reality</p>
          <h2 className="reality-statement">
            <span>Real workflows. </span>
            <span>Real people. </span>
            <span><em>Real outcomes.</em></span>
          </h2>
          <p className="reality-sub">We see AI through the work your team actually does, so it solves a real problem instead of adding one.</p>
          </div>
        </div>
        <div className="reality-quotes">
          {stats.map((stat,index)=><article className="stat-card reality-reveal" key={stat.value} style={{"--stat-order":index+2} as React.CSSProperties}>
            <strong>{stat.value}</strong>
            <blockquote>{stat.quote}</blockquote>
            <cite>— {stat.source}</cite>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}
