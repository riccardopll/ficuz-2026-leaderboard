import "dotenv/config";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { eq } from "drizzle-orm";
import { players } from "../src/db/schema";

const [action, id, pts] = process.argv.slice(2);
if (!action || !id || !pts) {
  console.error("Usage: tsx scripts/points.ts <set|add> <player_id> <points>");
  process.exit(1);
}

const db = drizzle(async (query, params, method) => {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql: query, params }),
    },
  );
  const data: any = await res.json();
  if (!data.success) throw new Error(data.errors[0]?.message ?? "D1 error");
  const rows = (data.result[0]?.results ?? []).map((r: any) =>
    Object.values(r),
  );
  return { rows: method === "get" ? (rows[0] ?? []) : rows };
});

const player = await db.select().from(players).where(eq(players.id, +id)).get();
if (!player) {
  console.error(`Player ${id} not found`);
  process.exit(1);
}

const newPoints = action === "set" ? +pts : player.points + +pts;
await db.update(players).set({ points: newPoints }).where(eq(players.id, +id));
console.log(`${player.name}: ${player.points} → ${newPoints}`);
