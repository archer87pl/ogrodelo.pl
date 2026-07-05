import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/lib/constants/hardiness-zones.ts"
);
let s = fs.readFileSync(file, "utf8");

s = s.replace(
  /export function projectPoland\(lon: number, lat: number\): \[number, number\] \{\n  \{\n    id:/,
  "export const VOIVODESHIP_ZONES: VoivodeshipZone[] = [\n  {\n    id:"
);

// Remove orphaned ring coordinate lines left after partial strip
s = s.replace(/\n\s+\[\d+\.?\d*, \d+\.?\d*\],/g, "");

fs.writeFileSync(file, s);
console.log("Fixed hardiness-zones.ts");
