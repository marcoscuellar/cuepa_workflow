import AnimatedIntro from "./AnimatedIntro";
import Nav from "./Nav";
import PracticeHeader from "./PracticeHeader";
import OwnerControl from "./OwnerControl";
import Testimonial from "./Testimonial";
import Trust from "./Trust";
import Conversation from "./Conversation";
import Logo from "./Logo";
import RoomWorth from "./RoomWorth";
import NextLines from "./NextLines";

export default function Home(){return <main className="site">
  <Nav/>

  {/* Act 1 — Hero (football) + Act 2 — Reality (dark stats): both in AnimatedIntro */}
  <AnimatedIntro/>

  {/* "How much time and money is this costing us?" — the manager's first question */}
  <RoomWorth/>

  {/* Act 3 — The CUEPA Practice: CHIMAL band, how we work, the four turns, the 5 calls */}
  <PracticeHeader/>

  {/* Act 4 — One screen (doorway tagline included at its end) */}
  <OwnerControl/>

  {/* Room Stories — structured proof cards (real quotes; numbers only once measured) */}
  <Testimonial/>

  {/* Act 5 — Trust */}
  <Trust/>

  {/* Act 6 — Ending: conversation + footer */}
  {/* "I want to grow but I'm stuck" — where the room goes */}
  <NextLines/>

  <Conversation/>
  <footer className="site-footer">
    <p className="wordmark"><Logo offering="for Work" lockup dark/></p>
    <p>MAKE ROOM FOR WHAT&rsquo;S NEXT.</p>
    <p className="footer-links">© 2026 CUEPA · <a href="/help">Help</a> · <a href="https://you.makingcuepa.com/">CUEPA for You: AI help for everyday life</a></p>
    <p className="footer-ollin">CUEPA for Work · An ELIPAN GROUP company.</p>
  </footer>
</main>}
