# CUEPA Site — Handoff to Claude Code

Written by Claude (claude.ai). I have no terminal/network access in that environment —
everything below was written and visually spot-checked as static HTML/CSS in a
sandbox, but **never actually run through `npm install` / `npm run dev` / a real
browser with JavaScript executing**. You have terminal + network access. Your first
job is to make it run for real, verify it against what's described here, and fix
whatever breaks.

---

## 0. Do this first, before reading anything else

```
cd CUEPA-site-handover
npm install
npm run dev
```

Open the local URL (usually `http://localhost:3000`). Confirm:
- It builds with no errors in the terminal
- No red errors in the browser console
- The page renders top to bottom with no visibly broken/missing sections

The most likely first failure point is the `motion` package — it was added to
`package.json` by hand, never installed, never exercised. If `npm install` fails on
it, check the version pin (`"motion": "^11.15.0"`) is actually resolvable; if not,
loosen it to whatever `npm info motion versions` shows as current.

---

## 1. Who this is for

Small-business owner named Marcos (site persona: he's "the owner" the copy speaks to,
but he's also literally the person you're working for). Non-technical. Communicates
in short, blunt messages, often from mobile. Wants to see results, not explanations of
what you're about to do — confirm before big structural changes, but don't over-ask
either. He will tell you directly and bluntly when something's wrong; take it, fix it,
move on, no need to over-apologize.

The site: CUEPA, an AI workflow product for small-business owners. Brand line:
"Human-centered intelligence" / "Making room for what matters." Tone: warm on the
surface, rigorous underneath — proof over hype (see `claude/cuepa-brand-voice-
guidelines.md` in project knowledge for the full voice doc, though note its font/color
specifics are stale — see §4).

---

## 2. Stack

- **Next.js 16** (`next@16.2.6`), **React 19**, TypeScript
- Plain CSS files imported in `app/layout.tsx` — no CSS-in-JS, no Tailwind used in
  the actual page components (Tailwind is present as a devDependency but not the
  styling approach here — don't introduce Tailwind classes into these components,
  it'll fight the existing plain-CSS cascade)
- **`motion`** (the successor to Framer Motion, imported as `motion/react`) — just
  added, powers the nav's animated tab indicator and the hero's entrance sequence.
  This is the one genuinely new/unverified piece.
- Build/dev tooling is Vite-based under the hood (`vinext`, `@vitejs/plugin-rsc`) —
  don't be surprised the scripts in `package.json` say `vite` for `dev`, that's
  intentional, not a mistake.

---

## 3. Page structure — six acts, exact order, one file per act (mostly)

`app/page.tsx` is the entire page. Order matters and was explicitly locked by the
user in these words: "Assemble it like this so she can't remix the wrong tree...
three donors, six acts, no fourth file." The "three donors" were three different
reference files the user uploaded over the course of the project (a stripped-down
hero/reality mockup, a set of four turquoise-recolored "turn" screens, and a full
previous site build with a fixed "owner control" dashboard section). Those donor
files are gone now — what matters is the resulting six acts below are the complete,
final, locked page. **Do not add back sections from `WorkflowDemo.tsx` or
`ProductEcosystem.tsx`** — those two component files still physically exist in
`app/` but are deliberately not imported anywhere. Leave them alone unless the user
explicitly asks for their content back.

| # | Act | Component(s) | Section id(s) |
|---|-----|---------------|----------------|
| - | Nav | Nav.tsx | (none - fixed overlay, not a scroll section) |
| 1-2 | Hero + Reality | AnimatedIntro.tsx (both sections in one file) | #top, #reality |
| 3 | Four Turns | PracticeHeader.tsx (CHIMAL band + "ONE LINE. FOUR TURNS." title, no id, sits between Reality and FIND) then RoomMap.tsx (=FIND) then Flow.tsx then Prove.tsx then Grow.tsx | #find, #flow, #prove, #grow |
| 4 | One Screen | OwnerControl.tsx (includes the "doorway" tagline - "THE PROCESS IS CONSISTENT. THE SOLUTION IS YOURS." - as the last element inside this same component, not a separate section) | #product |
| 5 | Trust | Trust.tsx | #trust |
| 6 | Ending | Conversation.tsx + a plain footer written inline at the bottom of page.tsx | #conversation (footer has no id) |

Every `.tsx` file in `app/` other than `layout.tsx`, `page.tsx`, `Logo.tsx`,
`WorkflowDemo.tsx`, and `ProductEcosystem.tsx` was purpose-built for one specific act
in this table. `Logo.tsx` is a shared two-block mark + wordmark component, used inside
both `Nav.tsx` and the footer in `page.tsx`.

---

## 4. Brand system - locked, verify against this, don't invent

### Color
Single accent is **turquoise**, three tones:
- Signal `#2DD4BF` - the main accent (lines, active states, numbers)
- Teal Mark `#0F766E` - deeper secondary, used on light UI chips/text
- Tint `#D1FAE5` - pale wash, used as a background fill behind emphasized elements

**Not** clay/orange (`#c46a3a`). Some *project knowledge* docs (`cuepa-hard-rules.md`,
older refinement logs) still say clay is the only accent - that instruction is
**superseded**. The user explicitly walked through a full site recolor from clay to
turquoise earlier in this project's history, then repeatedly confirmed turquoise
across many further rounds of work. If you see clay-orange anywhere in the rendered
site, that's a bug, not a feature to preserve.

### Typography
- **Display**: Anton, loaded via Google Fonts link in `app/layout.tsx`
  (`family=Anton`, no weight param - Anton only ships one weight). **Always set
  `font-weight:400` explicitly** on every CSS rule that uses Anton. This was a real
  bug caught and fixed once already: browsers will synthetically ("faux") bold a
  single-weight font if the CSS asks for `bold`/`700` and no such weight exists,
  which looks noticeably wrong on a display face like Anton. Grep for
  `font-family:'Anton'` across the CSS files if you touch typography - every hit
  should have `font-weight:400` sitting right next to it.
- **Body**: Inter, loaded from the same Google Fonts link
  (`Inter:ital,wght@0,400;0,500;0,600;0,700;1,400`).
- **Body copy is bold** (`font-weight:700`) in every section - hero subcopy, the
  Reality quotes, the "Four Turns" intro paragraphs and beat descriptions, the "One
  Screen" diagnostic line, Trust's paragraph, Conversation's lead line. This was an
  explicit, recent, deliberate request from the user ("each section's copy needs to
  be bold ok?") - already applied throughout `roommap.css`. If you add any new body
  copy anywhere, match this (bold by default).

### Logo
Two solid blocks (white + turquoise) with a fixed one-block-width gap between them,
plus the wordmark "CUEPA" in Inter Bold. Built in `Logo.tsx`, takes `dark` and `size`
props. This is the **only** correct logo. Some older uploaded reference files show a
different circular "swoosh C" icon mark - that was superseded by the two-block mark
partway through the project and should not reappear.

---

## 5. Deep dive: the Motion implementation (the part that's actually new/unverified)

Two separate Motion patterns were implemented, each modeled on a specific
motion.dev example the user linked directly:

- Nav tab indicator -> https://examples.motion.dev/react/tab-select
- Hero entrance -> https://examples.motion.dev/react/hero-stagger

I could not open either URL (no network access) - I implemented these from
first-principles knowledge of what those two named Motion patterns do. **You should
actually open both URLs, compare the real reference implementation against what's
below, and correct anything that diverges from the actual example** (timing,
easing curves, spring config, structure) - treat what's below as a well-informed
first draft, not ground truth.

### 5a. Nav.tsx - full walkthrough

```tsx
"use client";
import {useEffect, useState} from "react";
import {motion} from "motion/react";
import Logo from "./Logo";

const items=[
  {key:"room",label:"Making Room",href:"#top",sections:["top","reality"]},
  {key:"how",label:"How it works",href:"#find",sections:["find","flow","prove","grow"]},
  {key:"dashboard",label:"Dashboard",href:"#product",sections:["product"]}
];
```

Three nav tabs, each mapped to one or more section ids. "Making Room" covers both the
Hero (#top) and Reality (#reality) sections - clicking it or scrolling through
either section should keep it highlighted. "How it works" covers all four Turn
sections. "Dashboard" is just the One Screen section. There's a fourth nav item - the
CTA button "Let's make room" linking to #conversation - but it's rendered
separately (not in this `items` array) because it's styled as a solid pill button,
not a tab, and doesn't participate in the scroll-spy highlighting.

```tsx
const [active,setActive]=useState("room");

useEffect(()=>{
  const sectionToKey:Record<string,string>={};
  items.forEach(it=>it.sections.forEach(s=>{sectionToKey[s]=it.key;}));
  const ids=Object.keys(sectionToKey);
  const els=ids.map(id=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if(!els.length) return;

  const ratios=new Map<string,number>();
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);});
    let bestId="";let bestRatio=0;
    ratios.forEach((r,id)=>{if(r>bestRatio){bestRatio=r;bestId=id;}});
    if(bestId && sectionToKey[bestId]) setActive(sectionToKey[bestId]);
  },{threshold:[0,.15,.3,.5,.75,1],rootMargin:"-92px 0px -40% 0px"});

  els.forEach(el=>observer.observe(el));
  return ()=>observer.disconnect();
},[]);
```

Scroll-spy logic, not Motion-specific - plain `IntersectionObserver`. It watches all
8 section elements at once (top, reality, find, flow, prove, grow, product - note
trust and conversation are NOT in the items.sections lists so they're not watched,
meaning once you scroll past Dashboard into Trust/Conversation the nav will just
keep showing "Dashboard" as active since nothing tells it otherwise. **This is a
real gap, not intentional** - decide with the user whether Trust/Conversation should
get their own tab, or whether "Dashboard" should just be allowed to stay lit for the
rest of the scroll, and fix accordingly.

It builds a `ratios` map of every observed section's current intersection ratio,
picks whichever has the highest ratio right now, and sets `active` to that section's
tab key. The `rootMargin:"-92px 0px -40% 0px"` shrinks the effective "viewport" used
for intersection calculations: -92px off the top (so content hidden under the fixed
nav doesn't count) and -40% off the bottom (so a section barely peeking into view at
the bottom of the screen doesn't immediately steal "active" status - biases toward
whatever's dominating the upper-middle of the viewport, which is more visually
correct).

```tsx
return (
  <nav className="nav-fixed">
    <a className="brand" href="#top"><Logo/></a>
    <div className="navlinks-tabs">
      {items.map(it=>(
        <a key={it.key} href={it.href} className={`navtab ${active===it.key?"is-active":""}`} onClick={()=>setActive(it.key)}>
          {active===it.key && (
            <motion.span
              layoutId="navpill"
              className="navpill"
              transition={{type:"spring",stiffness:420,damping:34}}
            />
          )}
          <span className="navtab-label">{it.label}</span>
        </a>
      ))}
    </div>
    <a href="#conversation" className="nav-cta">Let's make room <span aria-hidden>-&gt;</span></a>
  </nav>
);
```

This is the actual "tab-select" pattern: there's exactly one `<motion.span
layoutId="navpill">` element rendered at a time, always the sibling of whichever tab
is currently active (conditionally rendered via `{active===it.key && (...)}`). When
`active` changes, React unmounts the pill from the old tab's DOM position and mounts
a new one in the new tab's position - but because both share the same `layoutId`,
Motion intercepts this and animates the FLIP (First-Last-Invert-Play) transition
between the two positions instead of just teleporting, using a spring
(stiffness:420, damping:34 - fairly snappy/tight, not floaty). The `onClick`
handler on each tab immediately sets `active` on click too, so the pill responds
instantly to a manual click rather than waiting for the scroll position to catch up
(the scroll-spy will naturally re-confirm/override this once the user actually
scrolls to that section).

CSS (in `app/roommap.css`, search "Persistent nav"):
```css
#top,#find,#flow,#prove,#grow,#product,#trust,#conversation{scroll-margin-top:92px}
.nav-fixed{position:fixed;top:0;left:0;right:0;z-index:100;height:92px;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;background:rgba(3,3,3,.55);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.1)}
.nav-fixed .brand{display:flex;align-items:center}
.navlinks-tabs{display:flex;align-items:center;gap:4px;position:relative}
.navtab{position:relative;display:inline-flex;align-items:center;padding:10px 18px;font-size:12px;letter-spacing:.02em;color:rgba(255,255,255,.65);text-decoration:none;transition:color .25s}
.navtab.is-active{color:#fff}
.navtab-label{position:relative;z-index:2}
.navpill{position:absolute;inset:0;background:rgba(45,212,191,.16);border:1px solid rgba(45,212,191,.5);border-radius:100px;z-index:1}
.nav-cta{display:inline-flex;align-items:center;gap:8px;background:#2DD4BF;color:#030303;font-weight:700;font-size:12px;padding:11px 20px;border-radius:100px;text-decoration:none;white-space:nowrap}
@media(max-width:900px){.navlinks-tabs{display:none}.nav-fixed{padding:0 22px}}
```

Nav is `position:fixed`, 92px tall, semi-transparent dark background with a blur
(backdrop-filter) so it reads well floating over both the dark hero photo and the
lighter sections further down. `scroll-margin-top:92px` on every section id means
clicking a nav link (or any anchor jump) lands the section 92px lower than its exact
top, so the fixed nav doesn't cover the first line of content. **Mobile note**: at
max-width:900px the tabs are hidden entirely (display:none) and only the logo + CTA
remain - there's no mobile menu/hamburger fallback for the tabs. Worth asking the
user whether that's acceptable or whether a mobile nav drawer is needed.

**Things to actually verify once running:**
1. Does the pill visually snap to the right tab on page load (should start on
   "Making Room" since useState("room") is the default)?
2. Does it smoothly slide (not teleport, not overshoot wildly) when you scroll from
   Hero down into the Four Turns section?
3. Does clicking a tab directly jump-scroll AND move the pill immediately, or is
   there an awkward lag where the pill moves before the page has scrolled (or vice
   versa)?
4. What happens once you scroll past Dashboard into Trust/Conversation (see the gap
   noted above)?
5. Compare the spring feel (stiffness:420, damping:34) against the actual
   motion.dev tab-select example and adjust if it's noticeably different - the
   numbers here were reasonable defaults, not measured against the real reference.

### 5b. AnimatedIntro.tsx hero - full walkthrough

```tsx
const heroContainer={
  hidden:{opacity:1},
  show:{opacity:1,transition:{staggerChildren:.14,delayChildren:.1}}
};
const heroChild={
  hidden:{opacity:0,y:26,filter:"blur(8px)"},
  show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.7,ease:[0.22,1,0.36,1]}}
};
```

Standard Motion "orchestration" pattern: a parent variant (heroContainer) with no
visual change of its own (opacity:1 in both states - it's just a stagger
coordinator) but a staggerChildren:.14 (140ms between each child starting its own
animation) and delayChildren:.1 (wait 100ms after the parent mounts before the
first child starts). Each child shares the same heroChild variant: starts 26px
down, invisible, blurred 8px; animates to its natural position, fully opaque, sharp,
over 700ms with an ease-out-heavy cubic bezier ([0.22,1,0.36,1] - starts fast, eases
into place gently, no bounce).

```tsx
<motion.div className="hero2-copy" variants={heroContainer} initial="hidden" animate="show">
  <motion.p className="eyebrow2" variants={heroChild}>HUMAN-CENTERED INTELLIGENCE</motion.p>
  <h1 aria-label="Making room for what matters.">
    <motion.span style={{display:"block"}} variants={heroChild}>MAKING ROOM</motion.span>
    <motion.span style={{display:"block"}} variants={heroChild}>FOR WHAT</motion.span>
    <motion.span style={{display:"block"}} variants={heroChild}>MATTERS.</motion.span>
  </h1>
  <motion.p className="lede2" variants={heroChild}>CUEPA transforms how work moves-returning time, revealing opportunities, and creating capacity for people and businesses to grow.</motion.p>
  <motion.a href="#reality" className="cta2" variants={heroChild}>See how we create room <span aria-hidden style={{fontSize:18}}>-&gt;</span></motion.a>
</motion.div>
```

The parent motion.div wraps everything and declares variants={heroContainer}
initial="hidden" animate="show". Every direct-or-nested motion.* descendant that
also has variants={heroChild} automatically inherits and participates in the
stagger - Motion propagates variant orchestration down the tree without each child
needing its own initial/animate props. Order of appearance in the stagger
sequence: eyebrow -> "MAKING ROOM" -> "FOR WHAT" -> "MATTERS." -> subcopy -> CTA link -
six children, so at staggerChildren:.14 the whole sequence takes roughly
0.1 + 6x0.14 + 0.7 = 1.6s from mount to the last element finishing its own 700ms
animation.

Note the h1 itself is a plain (non-motion) element with an aria-label carrying
the full plain-text headline for accessibility/screen readers, since the visible
content is split across three separate motion.span elements purely for the
staggered reveal - a screen reader shouldn't announce them as three separate lines.

```tsx
<motion.div className="hero2-note" initial={{opacity:0,y:16,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.6,delay:.9,ease:[0.22,1,0.36,1]}}>
```

The glass note card (the "Email from Robert..." card) is deliberately NOT part of the
staggered group - it animates independently with its own initial/animate/
transition, delayed 900ms so it arrives after the headline sequence has mostly
finished, as a small final beat.

**Things to actually verify once running:**
1. Does the stagger feel like the real hero-stagger example, or too slow/fast? The
   140ms stagger interval and 700ms per-child duration were reasonable guesses, not
   measured against the reference.
2. Does the blur-in effect read as intended, or does filter:blur() cause any
   jank/repaint issues in the browser (blur filters can be expensive to animate on
   some GPUs - watch for dropped frames, especially on the large h1 text)?
3. Compare against https://examples.motion.dev/react/hero-stagger directly and adjust
   easing/timing/stagger-interval to match if it's meaningfully different.
4. Does the note card's independent delay (900ms) land at a good moment relative to
   the headline, or does it feel disconnected/arbitrary?

---

## 6. Full file map

```
app/
  layout.tsx          - root layout, loads Google Fonts (Anton + Inter), imports all CSS files
  page.tsx             - the entire page, six acts in order, see section 3
  Nav.tsx              - fixed nav, scroll-spy, Motion tab-select pill (NEW, unverified - see 5a)
  Logo.tsx             - two-block mark + wordmark, shared by Nav and footer
  AnimatedIntro.tsx    - Hero (#top) + Reality (#reality), Motion hero-stagger (NEW, unverified - see 5b)
  PracticeHeader.tsx   - CHIMAL band + "ONE LINE. FOUR TURNS." title (opens Act 3, no id)
  RoomMap.tsx           - FIND section (#find) - first of the four Turns
  Flow.tsx              - FLOW section (#flow)
  Prove.tsx             - PROVE section (#prove)
  Grow.tsx              - GROW section (#grow)
  OwnerControl.tsx      - "One Screen" dashboard mock (#product) + doorway tagline at its end
  Trust.tsx             - Trust section (#trust)
  Conversation.tsx      - chip-picker + mailto form (#conversation) - client component, has local state
  WorkflowDemo.tsx      - UNUSED, not imported, leave alone
  ProductEcosystem.tsx  - UNUSED, not imported, leave alone

  globals.css           - base tokens, hero/nav legacy rules (some superseded, see below), reality, conversation form (old), footer (old)
  humans.css            - misc
  motion-refine.css     - misc animation refinements
  original-demo.css     - WorkflowDemo-specific styles (orphaned along with that component)
  ecosystem.css         - ProductEcosystem-specific styles (orphaned along with that component)
  intro-motion.css      - hero/reality CSS entrance animations (older, mostly superseded by Motion now for the hero; reality section still uses this file's IntersectionObserver-driven CSS reveal, which is separate from and unrelated to the Motion library)
  roommap.css           - THE MAIN FILE. Everything built across this project's later sessions lives here: the FIND/FLOW/PROVE/GROW "rm-*" classes, the OwnerControl "rr*" classes, Trust classes, Conversation classes, the site footer, the persistent nav (5a), and the bold-copy overrides (4). If you're adding new section styles, this is where they belong.

public/
  hero-recital.jpg          - Hero background. Compressed from 3.6MB/2816x1536 down to ~320KB/1800px-wide, q82 JPEG. If you ever replace this image, keep it compressed - the uncompressed original made a self-contained static preview file balloon to 6.4MB and caused visible load jank/a blank-gap rendering bug for the user.
  reality-market.jpeg       - Reality section photo (farmers market)
  find-couple-kitchen.jpg   - FIND section photo
  flow-cubs-game.jpg        - FLOW section photo (also doubled as a hero placeholder briefly during development - ignore any stray references to that, the final hero image is hero-recital.jpg)
  prove-workbench.jpg       - PROVE section photo
  grow-dog-walk.jpg         - GROW section photo
  trust-woman-evening.jpg   - Trust section photo
  hero-couple-dog.png, hero-human-centered.png, human-dinner.png, human-life.png, human-team.png - OLDER/UNUSED photos from earlier in the project, not referenced by any current component. Safe to ignore or clean up, but check for references before deleting.
```

---

## 7. Known open items / honest gaps

1. **Nav scroll-spy doesn't cover Trust or Conversation** (see 5a) - once scrolled
   past Dashboard, the nav will keep "Dashboard" highlighted indefinitely. Needs a
   product decision from the user (add tabs for those sections? let Dashboard stay
   lit? something else?) and then an actual fix.
2. **Conversation section photo is a placeholder** - Conversation.tsx renders a
   dark box with the text "Human photo" where a real photo should go. The source
   material this was ported from only had an FPO (for-position-only) placeholder
   here too, so this was never resolved upstream either. Needs a real photo from the
   user.
3. **Mobile nav has no fallback for the tabs** - they just disappear under 900px,
   leaving only logo + CTA button. No hamburger/drawer exists. Ask before building
   one - might be intentional minimalism, might be an oversight.
4. **Everything Motion-related is unverified** - see section 5 in full. This is the
   main thing you're here to check.
5. **Project knowledge docs are stale** - cuepa-hard-rules.md and
   cuepa-brand-voice-guidelines.md (and an older refinement log) still describe
   clay/orange as the brand accent and Archivo Black as the display font. Both are
   superseded - see section 4. Don't "fix" the live site to match those docs; if
   anything, flag to the user that those docs need updating to match the live site,
   not the other way around.
6. **No automated tests actually run** - package.json has a test script
   (npm run build && node --test tests/*.test.mjs) but nothing in this handoff
   confirms it passes or that a tests/ directory with real coverage exists. Check.

---

## 8. How the user likes to work

- Confirm before big/structural rewrites; don't silently redo whole sections without
  a heads up.
- Show your work - verify things actually render/run correctly before declaring
  something done. Screenshots, computed-style checks, whatever's appropriate.
- Keep explanations short and non-technical by default; he can ask for more depth if
  he wants it.
- If you make a mistake, say so plainly and move on - no excessive apologizing, no
  over-explaining.
- He's often on mobile. Long code dumps in chat aren't useful to him - deliverables
  (files, working features) matter more than explanations of process, though a short
  plain-English summary of what changed is always welcome.
