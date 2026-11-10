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
  // Preview toggle: ?hero=light shows the Paper version of the banner overlay.
  const [heroLight,setHeroLight]=useState(false);
  useEffect(()=>{setHeroLight(new URLSearchParams(window.location.search).get("hero")==="light");},[]);

  useEffect(()=>{
    const node=realityRef.current;
    if(!node) return;
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        setStatsVisible(true);
        observer.disconnect();
      }
    },{threshold:.2});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);

  return <>
    {/* Hero (Nov 9, 2026): Salesforce-style centered stack on the faded meeting photo.
        Logo + accent line, subline, two pills, then the CUEPA "Today" window rising inside the band. */}
    <section className={`hero4 ${heroLight?"hero4--paper":"hero4--ink"}`} id="top">
      <div className="hero4-band">
        <div className="hero4-photo" aria-hidden="true"><img src="/hero-meeting.jpg" alt=""/></div>
        <motion.div className="hero4-copy" variants={heroContainer} initial="hidden" animate="show">
          <motion.h1 variants={heroChild} className="hero4-logo" aria-label="CUEPA. Making room for more.">
            <img src={heroLight?"/brand/cuepa-logo-ink.svg":"/brand/cuepa-logo-white.svg"} alt=""/>
            <span className="hero4-tag" aria-hidden="true">Making room <em>for more.</em></span>
          </motion.h1>
          <motion.p variants={heroChild} className="hero4-lede">We take the busywork off your team&rsquo;s plate, so there&rsquo;s room for what&rsquo;s next. You keep the decisions.</motion.p>
          <motion.div variants={heroChild} className="hero4-btns">
            <a href="#conversation" className="hero4-btn hero4-btn-white">
              <span className="cta2-long">Book a 20-Minute Room Conversation</span>
              <span className="cta2-short">Book a 20-Min Conversation</span>
            </a>
            <a href="#method" className="hero4-btn hero4-btn-glass">See the method</a>
          </motion.div>
        </motion.div>
        <motion.div className="hero4-app" initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.5,ease:[0.22,1,0.36,1]}}>
          <div className="hero4-app-bar" aria-hidden="true"><i/><i/><i/><span>app.makingcuepa.com / Today</span></div>
          <div className="hero4-app-body">
            <div className="hero4-app-head">
              <p>Today</p>
              <h2>Here&rsquo;s what needs you.</h2>
            </div>
            <ul className="hero4-app-list">
              <li><b className="t-done">Handled</b><div><strong>Robert moved your meeting to 3pm.</strong><span>Your schedule was open, so CUEPA confirmed by email.</span></div></li>
              <li><b className="t-you">Needs you</b><div><strong>New workflow drafted.</strong><span>Waiting on your final approval before anything goes out.</span></div></li>
              <li><b className="t-draft">Drafted</b><div><strong>Follow-up to this morning&rsquo;s inquiry.</strong><span>Written in your voice. Review and send.</span></div></li>
            </ul>
          </div>
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
