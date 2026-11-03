// CUEPA logo (locked Nov 2, 2026): the Room Mark + the drawn CUEPA wordmark.
// Room Mark = 2x2 squares with the top-right one open (the room CUEPA makes).
// Wordmark = geometric caps with the E's middle bar floating. The logo says CUEPA only, never "for Work".
// Color rule: mark and lettering share one color. On light grounds both are Teal Mark #0F766E.
// On dark grounds both are white and the bottom-right square turns Teal Mark.
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` adds the small "by ELIPAN GROUP" line under the wordmark.
// `offering` is accepted for old call sites and ignored.
const TEAL="#0F766E";

export default function Logo({dark=false,size=18,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const color = dark ? TEAL : "#FFFFFF";
  const corner = TEAL;
  const capH = Math.round(size*0.82);
  const markSize = lockup ? Math.round(size*1.7) : Math.round(size*1.05);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:Math.round(size*0.6)}}>
      <svg width={markSize} height={markSize} viewBox="0 0 200 200" aria-hidden="true" style={{flex:"none"}}>
        <rect x="0" y="0" width="90" height="90" fill={color}/>
        <rect x="0" y="110" width="90" height="90" fill={color}/>
        <rect x="110" y="110" width="90" height="90" fill={corner}/>
      </svg>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1,color}}>
        <svg height={capH} viewBox="-6 -6 1258 212" aria-label="CUEPA" role="img" style={{display:"block",width:"auto",overflow:"visible"}}>
          <g fill="currentColor" stroke="currentColor" strokeLinecap="butt"><path d="M166.9,42.5 A86,86 0 1 0 166.9,157.5" fill="none" strokeWidth="34"/><path d="M297,0 V115 A68,68 0 0 0 433,115 V0" fill="none" strokeWidth="34"/><rect x="550" y="0" width="34" height="200"/><rect x="550" y="0" width="140" height="34"/><rect x="550" y="166" width="144" height="34"/><rect x="610" y="83.0" width="72" height="34"/><rect x="794" y="0" width="34" height="200"/><path d="M811,17 H874 A45.5,45.5 0 0 1 874,108 H811" fill="none" strokeWidth="34"/><path fillRule="evenodd" stroke="none" d="M1115.79,0 L1166.21,0 L1245.67,200 L1204.79,200 L1190.49,164 L1091.51,164 L1077.21,200 L1036.33,200 Z M1141.00,39.44 L1177.78,132 L1104.22,132 Z"/></g>
        </svg>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color,opacity:.7,marginTop:Math.round(size*0.3),whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
