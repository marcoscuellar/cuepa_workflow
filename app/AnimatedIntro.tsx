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
    },{threshold:.2});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);

  return <>
    {/* Hero (Nov 9, 2026): the brand book's Ground Ink band. Copy left, the workshop photo right. */}
    <section className="hero3" id="top">
      <div className="hero3-band">
        <motion.div className="hero3-copy" variants={heroContainer} initial="hidden" animate="show">
          <motion.p className="hero3-eyebrow" variants={heroChild}>CUEPA · By ELIPAN GROUP</motion.p>
          <motion.h1 className="hero3-title" variants={heroChild} aria-label="Make room for what's next."><span>Make room</span><span>for what&rsquo;s</span><span className="hero3-next">next.</span></motion.h1>
          <motion.p className="hero3-lede" variants={heroChild}><b>Less busywork. More room for bigger things.</b> CUEPA takes the repetitive work off the plate of small-business owners, managers and their teams. You keep the decisions.</motion.p>
          <motion.div className="hero3-btns" variants={heroChild}>
            <a href="#conversation" className="hero3-btn hero3-btn-primary">
              <span className="cta2-long">Book a 20-Minute Room Conversation</span>
              <span className="cta2-short">Book a 20-Min Conversation</span>
              <span aria-hidden>&rarr;</span>
            </a>
            <a href="#method" className="hero3-btn hero3-btn-dark">See the method</a>
          </motion.div>
          <motion.p className="hero3-sub" variants={heroChild}>A real person, 20 minutes, no pitch. We look at where your time goes.</motion.p>
        </motion.div>
        <motion.div className="hero3-media" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.3,ease:[0.22,1,0.36,1]}}>
          <img src="/hero-team-workshop.jpg" alt="A small team planning together around a table in a bright open studio, sticky notes on a whiteboard beside them"/>
          <motion.div className="hero3-note" initial={{opacity:0,y:16,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.6,delay:1,ease:[0.22,1,0.36,1]}}>
            <div className="hero3-note-top">
              <svg width={16} height={16} viewBox="-456 -2695 3900 3900" aria-hidden="true" style={{fill:"none",stroke:"none",flex:"none"}}><rect x="-456" y="-2695" width="3900" height="3900" rx="858" fill="#151A20"/><path d="M764 24C1145 24 1414 -208 1456 -560H1037C1011 -420 915 -336 772 -336C569 -336 460 -484 460 -744C460 -1005 570 -1154 772 -1154C915 -1154 1012 -1069 1037 -928H1456C1415 -1280 1145 -1514 764 -1514C357 -1514 40 -1242 40 -744C40 -250 357 24 764 24Z" fill="#FFFFFF"/><rect x="1760" y="-266" width="1188" height="266" fill="#2DD4BF"/></svg>
              <b>CUEPA</b><i>6:15 PM</i>
              <em><span className="hero3-live" aria-hidden/>Handled</em>
            </div>
            <p><strong>Email from Robert:</strong> &ldquo;Let&rsquo;s push our meeting to 3pm. Sound good?&rdquo;</p>
            <p className="hero3-note-done"><span aria-hidden className="hero3-check">&#10003;</span>Your schedule was open, so I confirmed by email.</p>
          </motion.div>
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
