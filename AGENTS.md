# AGENTS.md

Multilingual leaderboard app (Astro + Cloudflare D1) for tracking player points and penalties.

## Commands

```bash
npm run db:migrate        # Apply migrations to remote D1
npm run db:migrate:local  # Apply migrations to local D1
```

## Key Patterns

- **i18n:** Default locale is Italian, English at `/en`. Use `getTranslations(locale)` helper.
- **Database:** Access D1 via `Astro.locals.runtime.env.DB`
- **Scripts:** CLI tools in `scripts/` manage D1 data via HTTP API
