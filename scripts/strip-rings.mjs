import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/lib/constants/hardiness-zones.ts"
);
let s = fs.readFileSync(file, "utf8");
s = s.replace(
  /  \/\*\* Pierścień współrzędnych \[lon, lat\] — uproszczone granice \*\/\n  ring: \[number, number\]\[\];\n/,
  ""
);
s = s.replace(/    ring: \[[\s\S]*?\],\n/g, "");
fs.writeFileSync(file, s);
console.log("Done");
