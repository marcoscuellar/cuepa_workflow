// CUEPA Four Turns mark + spaced wordmark (logo system v1, Nov 2 2026).
// Four blocks (Find, Flow, Prove, Grow) turn around an open room; the teal
// square in the middle is the person — Human in the Middle. Teal Mark #0F766E
// on every background. Wordmark: Inter SemiBold, tracked wide (+34%).
// `dark` = dark-colored logo for light grounds. `offering` adds a hairline and
// the offering name ("for Work"). `lockup` adds "by ELIPAN GROUP" underneath.
export function CuepaMark({size=18,color="#fff",center="#0F766E"}:{size?:number;color?:string;center?:string}){
  return (
    <svg width={size} height={size} viewBox="-5 -5 100 100" aria-hidden="true" style={{flex:"none"}}>
      <rect x="1.5" y="1.5" width="57" height="27" fill={color}/>
      <rect x="61.5" y="1.5" width="27" height="57" fill={color}/>
      <rect x="31.5" y="61.5" width="57" height="27" fill={color}/>
      <rect x="1.5" y="31.5" width="27" height="57" fill={color}/>
      <rect x="36" y="36" width="18" height="18" fill={center}/>
    </svg>
  );
}

export default function Logo({dark=false,size=18,offering,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const ink = dark ? "#030303" : "#fff";
  const rule = dark ? "rgba(3,3,3,.22)" : "rgba(255,255,255,.32)";
  const markSize = lockup ? Math.round(size*1.5) : Math.round(size*1.1);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:size*0.6}}>
      <CuepaMark size={markSize} color={ink}/>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1}}>
        <span style={{display:"inline-flex",alignItems:"center",fontFamily:"'Inter',sans-serif",fontSize:size*0.78,color:ink,whiteSpace:"nowrap"}}>
          <span style={{fontWeight:600,letterSpacing:".34em",marginRight:"-.34em"}}>CUEPA</span>
          {offering && <>
            <span aria-hidden="true" style={{width:1,height:"1.15em",background:rule,margin:"0 .7em 0 .95em"}}/>
            <span style={{fontWeight:500,letterSpacing:".01em",opacity:.82}}>{offering}</span>
          </>}
        </span>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color:ink,opacity:.62,marginTop:5,whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
