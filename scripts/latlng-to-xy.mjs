#!/usr/bin/env node
// Convert Google Maps lat/lng pins to x/y percent positions on the course map image.
//
// Usage:
//   node scripts/latlng-to-xy.mjs <north> <south> <west> <east> [--write]
//
// north/south are the latitudes of the image's top and bottom edges,
// west/east are the longitudes of its left and right edges (a north-up image).
// Reads src/data/course-stations.json, and for every station with lat and lng,
// prints the computed x/y. With --write, saves them back into the JSON file.
import fs from "node:fs";
import path from "node:path";

const [north, south, west, east] = process.argv.slice(2, 6).map(Number);
const write = process.argv.includes("--write");
if ([north, south, west, east].some((n) => Number.isNaN(n))) {
  console.error("Usage: node scripts/latlng-to-xy.mjs <north> <south> <west> <east> [--write]");
  process.exit(1);
}

const file = path.join(process.cwd(), "src/data/course-stations.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const round = (n) => Math.round(n * 10) / 10;

for (const s of data.stations) {
  if (typeof s.lat !== "number" || typeof s.lng !== "number") continue;
  const x = ((s.lng - west) / (east - west)) * 100;
  const y = ((north - s.lat) / (north - south)) * 100;
  if (x < 0 || x > 100 || y < 0 || y > 100) console.warn(`! ${s.id} falls outside the image`);
  console.log(`${s.id}: x=${round(x)} y=${round(y)}`);
  if (write) {
    s.x = round(x);
    s.y = round(y);
  }
}

if (write) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated", file);
}
