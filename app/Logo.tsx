export default function Logo({dark=false,size=18}:{dark?:boolean;size?:number}){
  const blockA = dark ? "#030303" : "#fff";
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <rect x="14" y="14" width="30" height="72" fill={blockA}/>
        <rect x="56" y="14" width="30" height="72" fill="#2DD4BF"/>
      </svg>
      <span style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:size*0.78,letterSpacing:".02em",color:dark?"#030303":"#fff"}}>CUEPA</span>
    </span>
  );
}
