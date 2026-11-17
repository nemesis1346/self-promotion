
# 🎨 Self-Promotion Portfolio  
This is a **React application**: my freelance services and prices page (home), plus my portfolio. It pulls content from my blog and links all my projects and works. The project utilizes:  

- **Firebase**  
- **React** & **Redux-Thunk**  
- **Materialize-CSS**  

---

## 🧭 Services site (since November 2026)

The home page is now a bilingual **freelance services and prices** page. Its style follows [silexio.be/fr#offers](https://silexio.be/fr#offers) (take the style only, never its text or branding).

**Structure**
- `src/components/pages/ServicesPage.js` + `src/components/styles/servicesPage.css`: the home page. It uses a warm light theme scoped under the `.svc` class, its own sticky header, and a burger menu under 1080px.
- Sections, in order: hero, 4 services (AI automation & agents, Auth0 / identity, blockchain, full-stack apps), price table, about + experience timeline + credentials + CV link, FAQ, contact.
- `src/content/services.js`: **all page text and prices**, in English and French. Edit text here, not in the components.
- `src/content/LangContext.js`: language switch (FR/EN toggle). **French is the default**; the visitor's choice is saved in localStorage (`mm-site-lang`).
- `src/components/pages/ContactForm.js`: the contact form opens the visitor's email app with a pre-filled message (`mailto:`). Nothing is stored or sent to a server.
- The Projects, Web design and Blog pages use the same theme and the shared header.

**Routes** (`src/App.js`, HashRouter): `/`, `/services` and any unknown path → ServicesPage; the old home page is kept at `/home`; `/softwareProjectsPage`, `/webDesignProjectsPage`, `/blogFirebasePage`, `/aboutMePage` are unchanged.

**Prices** (CAD, before taxes; the "from" prices are in `services.js`, approved by Marco on 2026-11-16)

| Item | Price |
| :--- | :--- |
| First call (30 min) | Free |
| Audit | from $750 |
| AI automation | from $1,500 |
| Auth0 / SSO | from $2,000 |
| Smart contract | from $3,000 |
| Web app | from $6,000 |
| Support | from $300/month |
| Hourly consulting | from $95/hour |

To change prices, set `PRICES_ARE_DRAFT = true` in `services.js` (shows a yellow "DRAFT" banner) until the new prices are approved, then set it back to `false`.

**Domain**
- The site is served at **https://marcomaigua.logicielsmm.com** (subdomain of Marco's company domain `logicielsmm.com`; set up 2026-11-17).
- DNS: `logicielsmm.com` is managed at Squarespace Domains (formerly Google Domains). Record: `CNAME marcomaigua → nemesis1346.github.io`, TTL 1 hour. The MX/SPF/DKIM records there are for Google Workspace email; leave them alone.
- `public/CNAME` holds the domain so every `npm run deploy` keeps it on the gh-pages branch (a `CNAME` at the repo root is not deployed). `homepage` in `package.json` must match the domain, or the built site loads its scripts from the wrong path and shows a blank page.
- GitHub repo **Settings → Pages**: custom domain `marcomaigua.logicielsmm.com`, Enforce HTTPS on.
- The old address `nemesis1346.github.io/self-promotion` redirects to the custom domain.

**Content rules**
- Use only facts from Marco's CVs. Keep dates, degree and prices consistent with the CVs, LinkedIn and the GitHub profile README ([nemesis1346/nemesis1346](https://github.com/nemesis1346/nemesis1346)).
- Ask Marco before deploying (`npm run deploy`) or pushing to master.

**Status / history**
- 2026-11-16: commits `801b69e` (services page) and `2dd6d4e` (final prices, French default, contact form, restyled pages) merged into master, pushed, and deployed to https://nemesis1346.github.io/self-promotion/.
- Checked at 1366px desktop and 375px mobile, in French and English, with no console errors. The build has only older lint warnings.

**Open points**
- `.env` (Firebase config) is tracked in git; check that it holds no secrets.
- Naming clients (Desjardins, Okta) on the sales page: keep in mind the Desjardins non-solicitation clause with CorGTA.

---

## 🚀 Versions  
Make sure to use the specified versions below when working within Docker containers to avoid compatibility issues:  

| **Tool**        | **Version**    | **Notes**                                  |
|-----------------|----------------|--------------------------------------------|
| Node            | 20.18.0        |                                             |
| NPM             | 10.8.2         |                                             |
| Sass            | 1.79.5         | Updated to avoid previous compatibility issues |
| NVM             | Node 20.18.0   | Ensure the correct Node version is used    |

---

## 🛠 Installation Steps  

1. From the project root, build and start the container:
```bash
docker compose up --build
```

2. Wait for the output line:
```
Compiled successfully!
```

3. Open your browser at:
```
http://localhost:8080
```

> **Note:** On subsequent runs you can skip `--build` and just use `docker compose up`.

---

## 🌐 Deployment on GitHub Pages  

> **Prerequisites:** Deployment runs locally, not inside Docker. You need Node v20 installed on your machine. Check with `node -v` and switch with `nvm use 20` if needed.

1. Install dependencies locally (only needed once, or after adding new packages):
```bash
npm install
```

2. Build and deploy to GitHub Pages:
```bash
npm run build
npm run deploy
```

⚠️ **Note:** The custom domain is set in `public/CNAME` and `homepage` in `package.json`; keep both the same (see "Domain" above).

---

