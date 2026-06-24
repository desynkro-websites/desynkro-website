# Changelog

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
