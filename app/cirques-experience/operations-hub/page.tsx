import type {Metadata} from "next";
import HubApp from "./HubApp";
import "./hub.css";

export const metadata: Metadata = {
  title: "Operations Hub Concept — Cirques Experience × CUEPA",
  description:
    "A Phase One concept for the Cirques Experience Operations Hub. Illustrative data only — no live systems are connected.",
  alternates: {canonical: "/cirques-experience/operations-hub"},
  // A client concept, not marketing. Keep it out of search results.
  robots: {index: false, follow: false}
};

export default function OperationsHubPage() {
  return <HubApp />;
}
