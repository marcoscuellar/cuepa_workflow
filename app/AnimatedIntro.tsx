"use client";
import ReturnMark from "./ReturnMark";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

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

// Hero entrance is pure CSS (.hero4-rise in brand-nov.css): the text is visible in the HTML itself,
// so it shows with JavaScript off or slow, and the animation only runs when motion is allowed.
const rise=(i:number)=>({"--i":i} as React.CSSProperties);

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
    <section id="top" className="hero4 hero4--og bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="hero4-band relative isolate flex min-h-[calc(100svh-24px)] flex-col items-center justify-center overflow-hidden rounded-[20px] px-5 pb-16 pt-[100px] text-white sm:min-h-[calc(100svh-32px)] sm:rounded-3xl sm:px-6 sm:pb-20 sm:pt-[132px]">
        <div className="hero4-photo" aria-hidden="true">
          <Image src="/hero-meeting.jpg" alt="" width={2000} height={1117} sizes="100vw" priority fetchPriority="high"/>
        </div>
        <div className="relative z-[3] flex w-full max-w-4xl flex-col items-center text-center">
          <img style={rise(0)} src="/brand/cuepa-logo-white.svg" alt="CUEPA" width={1127} height={314} fetchPriority="high"
            className="hero4-rise h-auto w-[min(640px,82vw)]"/>
          <h1 style={rise(1)}
            className="hero4-rise hero4-h1 mt-8 text-balance text-4xl font-semibold tracking-tight text-white sm:mt-12 sm:text-5xl lg:mt-14 lg:text-[56px]">
            Making room for more.
          </h1>
          <p style={rise(2)}
            className="hero4-rise hero4-sub mt-5 max-w-[34rem] text-balance text-lg font-medium leading-relaxed text-white/90 sm:mt-6 sm:max-w-[44rem] sm:text-[22px] lg:text-2xl">
            We find where AI creates value, build it into how you work, and measure the results. With people at the center.
          </p>
          <div style={rise(3)}
            className="hero4-rise mt-10 flex w-full flex-col items-center justify-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4">
            <a href="#conversation"
              className="hero4-cta inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-4 text-center text-[15px] font-bold leading-tight shadow-[0_10px_28px_rgba(8,11,15,.3)] transition hover:-translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white sm:w-auto sm:px-7 sm:text-base">
              Book a 20-Minute Room Conversation
            </a>
            <a href="#product"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white/[.16] px-7 text-base font-bold text-white shadow-[0_10px_28px_rgba(8,11,15,.18)] ring-1 ring-inset ring-white/45 backdrop-blur-md transition hover:-translate-y-px hover:bg-white/[.26] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white sm:w-auto">
              See the dashboard
            </a>
          </div>
        </div>
        <a href="#reality" aria-label="Scroll to the next section" className="hero4-cue absolute bottom-6 left-1/2 z-[3] flex h-11 w-11 -translate-x-1/2 items-center justify-center text-white/70 transition hover:text-white sm:bottom-8">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </a>
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
                    <ReturnMark size={14}/>
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
