"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";

const Check=()=> <svg viewBox="0 0 24 24" aria-hidden><path d="m5 12.5 4.2 4.2L19 7"/></svg>;

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
      <img src="/hero-recital.jpg" alt="A father walking onto the field toward his son at an evening football game"/>
      <div className="scrim"/>
      <motion.div className="hero2-copy" variants={heroContainer} initial="hidden" animate="show">
        <motion.p className="eyebrow2" variants={heroChild}>HUMAN-CENTERED INTELLIGENCE</motion.p>
        <h1 aria-label="Making room for what matters.">
          <motion.span style={{display:"block"}} variants={heroChild}>MAKING ROOM</motion.span>
          <motion.span style={{display:"block"}} variants={heroChild}>FOR WHAT</motion.span>
          <motion.span style={{display:"block"}} variants={heroChild}>MATTERS.</motion.span>
        </h1>
        <motion.p className="lede2" variants={heroChild}>CUEPA transforms how work moves—returning time, revealing opportunities, and creating capacity for people and businesses to grow.</motion.p>
        <motion.a href="#reality" className="cta2" variants={heroChild}>See how we create room <span aria-hidden style={{fontSize:18}}>↘</span></motion.a>
      </motion.div>
      <motion.div className="hero2-note" initial={{opacity:0,y:16,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.6,delay:.9,ease:[0.22,1,0.36,1]}}>
        <div className="hero2-note-top"><span className="av2"/><b>CUEPA</b><i>6:15 PM</i><em>DONE</em></div>
        <p>Email from Robert: &ldquo;Let&rsquo;s push our meeting to 3pm — sound good?&rdquo; Your schedule was open, so I confirmed by email.</p>
      </motion.div>
      <p className="hero2-scroll">SCROLL TO MAKE ROOM</p>
    </section>
    <section ref={realityRef} id="reality" className={`reality ${statsVisible?"is-visible":""}`}>
      <div className="shell reality-grid">
        <div className="reality-photo reality-reveal">
          <img src="/reality-market.jpeg" alt="Two women shopping together at an outdoor farmers market"/>
          <div className="signal intro-signal reality-note"><i><Check/></i><span><small>6:47 PM</small>Customer-service chat is installed and already answering. Full transcripts from the product launch will be in your inbox by morning.</span></div>
        </div>
        <div className="reality-quotes">
          {stats.map((stat,index)=><article className="stat-card reality-reveal" key={stat.value} style={{"--stat-order":index+1} as React.CSSProperties}>
            <strong>{stat.value}</strong>
            <blockquote>{stat.quote}</blockquote>
            <cite>— {stat.source}</cite>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}
