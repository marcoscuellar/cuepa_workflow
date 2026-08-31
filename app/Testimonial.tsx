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

export default function Testimonial(){
  const [index,setIndex]=useState(0);
  const reduce=useReducedMotion();
  const drag=useRef<{x:number;y:number}|null>(null);

  const go=useCallback((next:number)=>{
    setIndex((next%quotes.length+quotes.length)%quotes.length);
  },[]);

  const onKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==="ArrowLeft"){e.preventDefault();go(index-1);}
    if(e.key==="ArrowRight"){e.preventDefault();go(index+1);}
  };

  // Horizontal swipe. Ignore gestures that are mostly vertical so the page can
  // still be scrolled with a finger resting on the carousel.
  const onPointerDown=(e:React.PointerEvent)=>{drag.current={x:e.clientX,y:e.clientY};};
  const onPointerUp=(e:React.PointerEvent)=>{
    const start=drag.current;drag.current=null;
    if(!start) return;
    const dx=e.clientX-start.x, dy=e.clientY-start.y;
    if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)) return;
    go(index+(dx<0?1:-1));
  };

  useEffect(()=>{
    const el=document.getElementById("testimonial-live");
    if(el) el.textContent=`Quote ${index+1} of ${quotes.length}`;
  },[index]);

  return (
    <section className="testimonial-sec">
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
      >
        {/* Every slide stays in one grid cell, so the frame is as tall as the
            longest quote and nothing below it shifts when the slide changes. */}
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
                onClick={()=>go(i)}
                aria-label={`Go to quote ${i+1}`}
                aria-current={i===index}
              />
            ))}
          </div>
          <button type="button" className="tcar-arrow" onClick={()=>go(index-1)} aria-label="Previous quote">
            <span aria-hidden>&#8592;</span>
          </button>
          <button type="button" className="tcar-arrow" onClick={()=>go(index+1)} aria-label="Next quote">
            <span aria-hidden>&#8594;</span>
          </button>
        </div>
      </div>

      <p id="testimonial-live" className="tcar-live" aria-live="polite"/>
    </section>
  );
}
