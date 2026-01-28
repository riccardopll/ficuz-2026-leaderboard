import { defineConfig } from "drizzle-kit";
import { readdirSync } from "fs";

const d1Dir = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
const files = readdirSync(d1Dir).filter((f) => f.endsWith(".sqlite"));

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${d1Dir}/${files[0]}`,
  },
});
