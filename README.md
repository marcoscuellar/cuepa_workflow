# CUEPA

The CUEPA marketing site and client proposal pages.

Next.js 16 (App Router) · React 19 · TypeScript · plain CSS · deployed on Vercel.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
npx tsc --noEmit
```

## Deployment

Vercel builds **production from `main`**, serving `makingcuepa.com` and
`www.makingcuepa.com`. Every other branch deploys as a preview.

Preview deployments and all `*.vercel.app` URLs sit behind Vercel SSO, so only
the account owner can open them. Custom domains are exempt — `makingcuepa.com`
is the URL to share with anyone else.

## Routes

| Route | What it is |
| --- | --- |
| `/` | The marketing site |
| `/contact` | Email capture |
| `/api/contact` | Sends form submissions through Resend |
| `/cirques-experience` | Client proposal (noindex, not in site nav) |
| `/cirques-experience/operations-hub` | Phase One dashboard concept, illustrative data only |
| `/cirques-experience/approved` | Terms sheet and electronic signature |

The three `/cirques-experience` routes are `noindex` and deliberately absent
from the site navigation. They are reachable only by direct link.

## Environment

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required. Without it `/api/contact` returns 503 and the forms say so rather than failing silently. |
| `CONTACT_TO` | Where submissions go. Defaults to `marcos@ollinos.com`. |
| `CONTACT_FROM` | From address. Defaults to Resend's shared sender. |

## Things worth knowing before you edit

**Fonts load via `<link>` in `app/layout.tsx`, not `@import`.** Next's CSS
pipeline strips remote `@import` from bundled stylesheets, which silently drops
every webfont and ships the site in Arial. If you add a family, add it to that
`<link>`.

**`app/globals.css` and `app/motion-refine.css` set bare-element rules** —
`h2 { … }` and `h1,h2,h3,h4 { font-family: 'Archivo Black' }` among them. Those
outrank a single class, so scoped stylesheets have to declare `font-family` and
margins explicitly rather than relying on inheritance. Both `.cx` and `.hub`
wrap their resets in `:where()` for the same reason.

**Client proposal configuration** lives in named constants at the top of the
files that use it:

- `app/cirques-experience/page.tsx` — `APPROVE_URL`, `CONTACT_EMAIL`, `HUB_URL`
- `app/cirques-experience/approved/page.tsx` — `SIGNER_EMAIL`
- `app/cirques-experience/approved/agreement.ts` — the terms being signed, and
  a `VERSION` string. Change the price or timeline on the proposal and change it
  here too: this text is what ends up inside a signed record, and it has to
  match what the client read. Bump `VERSION` when it changes.

**`public/cirques-hub-preview.png` is a captured render** of
`/cirques-experience/operations-hub`, used in the proposal hero. If the hub's
layout changes, regenerate it from the live route or it goes stale.
