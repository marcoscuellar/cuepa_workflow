// Builds "Your Room Estimate" as a one-page, print-friendly PDF in the browser.
// No dependencies: it writes PDF objects directly with the built-in Helvetica
// fonts, so nothing new goes into the build.
//
// Honesty rule: the PDF only repeats the visitor's own inputs and the same
// arithmetic the calculator shows. It never splits their hours across the four
// engines or promises savings; that is measured with them in FIND (the Room Map).

export type RoomEstimateInput = {
  email: string;
  people: number;
  hours: number;
  rate: number;
  tools: string[];
  weeksPerYear: number;
  date?: Date;
};

export const BOOKING_URL = "https://www.makingcuepa.com/#conversation";

type RGB = [number, number, number];
const INK: RGB = [0.094, 0.102, 0.118];      // Deep Ink #181A1E
const MUTED: RGB = [0.369, 0.369, 0.369];    // #5E5E5E
const TEAL: RGB = [0.059, 0.463, 0.431];     // Teal Mark #0F766E
const TINT: RGB = [0.937, 0.965, 0.961];     // Teal Mark at ~6% on white
const LINE: RGB = [0.894, 0.894, 0.894];     // #E4E4E4
const WHITE: RGB = [1, 1, 1];

// Standard fonts use WinAnsi: keep text to ASCII, except the middle dot (0xB7).
const ascii = (s: string) =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/…/g, "...").replace(/[^\x20-\x7E·]/g, "");
const pdfStr = (s: string) =>
  "(" + ascii(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/·/g, "\\267") + ")";
const rgb = (c: RGB) => c.map(n => n.toFixed(3)).join(" ");
// Rough Helvetica width for layout (regular ~0.52em, bold ~0.56em per glyph).
const width = (s: string, size: number, bold = false) => ascii(s).length * size * (bold ? 0.56 : 0.52);

function wrap(text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const w of ascii(text).split(" ")) {
    const next = line ? line + " " + w : w;
    if (width(next, size) > maxWidth && line) { lines.push(line); line = w; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

const ENGINES: [string, string][] = [
  ["Intake", "Leads, inquiries, scheduling and new-client forms."],
  ["Billing / Contracts", "Quotes, proposals, contracts, invoices and follow-ups."],
  ["Delivery / Handoffs", "Job or project handoffs, status updates, team coordination."],
  ["Admin Close-out", "Reconciling, reporting, filing and end-of-day wrap-up."]
];

export function buildRoomEstimatePdf(input: RoomEstimateInput): Uint8Array {
  const money = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0});
  const count = new Intl.NumberFormat("en-US");
  const weekly = input.people * input.hours;
  const yearly = weekly * input.weeksPerYear;
  const cost = yearly * input.rate;
  const date = (input.date ?? new Date()).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});

  const ops: string[] = [];
  const text = (s: string, x: number, y: number, size: number, color: RGB, bold = false) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${rgb(color)} rg ${x.toFixed(1)} ${y.toFixed(1)} Td ${pdfStr(s)} Tj ET`);
  const right = (s: string, xr: number, y: number, size: number, color: RGB, bold = false) =>
    text(s, xr - width(s, size, bold), y, size, color, bold);
  const rect = (x: number, y: number, w: number, h: number, color: RGB) =>
    ops.push(`${rgb(color)} rg ${x} ${y} ${w} ${h} re f`);
  const rule = (y: number) => rect(56, y, 500, 0.75, LINE);
  const label = (s: string, y: number) => text(s.toUpperCase(), 56, y, 8.5, TEAL, true);

  // Header: CUEPA mark (two equal blocks, Deep Ink + Teal Mark) and lockup
  rect(56, 728, 11, 26, INK);
  rect(71, 728, 11, 26, TEAL);
  text("CUEPA", 92, 742, 15, INK, true);
  text("for Work", 151, 742, 10, INK);
  text("BY ELIPAN GROUP", 92, 730, 7, MUTED);
  right(date, 556, 742, 9, MUTED);

  // Title
  text("Your Room Estimate", 56, 684, 30, INK, true);
  text("Operational Baseline · Draft for review", 56, 663, 12.5, TEAL, true);
  text(`Prepared for ${input.email}`, 56, 646, 10, MUTED);
  rule(633);

  // 1. Inputs summary
  let y = 614;
  label("Inputs summary", y);
  y -= 22;
  const inputs: [string, string][] = [
    ["Headcount", count.format(input.people)],
    ["Weekly hours lost to repeat work, per person", `${input.hours} hrs`],
    ["Blended hourly rate (pay plus overhead)", money.format(input.rate)],
    ["Working year", `${input.weeksPerYear} weeks`]
  ];
  for (const [k, v] of inputs) {
    text(k, 56, y, 10.5, INK);
    right(v, 556, y, 10.5, INK, true);
    rule(y - 7);
    y -= 20;
  }
  // Totals band
  y -= 8;
  rect(56, y - 44, 500, 56, TINT);
  const totals: [string, string, RGB][] = [
    [count.format(weekly), "hours a week", INK],
    [count.format(yearly), "hours a year", INK],
    [money.format(cost), "a year in time", TEAL]
  ];
  totals.forEach(([n, l, c], i) => {
    const x = 72 + i * 166;
    text(n, x, y - 14, 20, c, true);
    text(l, x, y - 31, 9, MUTED);
  });
  y -= 66;

  // 2. Four core workflow engines (no hours split: that is mapped in FIND)
  label("4 core workflow engines", y);
  y -= 10;
  const boxW = 245, boxH = 44, gap = 8;
  ENGINES.forEach(([name, desc], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const bx = 56 + col * (boxW + gap);
    const by = y - (row + 1) * boxH - row * gap;
    rect(bx, by, boxW, boxH, TINT);
    rect(bx, by, 3, boxH, TEAL);
    text(`0${i + 1}  ${name}`, bx + 14, by + boxH - 16, 10.5, INK, true);
    wrap(desc, 8.5, boxW - 22).slice(0, 2).forEach((l, j) => text(l, bx + 14, by + boxH - 29 - j * 10, 8.5, MUTED));
  });
  y -= 2 * boxH + gap + 13;
  text("Where your hours sit across these four engines is mapped with you in FIND, the Room Map.", 56, y, 8.5, MUTED);
  y -= 18;
  rule(y + 7);

  // 3. Selected tool stack
  y -= 12;
  label("Selected tool stack", y);
  y -= 17;
  const tools = input.tools.length ? input.tools.join(" · ") : "Not shared";
  for (const l of wrap(tools, 10.5, 500)) { text(l, 56, y, 10.5, INK); y -= 14; }
  y -= 6;
  rule(y);

  // 4. Target rhythm
  y -= 20;
  label("Target rhythm", y);
  y -= 8;
  const rhythm = "Designing systems to compress admin drag into a 15-20 minute daily command center rhythm. You keep the decisions; the system holds the line.";
  const rLines = wrap(rhythm, 11, 470);
  const rH = rLines.length * 15 + 14;
  rect(56, y - rH, 3, rH, TEAL);
  rLines.forEach((l, j) => text(l, 70, y - 17 - j * 15, 11, INK));
  y -= rH + 14;

  // 5. Direct next step (clickable)
  label("Next step", y);
  y -= 26;
  const btnW = 270, btnH = 28;
  rect(56, y - 8, btnW, btnH, TEAL);
  text("Book a 20-Minute Room Conversation  >", 70, y + 1.5, 11, WHITE, true);
  const link: [number, number, number, number] = [56, y - 8, 56 + btnW, y - 8 + btnH];
  text("makingcuepa.com  ·  marcoscuellar@elipangroup.com", 56, y - 24, 9, TEAL, true);

  // Fine print + footer
  const fine = `Your own estimate, not a quote or a promise. It uses only the numbers you entered and assumes ${input.weeksPerYear} working weeks a year. Real numbers are measured with you in a Room Map and proven in a Room Report.`;
  let fy = 74;
  for (const l of wrap(fine, 7.5, 500)) { text(l, 56, fy, 7.5, MUTED); fy -= 10; }
  rule(48);
  text("CUEPA for Work · An ELIPAN GROUP company", 56, 36, 7.5, MUTED);

  const content = ops.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [7 0 R] >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    `<< /Type /Annot /Subtype /Link /Rect [${link.map(n => n.toFixed(1)).join(" ")}] /Border [0 0 0] /A << /S /URI /URI ${pdfStr(BOOKING_URL)} >> >>`,
    `<< /Title ${pdfStr("Your Room Estimate")} /Author ${pdfStr("CUEPA for Work")} /Producer ${pdfStr("makingcuepa.com")} >>`
  ];
  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map(o => String(o).padStart(10, "0") + " 00000 n \n").join("");
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  // Everything above is ASCII (the middle dot is written as \267), so string
  // length equals byte length.
  return new TextEncoder().encode(out);
}

export function downloadRoomEstimate(input: RoomEstimateInput) {
  const bytes = buildRoomEstimatePdf(input);
  const blob = new Blob([bytes as BlobPart], {type: "application/pdf"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Your-Room-Estimate.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
