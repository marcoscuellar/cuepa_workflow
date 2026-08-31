import type {Metadata} from "next";import "./globals.css";import "./humans.css";import "./motion-refine.css";import "./original-demo.css";import "./ecosystem.css";import "./intro-motion.css";import "./roommap.css";
export const metadata:Metadata={title:"CUEPA — Make Room for What Matters",description:"Human-centered workflow intelligence that returns capacity without removing human control."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;700&family=Archivo+Black&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet"/>
</head><body>{children}</body></html>}
