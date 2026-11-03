// CUEPA logo (locked Nov 3, 2026): Room Mark + drawn CUEPA wordmark.
// Room Mark = 2x2 squares, top-right open, bottom-right square always Teal Mark #0F766E.
// Two versions only: black squares + black CUEPA on light grounds, white squares + white CUEPA on dark grounds.
// The logo says CUEPA only. The header shows no "by ELIPAN GROUP".
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` adds the small "by ELIPAN GROUP" line under the wordmark (footers only, never the header).
// `offering` is accepted for old call sites and ignored.
const TEAL="#0F766E";

export default function Logo({dark=false,size=18,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const color = dark ? "#030303" : "#FFFFFF";
  const markSize = Math.round(size*1.25);
  const capH = Math.round(markSize*0.82);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:Math.round(markSize*0.65)}}>
      <svg width={markSize} height={markSize} viewBox="0 0 200 200" aria-hidden="true" style={{flex:"none"}}>
        <rect x="0" y="0" width="90" height="90" fill={color}/>
        <rect x="0" y="110" width="90" height="90" fill={color}/>
        <rect x="110" y="110" width="90" height="90" fill={TEAL}/>
      </svg>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1,color}}>
        <svg height={capH} viewBox="0 0 1248 200" aria-label="CUEPA" role="img" style={{display:"block",width:"auto",overflow:"visible"}}>
          <g fill="currentColor" stroke="currentColor"><path d="M160.9,44.1 A80.5,80.5 0 1 0 160.9,155.9" fill="none" strokeWidth="39"/><path d="M294.5,0 V115.0 A65.5,65.5 0 0 0 425.5,115.0 V0" fill="none" strokeWidth="39"/><rect x="545" y="0" width="39" height="200"/><rect x="545" y="0" width="140" height="39"/><rect x="545" y="161" width="144" height="39"/><rect x="605" y="80.5" width="72" height="39"/><rect x="790" y="0" width="39" height="200"/><path d="M809.5,19.5 H870 A44.5,44.5 0 0 1 870,108.5 H809.5" fill="none" strokeWidth="39"/><path fillRule="evenodd" stroke="none" d="M1121.1,0.0 L1162.9,0.0 L1248.0,200.0 L1204.0,200.0 L1190.8,169.0 L1093.2,169.0 L1080.0,200.0 L1036.0,200.0 Z M1142.0,49.1 L1175.1,132.0 L1108.9,132.0 Z"/></g>
        </svg>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color,opacity:.62,marginTop:Math.round(size*0.35),whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
