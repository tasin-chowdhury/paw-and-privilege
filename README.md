# Paw & Privilege

Bangladesh's most exclusive, verified pet-care marketplace — a platform where product sellers, foster homes, doctors/vets, and groomers/trainers/breeders apply, get personally verified by an admin team, and only then go live for buyers to discover. Not a direct-sale store — a curated multi-sided marketplace, styled to a fin.com-level premium bar.

## What's been done (Phase 1 — design & UI, mock data)

Everything below is built and working locally, but runs on **mock/in-memory data only** — nothing is saved permanently yet, and there's no real login, payments, or messaging behind it. This phase exists to nail the look, structure, and every user flow before wiring up real infrastructure.

**Stack:** Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui (Base UI primitives), Framer Motion, Zustand, react-hook-form + zod.

**Three surfaces, all built out:**

- **Public marketplace** — home (with your hero video + logo), shop by species (dog/cat/bird/fish) and category (dry food, wet food, treats, toys, accessories, medicine), listing detail pages, verified vet directory with a 24/7 chat preview, grooming & training directory with a booking form, foster directory with an inquiry form, membership/pricing page, about page, cart, and a preview checkout flow.
- **Provider portal** (`/provider/*`) — role picker + application form (seller / foster / vet / groomer-trainer-breeder), a dashboard with a live verification-status banner and free-trial countdown, listings management (with a "submit new listing" form), bookings/orders table, and an earnings page showing commission math.
- **Admin console** (`/admin/*`) — a review queue where pending provider applications and listings can be approved or rejected (with a reason), plus full tables of all providers and all listings.

**Design system:** ink/ivory base with emerald + gold accents, Fraunces (display) + Inter (body) type pairing, full-bleed alternating light/dark sections, scroll-triggered reveals, a persistent dark navbar with your logo, your 4 species photos on the homepage, and your hero video as the homepage background with a poster frame for fast first paint. Both the provider portal and admin console collapse into a mobile drawer nav on small screens.

**How the demo "verification loop" works right now:** there's no real database, so approvals/rejections live in an in-browser store (Zustand) for the current session — approve or reject something in `/admin/review-queue` and the provider's dashboard updates instantly, which is meant to prove out the *flow* before it's wired to something permanent. A "Viewing as" switcher in the provider portal sidebar lets you preview different mock providers (approved/pending/rejected) without a real login.

## The plan — what comes next

- **Phase 2 — real backend.** Replace the mock data layer with a real database and real authentication (planned: Supabase — Postgres + Auth + Storage), so accounts, listings, and verification decisions actually persist, and providers can upload real photos/documents.
- **Phase 3 — payments & live features.** Real checkout via a Bangladesh payment aggregator (planned: SSLCommerz, which covers bKash/Nagad/Rocket/cards), real-time vet chat, and a real booking/calendar system for grooming & training — replacing today's "preview" versions of each.

## What's pending / not yet real

- **No real accounts** — login/signup pages are visual only; the "Viewing as" switcher is a Phase-1 stand-in for real authentication.
- **No persistence** — all data (providers, listings, bookings) resets whenever the server restarts.
- **No real payments** — checkout completes as a preview with a clear on-screen note; no money actually moves.
- **No real vet chat** — the chat UI is a working preview but isn't connected to an actual doctor on the other end.
- **No image upload** — providers can't yet attach real photos to a listing or application; everything uses placeholder art or the images you've supplied for the homepage.
- **Business/ops steps outside of code:** an SSLCommerz or bKash merchant account requires business registration before real payments can go live, and 24/7 vet chat needs actual on-call veterinarians staffed on your end — those are operational steps, not something that gets built in code.

## Running it locally

```
npm install
npm run build && npm run start   # production preview (recommended — much faster than dev mode on this machine)
# or
npm run dev                      # dev mode with hot reload, slower first load
```

Site runs at `http://localhost:3000`.
