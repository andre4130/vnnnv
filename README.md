# VNNNV

Portfolio site for a graphic designer / photographer.

## Stack

- Next.js (App Router) + TypeScript
- Material UI (MUI)
- Deployed on Netlify

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/product` | Product |
| `/visual` | Visual |
| `/about` | About |

Shared `Header` and `Footer` wrap every page via the root layout.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Deploy on Netlify

`netlify.toml` is configured with `@netlify/plugin-nextjs`.

### Option A — Git

1. Push this repo to GitHub/GitLab/Bitbucket
2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing project**
3. Select the repo; build settings are read from `netlify.toml`
4. Deploy

### Option B — CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

## Design notes

Pages start as structured placeholders. Theme tokens live in `app/theme.ts` and will be refined as the visual design is defined.
