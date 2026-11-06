# Jabir Hussain — Portfolio

Static site (HTML, CSS, JavaScript). No build step, no dependencies.

## What changed in this update
- **Posters** now show your 6 original posters in a responsive masonry gallery, with titles, categories and descriptions, hover effects and a fullscreen lightbox with next/previous navigation.
- **Logos** now show your 6 original logos as interactive 3D flip cards. The front shows the untouched PNG; the back shows concept, design notes, colours, typography and tools.
- Everything else (hero, About, Work, Tools, Process, Experience, Contact, animations, cursor, navigation) is unchanged. `style.css`, `fx.css`, `script.js` and `fx.js` are byte-for-byte identical to your original files.
- The six `sample-*.svg` placeholders were removed.

Files touched: `gallery.js`, `gallery.css`, `index.html` (the Posters/Logos heading and note text only), `README.md`, and the contents of `assets/posters/` and `assets/logos/`.

## Run locally
**Quick:** double-click `index.html`.
**Recommended** (behaves like a real host):
```
cd portfolio
python3 -m http.server 8000
```
then open http://localhost:8000

## Publish on GitHub Pages
1. Create a public repo (e.g. `jabir-portfolio`, or `<username>.github.io` for a root URL).
2. Upload everything inside this folder (`index.html`, the `.css` and `.js` files, `assets/`) — keep the folder structure.
3. Repo **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. After about a minute the site is live at `https://<username>.github.io/<repo>/`.

All paths are relative, so the site works from any folder or sub-path.

## Folder structure
```
index.html  style.css  fx.css  gallery.css  script.js  fx.js  gallery.js  README.md
assets/
  profile.png  favicon.png  apple-touch-icon.png
  posters/   <name>.webp (full size)  +  <name>-thumb.webp (900px grid thumbnail)
  logos/     <name>.png  (your original transparent PNGs, unmodified)
```

## Edit or add content
Open `gallery.js`. The two editable lists, `POSTERS` and `LOGOS`, are at the top.

**Add a poster**
1. Put the full image and a 900px-wide thumbnail in `assets/posters/` (WebP, JPG or PNG all work).
2. Add an object to `POSTERS`: `src`, `thumb`, `w`, `h` (the image's pixel width and height — this reserves the exact aspect ratio so nothing is cropped or stretched), `title`, `cat`, `tools`, `alt`, `desc`.

**Add a logo**
1. Put a transparent PNG in `assets/logos/`.
2. Add an object to `LOGOS`: `name`, `cat`, `src`, `c` (brand colour used to tint the back face), `concept`, `design`, `colors` (`[['#HEX','Name'],…]`), `type`, `tools`.

Order in the list = order on the page.

## Please review the written content
The descriptions, concepts, typography notes and tools were written from what is visible in your artwork and the toolkit listed on your site. I can't see your source files, so please check:
- **Tools** (Photoshop / Illustrator) — edit `tools` if a piece used something else.
- **Typography** — described by style (e.g. "high-contrast serif"), not by font name. Replace with exact font names if you want.
- **Concepts** — my reading of each mark. Adjust the wording to match your actual intent for each brand.
- **Colour hex codes** — sampled from your logo PNGs.

## How it works
- **Masonry:** columns are built in JavaScript from each poster's real width/height (shortest column first), so the layout is stable before images load. 3 columns on desktop, 2 on tablet, 1 on phones.
- **Lightbox:** click, tap, or press Enter on a poster. Navigate with the arrow buttons, ← → keys, or swipe. Esc, the ✕ button or clicking the image closes it. Focus returns to the poster you opened.
- **Flip cards:** hover on desktop, keyboard focus (Tab), or tap on touch devices. Tap again to flip back.
- **Images:** posters are served as WebP (thumbnail in the grid, full size in the lightbox). Total poster payload is ~2 MB instead of ~20 MB. Logos are your original PNGs, so colours and transparency are untouched.
- **Accessibility:** posters and logo cards are keyboard-focusable, the lightbox traps focus, images have descriptive alt text, and `prefers-reduced-motion` is respected.

## Browser support
Current Chrome, Edge, Safari (16.2+), Firefox (113+). Needs CSS `color-mix()` and WebP.

## Your original poster files
The full-resolution original PNGs are in the separate `Jabir_Posters.zip` (`originals/` folder). They are not part of the site to keep it fast.

## Project manager & GitHub upload (`manage.html`)
A real GitHub integration — it needs the included Node server because OAuth requires a secret that must never be in front-end code. (GitHub Pages / static hosting can show the portfolio but not this feature.)

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**. Homepage `http://localhost:8000`, callback `http://localhost:8000/auth/callback`.
2. Run (Node 18+):
```
GITHUB_CLIENT_ID=xxxx GITHUB_CLIENT_SECRET=yyyy node server/server.js
```
3. Open http://localhost:8000/manage.html → **Continue with GitHub**.

Security: the token stays in server memory behind an HttpOnly cookie (never sent to the page); OAuth `state` is checked; POSTs need a custom header; file types and size (25 MB) are validated server-side. For deployment set `BASE_URL` to your https URL and use that for the OAuth callback. Sessions are in memory, so they reset when the server restarts.
Publishing creates one commit containing the files and a `project.json` under `projects/<title>/`.

## Latest edits
- Logo cards renamed to **OUTSPORTS** and **ZENTRO** (the artwork itself already read OUTSPORTS / ZENTRO — the basketball is the O, the slashed O is the O).
- Contact: language line removed, editorial panel added. Footer: copyright replaced with the design statement.
