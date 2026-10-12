import type {Metadata} from "next";
import HubApp from "./HubApp";
import "./hub.css";

export const metadata: Metadata = {
  title: "CUEPA Operations Hub — internal sandbox",
  description:
    "CUEPA's own operations hub. A sandbox for exercising the build and the process. Illustrative data only — no client systems are connected.",
  alternates: {canonical: "/cuepa-hub"},
  // Internal. Keep it out of search results.
  robots: {index: false, follow: false}
};

export default function CuepaHubPage() {
  return <HubApp />;
}
