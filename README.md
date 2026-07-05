# softerbread cooperative

standalone site for softerbread cooperative, a birthright labs venture pilot.
served from cloudflare workers with static assets — mirrors the mmaadd institute setup.

**domain:** softerbread.org

## structure

```
softerbread/
├── wrangler.jsonc              worker config + static asset binding + custom-domain routes
├── package.json                wrangler tooling
├── src/index.js                worker entry — alias + external redirects
├── README.md
└── public/
    ├── index.html              long-scroll home
    ├── start-something/        butter diagnostic
    ├── sell-something/         butter diagnostic
    ├── fund-something/         butter diagnostic
    ├── 404.html
    ├── favicon.svg
    ├── og.png                  1200×630 open-graph image
    ├── robots.txt
    ├── sitemap.xml
    └── bakers/simone.jpg       photo asset for the current-bakers-in-residence card
```

## routes

- `/` — long-scroll home (identity intro, softens, three parts, butter, baked goods, bakery, join, support)
- `/start-something`, `/sell-something`, `/fund-something` — the three interactive butter diagnostics
- `/butter`, `/bakery`, `/baked-goods`, `/join`, `/support`, `/apply` — worker redirects to `/#anchor` on the home page
- `/the-bakery` — legacy redirect to `/#bakery`
- `/labs`, `/give` — external redirects to thebirthrightproject.org

## forms

both the bakery application form (`#join`) and the support form (`#support`) post to formspree endpoint `https://formspree.io/f/xjgqjodq`. two hidden fields distinguish submissions:

- `_subject` — sets the email subject line (`softerbread — bakery application` or `softerbread — support inquiry`)
- `form_source` — machine-friendly source tag (`bakery-apply` or `bakery-support`)

each form has its own inline success message (the join form thanks the applicant and explains review-by-hand; the support form thanks the sender and promises follow-up).

## paid CTAs

diagnostic result screens include three paid CTAs — action plan ($5.40), pack ($54), build ($540). until final stripe / payment links are set up, all three route to `/#support` so users can request early access. to go live with real checkout, swap the `checkoutUrls` values in each diagnostic's `DIAG` config.

files to edit:
- `public/start-something/index.html`
- `public/sell-something/index.html`
- `public/fund-something/index.html`

look for:
```js
"checkoutUrls":{"actionPlan":"/#support","pack":"/#support","build":"/#support"}
```

replace each value with the corresponding stripe / gumroad / payment URL.

## deploy

```bash
npm install
npx wrangler login
npx wrangler deploy
```

then in the cloudflare dashboard, confirm the custom-domain routes for `softerbread.org` and `www.softerbread.org` are attached to the worker. wrangler.jsonc already declares them; the dashboard needs to complete the DNS handshake.

## local dev

```bash
npx wrangler dev
```

## why workers over pages

matches the mmaadd institute setup. the worker script gives us clean control over the alias-redirect pattern (`/butter` → `/#butter`, etc.) without needing `_redirects` files or edge functions.

## notes on architecture

- long-scroll pattern matches happy sunday and mmaadd institute
- diagnostics stay as separate routes because they're stateful multi-step experiences
- one venture wrap at the bottom of the home page; each diagnostic keeps its own wrap since it's a standalone URL
- sticky nav on every page; on diagnostics it shows softerbread + links to the home page's section anchors
- forms use progressive enhancement: `<form action method="POST">` works without JS; JS upgrades to inline status messages
- 501(c)(3): the birthright project · EIN 99-3166732

## for questions

hello@thebirthrightproject.org
