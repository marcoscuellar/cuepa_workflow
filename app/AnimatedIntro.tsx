"use client";
import ReturnMark from "./ReturnMark";

import Image from "next/image";
import AnimatedLogo from "./AnimatedLogo";
import {useEffect, useRef, useState} from "react";

// External research findings (not CUEPA client results). Wording follows what each source reports.
// SOURCE VERIFICATION STATUS (Nov 2026): the figures and wording were cross-checked through search-result
// summaries of each publisher's material. The publishers' own pages (asana.com, edelman.com, businesswire.com)
// were NOT opened or fully verified, and the 21x link is a third-party-hosted copy of the 2007 study summary,
// not the original publisher. Re-check all three links against the originals before treating them as confirmed.
const stats=[
  {
    value:"58%",
    claim:"Knowledge workers reported spending 58% of their workday on work coordination rather than skilled work.",
    take:"That’s time your people could spend on the work only they can do.",
    org:"Asana",title:"Anatomy of Work Global Index",year:"2023",
    href:"https://www.businesswire.com/news/home/20230308005268/en/Asana-Anatomy-of-Work-Global-Index-2023"
  },
  {
    value:"32%",
    claim:"U.S. respondents reported trusting AI.",
    take:"Trust grows when people understand how AI works and where it belongs.",
    org:"",title:"Edelman Trust Barometer Flash Poll",year:"2025",
    href:"https://www.edelman.com/sites/g/files/aatuss191/files/2025-11/2025%20Edelman%20Trust%20Barometer%20Flash%20Poll%20Trust%20and%20Artificial%20Intelligence%20at%20a%20Crossroads%201.pdf"
  },
  {
    value:"21×",
    claim:"In a study of web-generated leads, the odds of qualifying a lead by phone were 21× higher when it was contacted within 5 minutes rather than 30.",
    take:"Timely action can make a meaningful difference.",
    org:"InsideSales.com / MIT",title:"Lead Response Management Study",year:"2007",
    href:"https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf"
  }
];

// Act 2 shows the promise rather than asserting it: CUEPA does routine work on its own inside the limits
// you set; what falls outside those limits is held for a person. Labelled as an example (illustrative only).
// Same see-through notification treatment as The CUEPA Practice photos.
const notes=[
  {time:"1:36 PM",tag:"Confirmed",body:"Rescheduled your 3pm. Your calendar was open."},
  {time:"4:10 PM",tag:"Needs you",body:"Outside your set limits. Held for your review."}
];

// Hero entrance is pure CSS (.hero4-rise in brand-nov.css): the text is visible in the HTML itself,
// so it shows with JavaScript off or slow, and the animation only runs when motion is allowed.
const rise=(i:number)=>({"--i":i} as React.CSSProperties);

export default function AnimatedIntro(){
  const realityRef=useRef<HTMLElement>(null);
  const [statsVisible,setStatsVisible]=useState(false);
  // "armed" = JavaScript is running and the section is still below the fold, so it may start hidden and fade in.
  // Without JavaScript (or if the script is slow or fails) the section is simply visible: see brand-nov.css.
  const [armed,setArmed]=useState(false);

  useEffect(()=>{
    const node=realityRef.current;
    if(!node) return;
    // Already on screen (or scrolled past, e.g. after a reload mid-page): never hide it.
    if(typeof IntersectionObserver==="undefined"||node.getBoundingClientRect().top<window.innerHeight*0.94){
      setStatsVisible(true);
      return;
    }
    setArmed(true);
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
        <div className="hero4-glow hero4-glow--a" aria-hidden="true"/>
        <div className="hero4-glow hero4-glow--b" aria-hidden="true"/>
        <div className="relative z-[3] flex w-full max-w-4xl flex-col items-center text-center">
          <AnimatedLogo className="h-auto w-[min(640px,82vw)]"/>
          <h1 style={rise(5)}
            className="hero4-rise hero4-h1 mt-8 text-balance text-4xl font-semibold tracking-tight text-white sm:mt-12 sm:text-5xl lg:mt-14 lg:text-[56px]">
            Making room for more.
          </h1>
          <p style={rise(6)}
            className="hero4-rise hero4-sub mt-5 max-w-[34rem] text-balance text-lg font-medium leading-relaxed text-white sm:mt-6 sm:max-w-[44rem] sm:text-[22px] lg:text-2xl">
            We find where AI creates value and put it to work inside your operations, so your people can focus on what matters. With people at the center.
          </p>
          <div style={rise(7)}
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
    <section ref={realityRef} id="reality" aria-labelledby="reality-title"
      className={`reality ${armed?"is-armed":""} ${statsVisible?"is-visible":""}`}>
      <div className="shell reality-shell">
        <div className="reality-lead">
          {/* Copy comes first in the source (reads first for everyone, and is first on phones);
              on desktop CSS puts the photo on the left. */}
          <div className="reality-copy reality-reveal" style={{"--stat-order":0} as React.CSSProperties}>
          <p className="reality-eyebrow">The reality</p>
          <h2 id="reality-title" className="reality-statement">
            <span>Real workflows. </span>
            <span>Real people. </span>
            <span><em>Real outcomes.</em></span>
          </h2>
          <p className="reality-sub">The friction isn&rsquo;t always the work itself. It&rsquo;s the handoffs, follow-ups, and back-and-forth that surround it. We start by understanding how your people work, then find where AI can make a meaningful difference.</p>
          </div>
          <div className="reality-stage reality-reveal" style={{"--stat-order":1} as React.CSSProperties}>
            <div className="reality-photo">
              <Image src="/convo-team-coffee.jpg" alt="Three teammates laughing together over coffee in the office kitchen"
                width={1536} height={1024} sizes="(max-width: 900px) 100vw, 45vw"/>
              <span className="reality-example">Example</span>
              <ul className="pr-notes reality-notes" aria-label="Example CUEPA notifications (illustrative only)">
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
        </div>
        <div className="reality-quotes">
          {stats.map((stat,index)=><figure className="stat-card reality-reveal" key={stat.value} style={{"--stat-order":index+2} as React.CSSProperties}>
            <strong>{stat.value}</strong>
            <p className="stat-claim">{stat.claim}</p>
            <p className="stat-take">{stat.take}</p>
            <figcaption className="stat-source">
              Source: {stat.org?`${stat.org}, `:""}<cite><a href={stat.href} target="_blank" rel="noopener noreferrer">{stat.title}<span className="sr-only"> (opens in a new tab)</span></a></cite>, {stat.year}
            </figcaption>
          </figure>)}
        </div>
        <p className="reality-note reality-reveal" style={{"--stat-order":5} as React.CSSProperties}>Independent research findings, not CUEPA client results.</p>
        <div className="reality-next reality-reveal" style={{"--stat-order":6} as React.CSSProperties}>
          <p>Here&rsquo;s how we make that room.</p>
          <a href="#where-ai">See where AI meets the work <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>
  </>;
}
