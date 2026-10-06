// Receives the Room Conversation form. Sends through Resend's REST API so the
// project needs no extra dependency — just RESEND_API_KEY in the environment.
const TO = process.env.CONTACT_TO ?? "marcos@ollinos.com";
const FROM = process.env.CONTACT_FROM ?? "CUEPA <onboarding@resend.dev>";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: {name?: string; email?: string; note?: string; chips?: string[]; company?: string; subject?: string; copyTo?: string};
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({error: "Please add a valid email."}, {status: 400});

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set, cannot deliver submission.");
    return Response.json({error: "The form isn't connected yet. Please email us directly."}, {status: 503});
  }

  // Callers may name their own subject; the Room Conversation form does not.
  const custom = (body.subject ?? "").trim().slice(0, 200);
  const subject = custom || `Room Conversation — ${name || email}`;
  // That form's prompt only makes sense for that form.
  const noteLabel = custom ? "Details" : "What feels heavier than it should";

  const html = [
    name ? `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p>` : `<p>&lt;${esc(email)}&gt;</p>`,
    chips.length ? `<p><strong>Making room for:</strong> ${esc(chips.join(", "))}</p>` : "",
    note ? `<p><strong>${noteLabel}:</strong></p><pre style="font:13px/1.5 ui-monospace,monospace;white-space:pre-wrap">${esc(note)}</pre>` : ""
  ].filter(Boolean).join("\n");

  // A signer gets their own copy of what they signed; the Room
  // Conversation form sends no copyTo and behaves exactly as before.
  const copyTo = (body.copyTo ?? "").trim().slice(0, 320);
  const to = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(copyTo) && copyTo !== TO ? [TO, copyTo] : [TO];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {Authorization: `Bearer ${key}`, "Content-Type": "application/json"},
    body: JSON.stringify({from: FROM, to, reply_to: email, subject, html})
  });

  if (!res.ok) {
    console.error("Contact form: Resend returned", res.status, await res.text().catch(() => ""));
    return Response.json({error: "We couldn't send that just now. Please try again."}, {status: 502});
  }
  return Response.json({ok: true});
}
