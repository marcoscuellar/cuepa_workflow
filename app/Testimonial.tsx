"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {motion, useReducedMotion} from "motion/react";

const quotes=[
  {
    text:"He didn’t make us feel incompetent — he knew AI, very well. Gave us a quick demo and was prompt with following up. He heard me, and his demo was exactly what I have been hoping to do but had no idea where to start. We are very glad to make room with him and his team.",
    who:"Small Business Owner"
  },
  {
    text:"He’s a straight shooter — he won’t shy away from what’s needed.",
    who:"Small Business Owner"
  },
  {
    text:"“A rule, ‘because we have always done it,’ is what is letting your competition eat your lunch” — when I heard Marcos say that, I knew he meant business. He came up with some great time-saving capabilities.",
    who:"Nonprofit Director"
  }
];

// Long quotes hold longer. Roughly reading speed, floored so the short quote
// doesn't flash past and capped so the longest doesn't stall the section.
const dwellFor=(text:string)=>Math.min(12000,Math.max(6000,text.length*55));

export default function Testimonial(){
  const [index,setIndex]=useState(0);
  const [inView,setInView]=useState(false);
  const [hovered,setHovered]=useState(false);
  // Once the reader drives it themselves, autoplay stops for good rather than
  // yanking the slide out from under them mid-read.
  const [tookOver,setTookOver]=useState(false);
  const reduce=useReducedMotion();
  const sectionRef=useRef<HTMLElement>(null);
  const drag=useRef<{x:number;y:number}|null>(null);

  const go=useCallback((next:number)=>{
    setIndex((next%quotes.length+quotes.length)%quotes.length);
  },[]);
  const userGo=useCallback((next:number)=>{setTookOver(true);go(next);},[go]);

  // Only run while the section is actually on screen.
  useEffect(()=>{
    const node=sectionRef.current;
    if(!node) return;
    const io=new IntersectionObserver(([e])=>setInView(e.isIntersecting),{threshold:.35});
    io.observe(node);
    return ()=>io.disconnect();
  },[]);

  useEffect(()=>{
    if(reduce||tookOver||hovered||!inView) return;
    const id=window.setTimeout(()=>go(index+1),dwellFor(quotes[index].text));
    return ()=>window.clearTimeout(id);
  },[index,reduce,tookOver,hovered,inView,go]);

  const onKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==="ArrowLeft"){e.preventDefault();userGo(index-1);}
    if(e.key==="ArrowRight"){e.preventDefault();userGo(index+1);}
  };

  // Horizontal swipe. Ignore gestures that are mostly vertical so the page can
  // still be scrolled with a finger resting on the carousel.
  const onPointerDown=(e:React.PointerEvent)=>{drag.current={x:e.clientX,y:e.clientY};};
  const onPointerUp=(e:React.PointerEvent)=>{
    const start=drag.current;drag.current=null;
    if(!start) return;
    const dx=e.clientX-start.x, dy=e.clientY-start.y;
    if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)) return;
    userGo(index+(dx<0?1:-1));
  };

  return (
    <section className="testimonial-sec" ref={sectionRef}>
      <p className="rm-eyebrow">FROM ROOM CONVERSATIONS, THIS WEEK</p>

      <div
        className="tcar"
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
        onFocus={()=>setHovered(true)}
        onBlur={()=>setHovered(false)}
      >
        {/* Every slide stays in one grid cell, so the frame is as tall as the
            longest quote and the controls never move between slides. */}
        <div className="tcar-track">
          {quotes.map((q,i)=>{
            const offset=i-index;
            return (
              <motion.blockquote
                key={i}
                className="tcar-slide"
                aria-hidden={i!==index}
                initial={false}
                animate={{
                  opacity:i===index?1:0,
                  x:reduce?0:offset*48
                }}
                transition={reduce?{duration:0}:{duration:.5,ease:[0.22,1,0.36,1]}}
                style={{pointerEvents:i===index?"auto":"none"}}
              >
                <span className="testimonial-mark" aria-hidden>&ldquo;</span>
                {q.text}
                <cite className="testimonial-cite">&mdash; {q.who}</cite>
              </motion.blockquote>
            );
          })}
        </div>

        <div className="tcar-controls">
          <div className="tcar-dots">
            {quotes.map((_,i)=>(
              <button
                key={i}
                type="button"
                className={`tcar-dot ${i===index?"is-on":""}`}
                onClick={()=>userGo(i)}
                aria-label={`Go to quote ${i+1}`}
                aria-current={i===index}
              />
            ))}
          </div>
          <button type="button" className="tcar-arrow" onClick={()=>userGo(index-1)} aria-label="Previous quote">
            <span aria-hidden>&#8592;</span>
          </button>
          <button type="button" className="tcar-arrow" onClick={()=>userGo(index+1)} aria-label="Next quote">
            <span aria-hidden>&#8594;</span>
          </button>
        </div>
      </div>

      {/* Silent while it's cycling on its own; announces once the reader is driving. */}
      <p className="tcar-live" aria-live={tookOver?"polite":"off"}>
        {tookOver?`Quote ${index+1} of ${quotes.length}`:""}
      </p>
    </section>
  );
}
