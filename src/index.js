// softerbread worker
// serves static assets from /public and handles alias redirects
// for the four "pages" (butter, bakery, baked goods) that live as
// sections on the main scroll. diagnostics (start/sell/fund) are
// real static routes at /start-something etc.

const SECTION_ALIASES = {
  '/butter': '/#butter',
  '/butter/': '/#butter',
  '/bakery': '/#bakery',
  '/bakery/': '/#bakery',
  '/the-bakery': '/#bakery',       // legacy path
  '/the-bakery/': '/#bakery',
  '/baked-goods': '/#baked-goods',
  '/baked-goods/': '/#baked-goods',
  '/join': '/#join',
  '/join/': '/#join',
  '/apply': '/#join',              // friendly alias
  '/apply/': '/#join',
  '/support': '/#support',
  '/support/': '/#support',
};

// external redirects to the birthright project
const EXTERNAL = {
  '/labs': 'https://thebirthrightproject.org/labs',
  '/labs/': 'https://thebirthrightproject.org/labs',
  '/give': 'https://thebirthrightproject.org/give',
  '/give/': 'https://thebirthrightproject.org/give',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // section-anchor redirects
    if (SECTION_ALIASES[path]) {
      return Response.redirect(url.origin + SECTION_ALIASES[path], 302);
    }

    // external redirects (birthright labs, give)
    if (EXTERNAL[path]) {
      return Response.redirect(EXTERNAL[path], 302);
    }

    // everything else → static assets (index.html, /start-something, etc.)
    return env.ASSETS.fetch(request);
  },
};
