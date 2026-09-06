// Receives the Room Conversation form. Sends through Resend's REST API so the
// project needs no extra dependency — just RESEND_API_KEY in the environment.
const TO = process.env.CONTACT_TO ?? "marcos@ollinos.com";
const FROM = process.env.CONTACT_FROM ?? "CUEPA <onboarding@resend.dev>";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: {name?: string; email?: string; note?: string; chips?: string[]; company?: string};
  try {
    body = await req.json();
  } catch {
    return Response.json({error: "Malformed request."}, {status: 400});
  }

  // Honeypot: real people never fill a hidden field. Accept silently so bots
  // get no signal about why nothing happened.
  if (body.company) return Response.json({ok: true});

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 320);
  const note = (body.note ?? "").trim().slice(0, 5000);
  const chips = Array.isArray(body.chips) ? body.chips.slice(0, 12).map(c => String(c).slice(0, 120)) : [];

  if (!name) return Response.json({error: "Please add your name."}, {status: 400});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({error: "Please add a valid email."}, {status: 400});
  if (!note && !chips.length) return Response.json({error: "Tell us a little about what you want to make room for."}, {status: 400});

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set, cannot deliver submission.");
    return Response.json({error: "The form isn't connected yet. Please email us directly."}, {status: 503});
  }

  const html = [
    `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p>`,
    chips.length ? `<p><strong>Making room for:</strong> ${esc(chips.join(", "))}</p>` : "",
    note ? `<p><strong>What feels heavier than it should:</strong><br>${esc(note).replace(/\n/g, "<br>")}</p>` : ""
  ].filter(Boolean).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {Authorization: `Bearer ${key}`, "Content-Type": "application/json"},
    body: JSON.stringify({from: FROM, to: [TO], reply_to: email, subject: `Room Conversation — ${name}`, html})
  });

  if (!res.ok) {
    console.error("Contact form: Resend returned", res.status, await res.text().catch(() => ""));
    return Response.json({error: "We couldn't send that just now. Please try again."}, {status: 502});
  }
  return Response.json({ok: true});
}
