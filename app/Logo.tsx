// CUEPA logo "CUEPA_" (Nov 8, 2026; supersedes the Room Mark and the "CUEPA." dot logo).
// Wordmark + one solid bar after the A. The bar is the blank in "Making room for ___".
// Letters: Helvetica Now Display Black (paths here are the brand book's stand-in until that file is in).
// Colors follow the brand book's approved versions:
//   on light (dark=true)  → version 6 · White + Secondary Teal: letters #080B0F, bar #0F766E
//   on dark  (dark=false) → version 1 · Ink + Bright Signal:   letters #FFFFFF, bar #2DD4BF
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` = "With tagline" lockup (site footer): "Making room for more." ending under the bar,
//            plus the small "By ELIPAN GROUP" line. Never in the header.
// `offering` is accepted for old call sites and ignored.

const WORDMARK="M764 24C1145 24 1414 -208 1456 -560H1037C1011 -420 915 -336 772 -336C569 -336 460 -484 460 -744C460 -1005 570 -1154 772 -1154C915 -1154 1012 -1069 1037 -928H1456C1415 -1280 1145 -1514 764 -1514C357 -1514 40 -1242 40 -744C40 -250 357 24 764 24ZM2216 24C2605 24 2858 -194 2858 -530V-1490H2454V-564C2454 -425 2356 -326 2216 -326C2078 -326 1978 -426 1978 -564V-1490H1574V-530C1574 -193 1826 24 2216 24ZM3018 0H4172V-352H3434V-574H4115V-914H3434V-1138H4172V-1490H3018ZM4312 0H4728V-450H4945C5301 -450 5524 -651 5524 -970C5524 -1289 5301 -1490 4945 -1490H4312ZM4728 -792V-1148H4914C5039 -1148 5118 -1079 5118 -970C5118 -861 5039 -792 4914 -792ZM5373 0H5828L5901 -245H6399L6470 0H6938L6433 -1490H5873ZM5997 -565 6001 -578C6055 -758 6105 -932 6154 -1113C6202 -932 6251 -758 6303 -578L6307 -565Z";
const RATIO=8352/1538;

export default function Logo({dark=false,size=18,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const letters = dark ? "#080B0F" : "#FFFFFF";
  const bar = dark ? "#0F766E" : "#2DD4BF";
  const byColor = dark ? "#5E6670" : "#9AA4A4";
  const h = Math.round(size*1.15);           // wordmark height in px
  const w = Math.round(h*RATIO);             // wordmark width in px
  return (
    <span role="img" aria-label={lockup?"CUEPA_ Making room for more. By ELIPAN GROUP":"CUEPA"}
      style={{display:"inline-grid",justifyItems:"end",lineHeight:1,width:w,fontFamily:"'Inter',sans-serif"}}>
      <svg width={w} height={h} viewBox="40 -1514 8352 1538" aria-hidden="true" style={{display:"block",width:w,height:h,fill:"none",stroke:"none"}}>
        <path d={WORDMARK} fill={letters} stroke="none"/>
        <rect x="7204" y="-266" width="1188" height="266" fill={bar} stroke="none"/>
      </svg>
      {lockup && <>
        <span style={{fontWeight:600,letterSpacing:"-.01em",whiteSpace:"nowrap",fontSize:Math.max(10,w*0.046),marginTop:Math.round(w*0.03),color:letters}}>
          Making room for more<b style={{fontWeight:800,color:bar}}>.</b>
        </span>
        <span style={{fontWeight:500,textTransform:"uppercase",letterSpacing:".2em",marginRight:"-.2em",whiteSpace:"nowrap",fontSize:Math.max(8,w*0.027),marginTop:Math.round(w*0.024),color:byColor}}>
          By ELIPAN GROUP
        </span>
      </>}
    </span>
  );
}
