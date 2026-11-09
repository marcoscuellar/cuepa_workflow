// CUEPA logo — "Return C" mark + CUEPA wordmark (LOCKED Nov 9, 2026; supersedes CUEPA_ and "CUEPA.").
// Paths come straight from CUEPA-logo-files.zip (svg/cuepa-logo-*.svg). Never retype the wordmark.
// Colors:
//   on light (dark=true)  → Ink letters #080B0F, Primary Accent mark #0E7490   (cuepa-logo-ink-teal-mark)
//   on dark  (dark=false) → White letters #FFFFFF, Bright Signal mark #2DD4BF (cuepa-logo-white-signal-mark)
// `dark` keeps its old meaning: true = logo drawn for a LIGHT background.
// `lockup` = footer version: adds "Making room for more." and "By ELIPAN GROUP", right-aligned under the wordmark.
// `offering` is accepted for old call sites and ignored.

export const RETURN_C = "M155.2 146.3 A72 72 0 1 1 155.2 53.7 A17 17 0 0 1 129.1 75.6 A38 38 0 1 0 129.1 124.4";
const WORDMARK = "M788 20C1225 20 1446 -290 1466 -544H1056C1036 -417 946 -332 798 -332C600 -332 486 -471 486 -744C486 -1004 597 -1158 800 -1158C950 -1158 1038 -1073 1054 -946H1464C1427 -1306 1159 -1510 788 -1510C387 -1510 70 -1242 70 -744C70 -249 379 20 788 20ZM2269 18C2652 18 2913 -195 2913 -536V-1490H2509V-570C2509 -431 2409 -332 2269 -332C2131 -332 2031 -431 2031 -570V-1490H1627V-536C1627 -195 1884 18 2269 18ZM3105 0H4175V-326H3509V-594H4123V-912H3509V-1164H4179V-1490H3105ZM4360 0H4764V-442H4988C5328 -442 5556 -642 5556 -962C5556 -1280 5334 -1490 5002 -1490H4360ZM4764 -756V-1166H4906C5049 -1166 5134 -1091 5134 -962C5134 -836 5049 -756 4906 -756ZM5468 0H5920L6002 -286H6460L6546 0H7004L6503 -1490H5951ZM6088 -588C6140 -770 6182 -964 6223 -1159C6268 -964 6316 -770 6370 -588Z";
const RATIO = 9303/2130;

export default function Logo({dark=false,size=18,lockup=false}:{dark?:boolean;size?:number;offering?:string;lockup?:boolean}){
  const letters = dark ? "#080B0F" : "#FFFFFF";
  const mark = dark ? "#0E7490" : "#2DD4BF";
  const byColor = dark ? "#5E6670" : "#9AA4A4";
  const h = Math.round(size*1.4);
  const w = Math.round(h*RATIO);
  return (
    <span role="img" aria-label={lockup?"CUEPA. Making room for more. By ELIPAN GROUP":"CUEPA"}
      style={{display:"inline-grid",justifyItems:"end",lineHeight:1,width:w,fontFamily:"'Inter',sans-serif"}}>
      <svg width={w} height={h} viewBox="-80 -1810 9303 2130" aria-hidden="true" style={{display:"block",width:w,height:h,fill:"none",stroke:"none"}}>
        <g transform="translate(-201.8,-1932.0) scale(11.87)">
          <path d={RETURN_C} fill="none" stroke={mark} strokeWidth={22} strokeLinecap="round"/>
        </g>
        <path transform="translate(2138.6,0)" d={WORDMARK} fill={letters} stroke="none"/>
      </svg>
      {lockup && <>
        <span style={{fontWeight:600,letterSpacing:"-.01em",whiteSpace:"nowrap",fontSize:Math.max(11,w*0.05),marginTop:Math.round(w*0.04),color:letters}}>
          Making room for more<b style={{fontWeight:800,color:mark}}>.</b>
        </span>
        <span style={{fontWeight:500,textTransform:"uppercase",letterSpacing:".2em",marginRight:"-.2em",whiteSpace:"nowrap",fontSize:Math.max(8,w*0.03),marginTop:Math.round(w*0.026),color:byColor}}>
          By ELIPAN GROUP
        </span>
      </>}
    </span>
  );
}
