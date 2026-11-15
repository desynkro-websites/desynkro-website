# Changelog

## v20261115
- Added tunnel-to-my-dash to Favorite Projects

## v20261104
- Fixed Coding category showing 0 projects after grouping
- Fixed cache busting: versioned CSS and JS, HTML now revalidates instead of being cached
- Added gzip compression, security headers, and repo-internal file blocking to nginx
- Added robots.txt, sitemap.xml, and .well-known/security.txt
- Added Open Graph and Twitter meta improvements (site_name, locale, image dimensions, twitter:image)
- Added Schema.org @id links, knowsAbout, and CollectionPage on portfolio
- Preloaded the heading font and added fetchpriority to the hero image
- Paused hero particle animation when the tab is hidden and respect reduced motion

## v20261102
- Reorganized Coding portfolio into sections
- Added pipeweaver-smc-mixer, alpha-pals-also-drop-normal-loot, pals-drop-dog-coins, WCI-Website, and soder-burgers-website to Coding portfolio category

## v20261026
- Added quote-assistant to Coding portfolio category

## v20261006
- Updated "Get To Know Me" Text.
- Added my-fav-cachy-pkgs to Coding portfolio category

## v20260624
- Added RC Electrical website to Websites portfolio

## v20260623
- Added open-converter to Coding portfolio category

## v20260620.2
- Added desynkro-website to Coding portfolio category
- Removed exeldro-website from Coding portfolio category
- Removed hardcoded star counts from coding project cards (no live API)
- Fixed discord-notification-scheduler language to Python

## v20260620.1
- Renamed internal `codeberg` references to `coding` across portfolio-data.js, portfolio.html, and styles.css for consistency with the Coding category title
- Added cache-busting query parameter (`v=20260620.1`) to CSS links in both HTML files

## v20260620
- Added Codeberg social links (dropdown, mobile, footer)
- Added Coding portfolio category with manual project entries
- WebP image optimization (hero, carousel, PFP, portfolio)
- JPEG fallbacks retained via `<picture>` elements
- SEO metadata (Open Graph, Twitter cards, structured data)
- Removed all jQuery/GSAP/slick dependencies (plain JS)
- Removed old single-page HTML generation model
- CSS cleanup: removed dead selectors, duplicates, retired properties
- JS cleanup: removed unused functions, redundant lookups, hoisted variables
- Asset cleanup: deleted unreferenced title_bg.png (1.4MB), wci-dig-thumb.png (304KB)
- BACK button scrolls to feature card
- README.md, CHANGELOG.md, and LICENSE files added
- Added JSON-LD structured data (Person, WebSite, WebPage/BreadcrumbList schemas) for SEO
- Cleaned up meta description and OG/Twitter embed titles 
- "Linux Gamer" changed to "Linux Advocate"

## Initial Version
- Original site upload with all core pages, assets, and infrastructure
