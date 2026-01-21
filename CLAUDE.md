# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ficuz 2026 Leaderboard - A multilingual leaderboard application for tracking player points and penalties.

## Tech Stack

- **Framework:** Astro 5 with SSR via `@astrojs/cloudflare` adapter
- **Styling:** TailwindCSS 4
- **Hosting:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite-compatible)
- **ORM:** Drizzle ORM with d1-http driver

## Commands

```bash
# Development
npm run dev              # Build and start local dev server with Wrangler

# Deployment
npm run deploy           # Build and deploy to Cloudflare Workers

# Database migrations
npm run db:migrate       # Generate and apply migrations to remote D1
npm run db:migrate:local # Generate and apply migrations to local D1

# Linting
npm run lint             # Run Prettier formatting
```

## Database Management Scripts

Scripts in `/scripts` use the Cloudflare D1 HTTP API (requires `.env` with CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, CLOUDFLARE_D1_TOKEN):

```bash
# Create a player
npx tsx scripts/players.ts create "Player Name"

# Set/add points (use 'set' or 'add' as second argument)
npx tsx scripts/points.ts "Player Name" set 10
npx tsx scripts/points.ts "Player Name" add 5
```

## Architecture

```
src/
├── components/     # Astro components (Leaderboard.astro)
├── db/
│   ├── schema.ts   # Drizzle schema (players table)
│   └── index.ts    # Database initialization
├── i18n/
│   ├── utils.ts    # Translation helper function
│   └── translations.ts  # EN/IT translations
├── layouts/        # Base HTML layout
├── pages/
│   ├── index.astro      # Italian locale (default)
│   └── en/index.astro   # English locale
└── styles/         # Global CSS with Tailwind

scripts/            # CLI tools for D1 database management
drizzle/            # Migration files
```

## Key Patterns

- **i18n:** Default locale is Italian (`it`), English at `/en`. Use `useTranslation(lang)` from `src/i18n/utils.ts`
- **Database access:** In Astro pages/components, get the D1 binding from `Astro.locals.runtime.env.DB`
- **Schema changes:** Modify `src/db/schema.ts`, then run `npm run db:migrate` to generate and apply migrations
