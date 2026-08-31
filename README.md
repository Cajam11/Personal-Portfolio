# Filip Paučo — Portfolio

Personal portfolio site: selected work, capabilities, experience and contact.

Built with **Next.js 14** (App Router), **React 18**, **Tailwind CSS** and **lucide-react**.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

There are no tests — verify changes with `npm run build` and by eyeballing `npm run dev`.

## Structure

| Path | What lives there |
| --- | --- |
| `app/` | Routes: `/` (home), `/work` (archive), `/projects`, and the coffee-counter API |
| `components/` | Page sections and shared UI (theme, reveal-on-scroll, route transition) |
| `data/projects.js` | The five featured projects shown on the home page |
| `lib/projects.js` | The full catalogue used by `/work` and `/projects` |
| `app/globals.css` | The whole design system — tokens, layout and animation |

Light/dark is driven by a `dark` class on `<html>`, with the palette defined as
CSS custom properties at the top of `globals.css`.

## Still to replace

The site is live-ready but a few assets are stand-ins:

- `public/images/projects/*.svg` — placeholder cards; swap in real screenshots and update the paths in `data/projects.js` and `lib/projects.js`
- `public/images/profile.png` — used in the About card (the hero portrait is currently commented out in `components/Portfolio.jsx`)
- `public/resume/Filip_Pauco_Resume.pdf` — placeholder PDF
- Contact form — set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a form endpoint; without it the form falls back to opening the visitor's mail client
