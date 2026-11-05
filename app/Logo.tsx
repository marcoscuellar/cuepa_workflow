// CUEPA logo (locked Nov 3, 2026, wordmark updated later Nov 3): Room Mark + heavy, tight Inter ExtraBold CUEPA.
// Room Mark = 2x2 squares, top-right open, bottom-right square always Teal Mark #0F766E.
// Mark sits apart from the letters: standard gap = 1 square of the mark.
// Two versions only: black squares + black CUEPA on light grounds, white squares + white CUEPA on dark grounds.
// The logo says CUEPA only. The header shows no "by ELIPAN GROUP".
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` adds the small "by ELIPAN GROUP" line under the wordmark (footers only, never the header).
// `offering` is accepted for old call sites and ignored.
const TEAL="#0F766E";

export default function Logo({dark=false,size=18,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const color = dark ? "#030303" : "#FFFFFF";
  const markSize = Math.round(size*1.25);
  const square = Math.round(markSize*0.45); // one square of the Room Mark
  return (
    <span style={{display:"inline-flex",alignItems:lockup?"flex-start":"center",gap:square}}>
      <svg width={markSize} height={markSize} viewBox="0 0 200 200" aria-hidden="true" style={{flex:"none"}}>
        <rect x="0" y="0" width="90" height="90" fill={color}/>
        <rect x="0" y="110" width="90" height="90" fill={color}/>
        <rect x="110" y="110" width="90" height="90" fill={TEAL}/>
      </svg>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1,color}}>
        <span aria-label="CUEPA" style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:Math.round(markSize*1.12),letterSpacing:"-0.035em",lineHeight:.78,whiteSpace:"nowrap",display:"block"}}>CUEPA</span>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color,opacity:.62,marginTop:Math.round(size*0.45),whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
