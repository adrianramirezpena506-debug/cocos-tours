# Coco’s Tours content audit

Audit date: 2026-07-15. Primary sources: the current public website, WordPress REST endpoints and XML sitemaps, plus the official Facebook, Instagram and TripAdvisor profiles. The published website was read only; no form was submitted and no live content was changed.

## Verified company details

- Business: Coco’s Tours.
- Purpose: “Conectar almas con el mar.”
- Phone and WhatsApp: +506 8876-9354.
- Email: cocostourscrc@gmail.com.
- Address: 200 metros oeste del muelle del ferry, Barrio El Carmen, Puntarenas, Costa Rica.
- Facebook: https://www.facebook.com/cocospuntarenas
- Instagram: https://www.instagram.com/cocostourscr/
- TripAdvisor: https://www.tripadvisor.com/Attraction_Review-g309287-d15606337-Reviews-Coco_s_Tours-Puntarenas_Province_of_Puntarenas.html
- Published values: family and faith, sustainability, commitment, social support, local legacy, community development and preservation of traditions.

## Published tours preserved

| Tour | Published price | Schedule / duration | Availability / group rule |
|---|---:|---|---|
| Parque Nacional Isla San Lucas | ₡30.000 | 8:00–11:30 or 12:00–15:30; 3½ h | Year-round |
| Tour Isla Tortuga | ₡35.000 | 8:30–16:00; approx. 7½ h | Year-round |
| Tour Bioluminiscencia | ₡30.000 | 16:30–21:00; approx. 4½ h | New moon each month |
| Isla Tortuga + Bioluminiscencia | ₡50.000 | 8:30–21:00; approx. 12½ h | New moon each month |
| San Lucas + Isla Venado + Playa Esmeralda | ₡40.000 | 8:30–16:00; approx. 7½ h | Year-round |
| San Lucas + Playa Esmeralda o Hacienda Vieja | ₡40.000 | 8:30–16:30; approx. 8 h | Year-round |
| Tour Privado Tesoros del Golfo | ₡50.000 | 8:30–17:30; approx. 9 h | Minimum 6; current page says US$50 per additional guest |
| Pesca Deportiva Inshore | Quote required | 7:00–12:00 or 7:00–16:00 | Minimum 4 |
| Pesca Deportiva Offshore | Quote required | 7:00–16:00; approx. 9 h | Minimum 4 |

Commonly published inclusions include parking, bottled water and tropical fruit. Exact meals, guide service, snorkelling equipment and fishing equipment remain tour-specific in `src/data/tours.ts`. Published considerations about babies, nearby public transport, pregnancy and variable pricing are retained. Safety statements are attached only to tours whose current pages publish navigability documents, insurance, certified personnel, life jackets and Coast Guard radio communication.

## Booking and account functions

- Current enquiries use `wp-admin/admin-ajax.php`; bookings post into TourMaster payment routes.
- Login and registration post into WordPress and rely on cookies/reCAPTCHA.
- Guest booking, account status tracking, post-trip ratings and wishlist are TourMaster/WordPress functions and are not portable without backend credentials and CSRF/payment integration.
- The redesign therefore creates structured WhatsApp requests and explicitly states they are not confirmations.
- Login and registration remain available as secondary external links to the live site. No live endpoint is called from the redesign.

## Journal

All 15 published article topics and dates are present in the bilingual journal data. Articles were edited into concise, natural Spanish and English editions. Placeholder contact text, testimonial names not traceable to the official review profile, unverified guarantees, and language suggesting guaranteed wildlife were removed rather than repeated. Current operational details are linked back to the structured tour data.

## Testimonials

Four testimonials displayed by the existing homepage were retained and attributed to the official TripAdvisor profile. Aggregate rating and review counts were intentionally not hardcoded or included in structured data because they change over time.

## Media inventory

- Actual logo downloaded from the current WordPress library.
- One public company MP4 downloaded for the hero, with an authentic tour photograph as its poster/fallback.
- Nine current featured tour images downloaded locally.
- Additional current-site photographs downloaded for islands, marine life, fishing, culture, people and bioluminescence.
- Responsive AVIF and WebP versions generated at 640, 960 and 1440 pixels.
- No WordPress images are hotlinked by the finished React interface.
- No AI-generated or unrelated stock tourism images are used.
- The current gallery exposes limited captions and almost no alt text; meaningful bilingual descriptions were written from visible content.

## Current-site issues cleaned

Duplicate headers and navigation, empty `0` counters, repeated prices, malformed `A ₡ 30,000` formatting, mixed-language form text, duplicate account prompts, fake urgency counters, dead legal links, theme-demo routes and technical TourMaster wording were not carried into the redesign. No cancellation policy was found, so none was invented.
