// Builds "Your Room Estimate" as a one-page PDF in the browser.
// No dependencies: it writes PDF objects directly with the built-in
// Helvetica fonts, so nothing new goes into the build.
//
// Honesty rule: the PDF only repeats the visitor's own inputs and the same
// arithmetic the calculator shows. It is an estimate, not a quote or a promise.

export type RoomEstimateInput = {
  email: string;
  people: number;
  hours: number;
  rate: number;
  tools: string[];
  weeksPerYear: number;
  date?: Date;
};

const INK: RGB = [0.012, 0.012, 0.012];      // #030303
const SLATE: RGB = [0.067, 0.094, 0.153];    // #111827
const MUTED: RGB = [0.369, 0.369, 0.369];    // #5E5E5E
const TEAL: RGB = [0.059, 0.463, 0.431];     // #0F766E
const LINE: RGB = [0.894, 0.894, 0.894];     // #E4E4E4
type RGB = [number, number, number];

// PDF standard fonts use WinAnsi; keep text to plain ASCII.
const ascii = (s: string) =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/·/g, "-").replace(/…/g, "...").replace(/[^\x20-\x7E]/g, "");
const pdfStr = (s: string) => "(" + ascii(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)") + ")";
const rgb = (c: RGB) => c.map(n => n.toFixed(3)).join(" ");

// Rough Helvetica width (avg glyph ~0.52em) for simple wrapping.
function wrap(text: string, size: number, maxWidth: number): string[] {
  const words = ascii(text).split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? line + " " + w : w;
    if (next.length * size * 0.52 > maxWidth && line) { lines.push(line); line = w; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export function buildRoomEstimatePdf(input: RoomEstimateInput): Uint8Array {
  const money = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0});
  const count = new Intl.NumberFormat("en-US");
  const weekly = input.people * input.hours;
  const yearly = weekly * input.weeksPerYear;
  const cost = yearly * input.rate;
  const date = (input.date ?? new Date()).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});

  const ops: string[] = [];
  const text = (s: string, x: number, y: number, size: number, color: RGB, bold = false) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${rgb(color)} rg ${x} ${y} Td ${pdfStr(s)} Tj ET`);
  const rect = (x: number, y: number, w: number, h: number, color: RGB) =>
    ops.push(`${rgb(color)} rg ${x} ${y} ${w} ${h} re f`);
  const rule = (y: number) => rect(56, y, 500, 0.75, LINE);

  // Header: CUEPA mark (two equal blocks, Deep Ink + Teal Mark) and lockup
  rect(56, 724, 11, 26, INK);
  rect(71, 724, 11, 26, TEAL);
  text("CUEPA", 92, 738, 15, INK, true);
  text("for Work", 151, 738, 10, INK);
  text("BY ELIPAN GROUP", 92, 726, 7, MUTED);
  text(date, 556 - ascii(date).length * 9 * 0.52, 738, 9, MUTED);

  // Title
  text("Your Room Estimate", 56, 668, 30, INK, true);
  text("Your estimate, not a quote.", 56, 646, 13, TEAL, true);
  text(`Prepared for ${input.email}`, 56, 626, 10, MUTED);
  rule(606);

  // Your numbers
  text("YOUR NUMBERS", 56, 580, 9, TEAL, true);
  const rows: [string, string][] = [
    ["People on the team", count.format(input.people)],
    ["Hours each, per week, on repeat work", `${input.hours} hrs`],
    ["What an hour costs you (pay plus overhead)", money.format(input.rate)]
  ];
  let y = 556;
  for (const [k, v] of rows) {
    text(k, 56, y, 11, SLATE);
    text(v, 556 - ascii(v).length * 11 * 0.56, y, 11, INK, true);
    rule(y - 9);
    y -= 26;
  }

  // What it takes today
  y -= 14;
  text("RIGHT NOW, THE REPEAT WORK TAKES", 56, y, 9, TEAL, true);
  y -= 46;
  const cols: [string, string, RGB][] = [
    [count.format(weekly), "hours a week", INK],
    [count.format(yearly), "hours a year", INK],
    [money.format(cost), "a year in time", TEAL]
  ];
  cols.forEach(([n, l, c], i) => {
    const x = 56 + i * 170;
    text(n, x, y, 26, c, true);
    text(l, x, y - 18, 10, MUTED);
  });
  y -= 44;
  rule(y);

  // Tools
  y -= 26;
  text("TOOLS YOU USE", 56, y, 9, TEAL, true);
  y -= 18;
  const tools = input.tools.length ? input.tools.join(", ") : "Not shared";
  for (const l of wrap(tools, 11, 500)) { text(l, 56, y, 11, SLATE); y -= 15; }
  y -= 6;
  rule(y);

  // How the real numbers get found
  y -= 26;
  text("HOW WE FIND THE REAL NUMBERS", 56, y, 9, TEAL, true);
  const steps: [string, string, string][] = [
    ["FIND", "The Room Map", "We find how much of it we can take off your plate."],
    ["PROVE", "The Room Report", "We prove what actually came back, measured against today."]
  ];
  y -= 24;
  for (const [n, t, d] of steps) {
    rect(56, y - 5, 46, 18, TEAL);
    text(n, 79 - ascii(n).length * 9 * 0.33, y, 9, [1, 1, 1], true);
    text(t, 112, y, 12, INK, true);
    text(d, 112, y - 15, 10, SLATE);
    y -= 40;
  }
  rule(y + 8);

  // Next step
  y -= 18;
  text("NEXT STEP", 56, y, 9, TEAL, true);
  y -= 20;
  text("Book a 20-Minute Room Conversation", 56, y, 14, INK, true);
  y -= 17;
  text("A real person, 20 minutes, no pitch. We look at where your time goes.", 56, y, 10, SLATE);
  y -= 15;
  text("makingcuepa.com  -  marcoscuellar@elipangroup.com", 56, y, 10, TEAL, true);

  // Fine print + footer
  const fine = `Your own estimate, not a quote or a promise. It uses only the numbers you entered and assumes ${input.weeksPerYear} working weeks a year. Real numbers are measured with you in a Room Map and proven in a Room Report.`;
  let fy = 92;
  for (const l of wrap(fine, 8.5, 500)) { text(l, 56, fy, 8.5, MUTED); fy -= 12; }
  rule(56);
  text("CUEPA for Work - An ELIPAN GROUP company", 56, 40, 8, MUTED);

  const content = ops.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    `<< /Title ${pdfStr("Your Room Estimate")} /Author ${pdfStr("CUEPA for Work")} /Producer ${pdfStr("makingcuepa.com")} >>`
  ];
  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map(o => String(o).padStart(10, "0") + " 00000 n \n").join("");
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  // Everything above is ASCII, so string length equals byte length.
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
