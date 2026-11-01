#!/usr/bin/env node
// Add or replace a walking trail on the Map of Traditions from a GPX file.
// Usage: node scripts/gpx-to-trail.mjs <file.gpx> <id> "<Trail name>"
// Reads every <trkpt lat=".." lon=".."> (or <rtept>) point, thins it to about 1 point per 3 m,
// and writes it into src/data/trails.json with status "gps" (drawn as a solid line).
import fs from "node:fs";
import path from "node:path";

const [gpxFile, id, name] = process.argv.slice(2);
if (!gpxFile || !id) {
  console.error('Usage: node scripts/gpx-to-trail.mjs <file.gpx> <id> "<Trail name>"');
  process.exit(1);
}
const xml = fs.readFileSync(gpxFile, "utf8");
const pts = [...xml.matchAll(/<(?:trkpt|rtept)\b[^>]*?lat="([-\d.]+)"[^>]*?lon="([-\d.]+)"|<(?:trkpt|rtept)\b[^>]*?lon="([-\d.]+)"[^>]*?lat="([-\d.]+)"/g)].map((m) =>
  m[1] ? [Number(m[2]), Number(m[1])] : [Number(m[3]), Number(m[4])]
);
if (pts.length < 2) {
  console.error("No track points found in", gpxFile);
  process.exit(1);
}
const meters = (a, b) => {
  const dy = (b[1] - a[1]) * 111320;
  const dx = (b[0] - a[0]) * 111320 * Math.cos((a[1] * Math.PI) / 180);
  return Math.hypot(dx, dy);
};
const thin = [pts[0]];
for (const p of pts.slice(1)) if (meters(thin[thin.length - 1], p) >= 3) thin.push(p);
if (thin[thin.length - 1] !== pts[pts.length - 1]) thin.push(pts[pts.length - 1]);
const coords = thin.map(([lng, lat]) => [Math.round(lng * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6]);

const file = path.join(process.cwd(), "src/data/trails.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const trail = { id, name: name || id, status: "gps", source: path.basename(gpxFile), coords };
const i = data.trails.findIndex((t) => t.id === id);
if (i >= 0) data.trails[i] = { ...data.trails[i], ...trail };
else data.trails.push(trail);
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`${i >= 0 ? "Replaced" : "Added"} ${id}: ${coords.length} points (from ${pts.length})`);
