import type {Metadata} from "next";import "./globals.css";import "./humans.css";import "./motion-refine.css";import "./original-demo.css";import "./ecosystem.css";import "./intro-motion.css";import "./roommap.css";
const title="CUEPA — Make Room for What Matters";
const description="Human-centered workflow intelligence that returns capacity without removing human control.";
export const metadata:Metadata={
  metadataBase:new URL("https://makingcuepa.com"),
  title,description,
  alternates:{canonical:"/"},
  icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"}],apple:"/apple-touch-icon.png"},
  openGraph:{type:"website",url:"/",siteName:"CUEPA",title,description,
    images:[{url:"/og.jpg",width:1200,height:630,alt:"A father walking onto the field toward his son at an evening football game, over the words Making Room For What Matters"}]},
  twitter:{card:"summary_large_image",title,description,images:["/og.jpg"]}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;700&family=Archivo+Black&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet"/>
</head><body>{children}</body></html>}
