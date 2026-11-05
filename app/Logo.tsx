// CUEPA logo (Nov 3, 2026): Room Mark + heavy, tight CUEPA in Inter ExtraBold (800, -0.04em).
// Room Mark = 2x2 squares, top-right open, bottom-right square always Teal Mark #0F766E.
// Two versions only: black squares + black CUEPA on light grounds, white squares + white CUEPA on dark grounds.
// Spacing: gap between mark and CUEPA = one square of the mark (`tight` = half a square, small spots only).
// CUEPA cap height = 82% of the mark's height.
// The logo says CUEPA only. The header shows no "by ELIPAN GROUP".
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` adds the small "by ELIPAN GROUP" line under the wordmark (footers only, never the header).
// `offering` is accepted for old call sites and ignored.
const TEAL="#0F766E";
const INTER_CAP=0.727; // Inter cap height / em

export default function Logo({dark=false,size=18,lockup=false,tight=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean;tight?:boolean}){
  const color = dark ? "#030303" : "#FFFFFF";
  const markSize = Math.round(size*1.25);
  const square = markSize*0.45;
  const fontSize = Math.round((markSize*0.82)/INTER_CAP);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:Math.round(tight?square/2:square)}}>
      <svg width={markSize} height={markSize} viewBox="0 0 200 200" aria-hidden="true" style={{flex:"none"}}>
        <rect x="0" y="0" width="90" height="90" fill={color}/>
        <rect x="0" y="110" width="90" height="90" fill={color}/>
        <rect x="110" y="110" width="90" height="90" fill={TEAL}/>
      </svg>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1,color}}>
        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:800,letterSpacing:"-.04em",fontSize,lineHeight:.78,whiteSpace:"nowrap",display:"block"}}>CUEPA</span>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color,opacity:.62,marginTop:Math.round(size*0.35),whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
