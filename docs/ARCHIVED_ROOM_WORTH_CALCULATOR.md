# Archived: "Your Room Worth" calculator

Removed from the CUEPA home page in Nov 2026 (replaced by "Where AI meets the work").
The code is kept in the repo, **unmounted**, so it can be reused (for example in a staffing or recruiting product).

## Files (all untouched)
- `app/RoomWorth.tsx` — the calculator UI: three sliders (people, hours per week on repeat work, hourly cost) and the progressive email gate.
- `app/roomworth.css` — its styles (still imported globally in `app/layout.tsx`; harmless, unused).
- `app/roomEstimatePdf.ts` — builds the one-page "Room Estimate" PDF in the browser with no dependencies.

## What it does
- Arithmetic: `people x hours x 48 working weeks` for yearly hours, times the hourly cost for yearly dollars.
- Free numbers on screen; the PDF asks for a work email and an optional tool list.
- On download it POSTs to `/api/contact` (Resend) with a custom subject, so the owner is notified.
- Honest-by-design: it only repeats the visitor's own inputs. It makes no savings promise.

## To bring it back
Import `RoomWorth` into the page or product that needs it. It depends on `/api/contact` and the `RESEND_API_KEY` / `CONTACT_TO` environment variables (see README). Uses `rm-head` / `rm-eyebrow` classes from `app/roommap.css`.

## Git reference
Tag `archive/room-worth-calculator` marks the last commit on `main` that rendered it on the site.
