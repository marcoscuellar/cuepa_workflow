// Receives the Room Conversation form. Sends through Resend's REST API so the
// project needs no extra dependency — just RESEND_API_KEY in the environment.
const TO = process.env.CONTACT_TO ?? "marcos@ollinos.com";
const FROM = process.env.CONTACT_FROM ?? "CUEPA <onboarding@resend.dev>";

// The CUEPA for You site (you.makingcuepa.com) posts here from another origin.
const ALLOWED_ORIGINS = ["https://you.makingcuepa.com", "https://www.makingcuepa.com", "https://makingcuepa.com"];
const cors = (req: Request): Record<string, string> => {
  const origin = req.headers.get("origin") ?? "";
  return ALLOWED_ORIGINS.includes(origin)
    ? {"Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin"}
    : {};
};

export async function OPTIONS(req: Request) {
  return new Response(null, {status: 204, headers: cors(req)});
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const h = cors(req);
  let body: {name?: string; email?: string; note?: string; chips?: string[]; company?: string; subject?: string; copyTo?: string; source?: string};
  try {
    body = await req.json();
  } catch {
    return Response.json({error: "Malformed request."}, {status: 400, headers: h});
  }

  // Honeypot: real people never fill a hidden field. Accept silently so bots
  // get no signal about why nothing happened.
  if (body.company) return Response.json({ok: true}, {headers: h});

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 320);
  const note = (body.note ?? "").trim().slice(0, 5000);
  const chips = Array.isArray(body.chips) ? body.chips.slice(0, 12).map(c => String(c).slice(0, 120)) : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({error: "Please add a valid email."}, {status: 400, headers: h});

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set, cannot deliver submission.");
    return Response.json({error: "The form isn't connected yet. Please email us directly."}, {status: 503, headers: h});
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
    return Response.json({error: "We couldn't send that just now. Please try again."}, {status: 502, headers: h});
  }

  // CUEPA for You bookings also get a "Got it" email. If this one fails we
  // still report success: Marcos already has the booking.
  if (body.source === "you") {
    const first = (name.split(/\s+/)[0] || "there").slice(0, 60);
    const confirm = youConfirmation(first, note);
    const r2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {Authorization: `Bearer ${key}`, "Content-Type": "application/json"},
      body: JSON.stringify({from: FROM, to: [email], reply_to: TO, subject: confirm.subject, html: confirm.html, text: confirm.text})
    });
    if (!r2.ok) console.error("Contact form: confirmation email failed", r2.status, await r2.text().catch(() => ""));
  }
  return Response.json({ok: true}, {headers: h});
}

function youConfirmation(first: string, answers: string) {
  const subject = `Got it, ${first}. Your CUEPA for You hour is almost set.`;
  const steps = [
    "Marcos will email you a payment link. Once it's paid, your hour is set.",
    "We'll find a time that works for you.",
    "We meet over video, set up your AI together, and build your dashboard as we go."
  ];
  const text = [
    `Hi ${first},`, "",
    "Thanks for booking a session with CUEPA for You. We got your answers, and Marcos is looking them over.", "",
    "What happens next:", ...steps.map((s, i) => `${i + 1}. ${s}`), "",
    "What you told us:", answers, "",
    "Questions? Just reply to this email.", "",
    "Talk soon,", "Marcos and the CUEPA team", "",
    "CUEPA for You · An ELIPAN GROUP company · you.makingcuepa.com"
  ].join("\n");
  const html = `<div style="font:16px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141414;max-width:560px;margin:0 auto;padding:24px">
<p style="margin:0 0 18px"><span style="display:inline-block;width:10px;height:22px;background:#141414;vertical-align:middle"></span><span style="display:inline-block;width:4px"></span><span style="display:inline-block;width:10px;height:22px;background:#F9C933;vertical-align:middle"></span> <strong style="vertical-align:middle;letter-spacing:.04em">CUEPA</strong> <span style="vertical-align:middle;color:#8a6500;font-size:13px;letter-spacing:.1em">FOR YOU</span></p>
<h1 style="font-size:24px;line-height:1.2;margin:0 0 14px">Got it, ${esc(first)}. Talk soon.</h1>
<p style="margin:0 0 18px">Thanks for booking a session with CUEPA for You. We got your answers, and Marcos is looking them over.</p>
<p style="margin:0 0 8px;font-weight:600">What happens next</p>
<ol style="margin:0 0 20px;padding-left:20px">${steps.map(s => `<li style="margin-bottom:6px">${esc(s)}</li>`).join("")}</ol>
<p style="margin:0 0 8px;font-weight:600">What you told us</p>
<pre style="margin:0 0 20px;padding:14px;background:#f8f7f4;border-radius:10px;font:14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;white-space:pre-wrap">${esc(answers)}</pre>
<p style="margin:0 0 18px">Questions? Just reply to this email.</p>
<p style="margin:0">Talk soon,<br>Marcos and the CUEPA team</p>
<p style="margin:28px 0 0;font-size:12px;color:#777">CUEPA for You · An ELIPAN GROUP company · <a href="https://you.makingcuepa.com" style="color:#777">you.makingcuepa.com</a></p>
</div>`;
  return {subject, text, html};
}
