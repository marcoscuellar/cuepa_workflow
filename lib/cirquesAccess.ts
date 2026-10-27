/* Shared by proxy.ts and the password route for the private Cirques pages. */
export const CX_COOKIE = "cx_access";

export async function cxToken(pw: string) {
  const data = new TextEncoder().encode("cuepa-cirques:" + pw);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
