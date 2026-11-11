import type {Metadata} from "next";import "./globals.css";import "./humans.css";import "./motion-refine.css";import "./original-demo.css";import "./ecosystem.css";import "./intro-motion.css";import "./roommap.css";import "./roomworth.css";import "./howitworks.css";import "./practice.css";import "./refresh.css";import "./brand-nov.css";
const title="CUEPA — Human-Governed AI Workflows for Small Business";
const description="CUEPA helps small businesses find operational gaps and design practical, human-governed AI workflows. We start with your business goal, not the technology. You keep the decisions.";
// Structured data: only facts Marcos has stated. No address, hours, prices or ratings.
const jsonLd={
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"ProfessionalService","@id":"https://www.makingcuepa.com/#business","name":"CUEPA","url":"https://www.makingcuepa.com/","logo":"https://www.makingcuepa.com/icon-512.png","image":"https://www.makingcuepa.com/og.jpg",
     "email":"marcoscuellar@elipangroup.com","slogan":"Make room for what's next.",
     "description":"CUEPA helps small businesses identify operational gaps and design practical, human-governed AI workflows. The work starts with the business goal, then maps how work actually gets done, and puts AI only where it pays off. A person approves before anything goes out.",
     "parentOrganization":{"@type":"Organization","name":"ELIPAN GROUP"},
     "founder":{"@id":"https://www.makingcuepa.com/#marcos"},
     "knowsAbout":["AI workflow design","Operational gap analysis","Workflow automation for small business","Human-in-the-loop AI","Business process improvement","Operational strategy"],
     "hasOfferCatalog":{"@type":"OfferCatalog","name":"The CUEPA Practice","itemListElement":[
       {"@type":"Offer","itemOffered":{"@type":"Service","name":"Find: The Room Map","description":"Start with the company goal, then map how work gets done and how many hours it takes. Every task gets one call: eliminate, simplify, redesign, automate, or keep human."}},
       {"@type":"Offer","itemOffered":{"@type":"Service","name":"Flow: The Working System","description":"A working system built around how the business already operates. Actions prepared, drafts cued, exceptions flagged. The owner keeps the decisions."}},
       {"@type":"Offer","itemOffered":{"@type":"Service","name":"Prove: The Room Report","description":"Before-and-after measurement against the week-one baseline."}},
       {"@type":"Offer","itemOffered":{"@type":"Service","name":"Grow: The Next Opportunity","description":"The running system surfaces opportunities as drafts for review, never as automatic actions."}}]}},
    {"@type":"Person","@id":"https://www.makingcuepa.com/#marcos","name":"Marcos Cuellar","jobTitle":"Leads CUEPA","worksFor":{"@id":"https://www.makingcuepa.com/#business"},
     "description":"Leads CUEPA. Background in business development, staffing and operational strategy, so the approach starts with the human business outcome rather than the technology.",
     "knowsAbout":["Business development","Staffing","Operational strategy","AI workflow design"]},
    {"@type":"WebSite","@id":"https://www.makingcuepa.com/#site","url":"https://www.makingcuepa.com/","name":"CUEPA","publisher":{"@id":"https://www.makingcuepa.com/#business"}}
  ]
};
export const metadata:Metadata={
  metadataBase:new URL("https://www.makingcuepa.com"),
  title,description,
  keywords:["human-governed AI workflows","AI workflows for small business","operational gaps","small business AI consulting","workflow automation","human in the loop AI","business process improvement","operational strategy","CUEPA","ELIPAN GROUP"],
  authors:[{name:"Marcos Cuellar"}],
  alternates:{canonical:"/"},
  icons:{
    icon:[
      {url:"/favicon.ico?v=5",sizes:"any"},
      {url:"/favicon.svg?v=5",type:"image/svg+xml"},
      {url:"/favicon-32.png?v=5",sizes:"32x32",type:"image/png"},
      {url:"/favicon-16.png?v=5",sizes:"16x16",type:"image/png"},
      {url:"/icon-192.png?v=5",sizes:"192x192",type:"image/png"},
      {url:"/icon-512.png?v=5",sizes:"512x512",type:"image/png"}
    ],
    apple:[{url:"/apple-touch-icon.png?v=5",sizes:"180x180",type:"image/png"}],
    shortcut:"/favicon.ico?v=5"
  },
  manifest:"/site.webmanifest?v=5",
  openGraph:{type:"website",url:"/",siteName:"CUEPA",title,description,
    images:[{url:"/og.jpg?v=6",width:1200,height:630,alt:"CUEPA logo on a dark teal background. Making room for more. Human-governed AI workflows for growing businesses."}]},
  twitter:{card:"summary_large_image",title,description,images:["/og.jpg?v=6"]}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;700&family=Archivo+Black&family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet"/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
</head><body>{children}</body></html>}
