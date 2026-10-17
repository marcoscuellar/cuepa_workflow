import AnimatedIntro from "./AnimatedIntro";
import Nav from "./Nav";
import PracticeHeader from "./PracticeHeader";
import RoomMap from "./RoomMap";
import Flow from "./Flow";
import Prove from "./Prove";
import Grow from "./Grow";
import OwnerControl from "./OwnerControl";
import Testimonial from "./Testimonial";
import Trust from "./Trust";
import Conversation from "./Conversation";
import SiteFooter from "./SiteFooter";
import MobileCta from "./MobileCta";
import ContactModal from "./ContactModal";

export default function Home(){return <main>
  <Nav/>

  {/* Act 1 — Hero (football) + Act 2 — Reality (dark stats): both in AnimatedIntro */}
  <AnimatedIntro/>

  {/* Act 3 — Four turns */}
  <PracticeHeader/>
  <RoomMap/>
  <Flow/>
  <Prove/>
  <Grow/>

  {/* Act 4 — One screen (doorway tagline included at its end) */}
  <OwnerControl/>

  {/* Real client testimonial — data proof → human proof → trust */}
  <Testimonial/>

  {/* Act 5 — Trust */}
  <Trust/>

  {/* Act 6 — Ending: conversation + footer */}
  <Conversation/>
  <SiteFooter/>
  <MobileCta/>
  <ContactModal/>
</main>}
