// CUEPA "Return C" mark as a small app-style icon: white C on a Ground Ink rounded square.
// Same path as public/brand/cuepa-mark-*.svg (CUEPA-logo-files-2).
export const RETURN_C_PATH = "M155.2 146.3 A72 72 0 1 1 155.2 53.7 A17 17 0 0 1 129.1 75.6 A38 38 0 1 0 129.1 124.4";
export default function ReturnMark({size=14}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" style={{display:"inline-block",flex:"none",fill:"none",stroke:"none"}}>
    <rect width="200" height="200" rx="44" fill="#080B0F"/>
    <g transform="translate(100 100) scale(.62) translate(-95 -100)"><path d={RETURN_C_PATH} fill="none" stroke="#FFFFFF" strokeWidth={22} strokeLinecap="round"/></g>
  </svg>;
}
