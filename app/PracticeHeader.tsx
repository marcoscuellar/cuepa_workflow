import HowItWorks from "./HowItWorks";

// CHIMAL band + the "How it works" mental model (replaces "One line. Four turns.").
export default function PracticeHeader(){return (
  <>
    <div className="chimal-band">
      <span>CHIMAL</span><b>PROTECT</b><i>·</i><b>CHALLENGE</b><i>·</i><b>VERIFY</b>
      <span>HUMAN IN THE MIDDLE</span>
    </div>
    <HowItWorks/>
  </>
)}
