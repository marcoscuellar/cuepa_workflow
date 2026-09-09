/* ─────────────────────────────────────────────────────────────
   The terms being signed.

   Everything here is restated from /cirques-experience — nothing new
   is introduced. If the proposal's price, timeline, payment split or
   inclusions change, change them here too: this is the text that ends
   up inside the signed record, and it has to match what the client
   read.

   Bump VERSION whenever the terms below change, so a signed record
   can always be traced back to exactly what was on screen.
   ───────────────────────────────────────────────────────────── */

export const VERSION = "Phase One — v1";

export const TITLE = "Phase One — Cirques Experience Operations Hub";

export const TERMS: [string, string][] = [
  ["Scope", "Phase One of the Cirques Experience Operations Hub: workflow discovery, dashboard design and development, the unified calendar, the agreed-upon Phase One workflows, approved automations and connections, testing, training, launch, and 30 days of post-launch support."],
  ["Investment", "$5,500 total."],
  ["Payment", "50% ($2,750) to begin. 30% ($1,650) following dashboard approval. 20% ($1,100) at launch."],
  ["Timeline", "Estimated 4–5 weeks, beginning once this agreement is approved and the necessary system access and information have been provided."],
  ["Revisions", "Two rounds of consolidated revisions are included."],
  ["Software costs", "Any third-party software, platform, API, or subscription costs are paid directly by the client."],
  ["Not included", "Ongoing support after launch is optional and separate, at $500 per month."]
];

/* Plain-text version of the same terms, for the emailed record. */
export const termsText = () =>
  TERMS.map(([k, v]) => `${k}: ${v}`).join("\n");
