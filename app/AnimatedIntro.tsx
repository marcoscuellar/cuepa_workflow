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

// Act 2 shows the promise rather than asserting it: work CUEPA handled, and the
// life it handed back. Alternating the two is the point of the statement above.
const pills=[
  {spot:"p1",text:"Rescheduled your 3pm"},
  {spot:"p4",text:"Don't forget Dad's birthday Sunday"}
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
    <section className="hero2" id="top">
      <img src="/hero-team-workshop.jpg" alt="A small team planning together around a table in a bright open studio, sticky notes on a whiteboard beside them"/>
      <div className="scrim"/>
      <motion.div className="hero2-copy" variants={heroContainer} initial="hidden" animate="show">
        <motion.div className="hero2-note" initial={{opacity:0,y:16,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.6,delay:.9,ease:[0.22,1,0.36,1]}}>
          <div className="hero2-note-top">
            <svg className="hero2-note-mark" viewBox="0 0 100 100" aria-hidden="true"><rect x="14" y="14" width="30" height="72" fill="#fff"/><rect x="56" y="14" width="30" height="72" fill="#0F766E"/></svg>
            <b>CUEPA</b><i>6:15 PM</i>
            <em><span className="hero2-dot" aria-hidden/>Handled</em>
          </div>
          <p><strong>Email from Robert:</strong> &ldquo;Let&rsquo;s push our meeting to 3pm — sound good?&rdquo;</p>
          <p className="hero2-note-done">
            <span className="hero2-check" aria-hidden><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
            Your schedule was open, so I confirmed by email.
          </p>
        </motion.div>
        <motion.p className="eyebrow2" variants={heroChild}>CUEPA FOR WORK · BY ELIPAN GROUP</motion.p>
        <h1 aria-label="Make room for what's next.">
          <motion.span style={{display:"block"}} variants={heroChild}>MAKE ROOM</motion.span>
          <motion.span style={{display:"block"}} variants={heroChild}>FOR WHAT&rsquo;S</motion.span>
          <motion.span style={{display:"block"}} variants={heroChild}><span className="hero2-accent">NEXT.</span></motion.span>
        </h1>
        <motion.p className="lede2" variants={heroChild}><b>Less busywork. More room for bigger things.</b> CUEPA for Work takes the repetitive work off the plate of small-business owners, managers and their teams. You keep the decisions.</motion.p>
        <motion.div className="cta2-group" variants={heroChild}>
          <a href="#conversation" className="cta2">
            <span className="cta2-long">Book a 20-Minute Room Conversation</span>
            <span className="cta2-short">Book a 20-Min Conversation</span>
            <span aria-hidden>↘</span>
          </a>
          <p className="cta2-sub">A real person, 20 minutes, no pitch. We look at where your time goes.</p>
        </motion.div>
      </motion.div>
      <p className="hero2-scroll">SCROLL TO MAKE ROOM</p>
    </section>
    <section ref={realityRef} id="reality" className={`reality ${statsVisible?"is-visible":""}`}>
      <div className="shell reality-shell">
        <div className="reality-lead">
          <div className="reality-stage reality-reveal" style={{"--stat-order":0} as React.CSSProperties}>
            <div className="reality-photo">
              <img src="/reality-market.jpeg" alt="Two women shopping together at an outdoor farmers market"/>
            </div>
            <ul className="reality-pills">
              {pills.map((pill,index)=><li className={`rn-pill ${pill.spot}`} key={pill.spot} style={{"--pill-order":index+1} as React.CSSProperties}>
                <span className="rn-dot" aria-hidden/>{pill.text}
              </li>)}
            </ul>
          </div>
          <h2 className="reality-statement reality-reveal" style={{"--stat-order":1} as React.CSSProperties}>
            <span>CUEPA manages</span>
            <span>the work around you.</span>
            <span>So you can make room</span>
            <span>for <em>those around you</em>.</span>
          </h2>
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
