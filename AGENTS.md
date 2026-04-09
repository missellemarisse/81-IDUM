# AGENTS.md

## Cursor Cloud specific instructions

This is a static HTML/CSS/JS website for **81-IDUM** (School #81 in Tashkent, Uzbekistan). There is no build step, no package manager, no backend, and no database.

### Running the site

Serve the site with any static HTTP server from the repo root:

```bash
python3 -m http.server 8080 --directory /workspace
```

Then open `http://localhost:8080/` in a browser.

### Key notes

- **No dependencies to install** — there is no `package.json`, `requirements.txt`, or similar.
- **No lint/test/build tools** — there are no configured linters, test frameworks, or build systems in this repo.
- External assets (Font Awesome, Google Fonts) are loaded via CDN `<link>` tags; no local install needed.
- Forms (login, register, contact) are **client-side demo only** — they show alerts but do not call any backend API.
- Comments and likes on news pages are **in-memory JS only** (not persisted).
- The homepage references a background video at `./img/PixVerse_V5.6_Image_Text_540P_tiriltirib_ber.mp4`. If this file is missing, the hero section still loads but without the video background.

### File structure

| Path | Description |
|------|-------------|
| `*.html` | 9 HTML pages (index, about, courses, new, teachers, contact, signin, register, show) |
| `css/style.css` | Single stylesheet (~3,300 lines) |
| `js/script.js` | Single JS file (~1,200 lines, handles all pages) |
| `img/` | Static image and video assets |
