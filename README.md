# Chun Xue Website

Final bilingual company website, synchronized from website-astra on 2026-10-05.

Cloudflare Worker name: `cxweb`. Static asset directory: `outputs`.
Deploy command: `npx wrangler deploy`. No build command is required.
All website files and optimized images are committed inside `outputs`; archives, original large photos and local preview files are excluded.

Pages: index.html, aboutus.html, process.html, collection.html, responsibility.html, contact.html.
The legacy factory.html address redirects to aboutus.html.
HTML handling is set to `none` to preserve the existing .html page URLs.
The outputs/_redirects rule serves index.html at / with a 200 response.
