import {NextResponse, type NextRequest} from "next/server";
import {CX_COOKIE, cxToken} from "./lib/cirquesAccess";

/* Cirques Experience pages are client-only. Anyone without the access cookie
   sees the password page instead. The password lives in the CIRQUES_PASSWORD
   environment variable in Vercel; if it isn't set, the pages stay locked. */

export async function proxy(req: NextRequest) {
  const pw = process.env.CIRQUES_PASSWORD;
  const got = req.cookies.get(CX_COOKIE)?.value;
  if (pw && got && got === (await cxToken(pw))) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }
  const url = req.nextUrl.clone();
  url.pathname = "/cirques-access";
  url.searchParams.set("next", req.nextUrl.pathname);
  const res = NextResponse.rewrite(url);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {matcher: ["/cirques-experience", "/cirques-experience/:path*"]};
