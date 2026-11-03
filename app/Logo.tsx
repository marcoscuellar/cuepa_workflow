// Two-block mark + wordmark. `offering` adds the offering name ("for Work");
// `lockup` adds the small "by ELIPAN GROUP" line under the wordmark, and the
// mark grows to span both lines (Brand Book: CUEPA by ELIPAN GROUP lockup).
// Block 2 is Teal Mark #0F766E on every background (Brand Book, Oct 31 2026).
export default function Logo({dark=false,size=18,offering,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const blockA = dark ? "#030303" : "#fff";
  const ink = dark ? "#030303" : "#fff";
  const markSize = lockup ? Math.round(size*1.7) : size;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
      <svg width={markSize} height={markSize} viewBox="0 0 100 100" aria-hidden="true">
        <rect x="14" y="14" width="30" height="72" fill={blockA}/>
        <rect x="56" y="14" width="30" height="72" fill="#0F766E"/>
      </svg>
      <span style={{display:"inline-flex",flexDirection:"column",lineHeight:1}}>
        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:size*0.78,letterSpacing:".02em",color:ink,whiteSpace:"nowrap"}}>
          CUEPA{offering && <span style={{fontWeight:500,letterSpacing:0,marginLeft:".35em"}}>{offering}</span>}
        </span>
        {lockup && <span style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:Math.max(8,size*0.4),letterSpacing:".16em",textTransform:"uppercase",color:ink,opacity:.62,marginTop:4,whiteSpace:"nowrap"}}>by ELIPAN GROUP</span>}
      </span>
    </span>
  );
}
