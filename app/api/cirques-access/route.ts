import {NextResponse} from "next/server";
import {CX_COOKIE, cxToken} from "../../../lib/cirquesAccess";

/* Checks the Cirques password and sets a 30-day access cookie. */
export async function POST(req: Request) {
  const form = await req.formData();
  const pw = String(form.get("password") || "");
  let next = String(form.get("next") || "/cirques-experience");
  if (!next.startsWith("/cirques-experience")) next = "/cirques-experience";
  const real = process.env.CIRQUES_PASSWORD;
  const base = new URL(req.url);
  if (!real || pw.trim() !== real) {
    const back = new URL("/cirques-experience", base);
    if (next !== "/cirques-experience") back.pathname = next;
    back.searchParams.set("wrong", "1");
    return NextResponse.redirect(back, 303);
  }
  const res = NextResponse.redirect(new URL(next, base), 303);
  res.cookies.set(CX_COOKIE, await cxToken(real), {httpOnly: true, secure: true, sameSite: "lax", path: "/cirques-experience", maxAge: 60 * 60 * 24 * 30});
  return res;
}
