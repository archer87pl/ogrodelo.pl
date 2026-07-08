import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/ogrodelo.pl";

writeFileSync(join(outDir, ".nojekyll"), "");

const indexPath = join(outDir, "index.html");
copyFileSync(indexPath, join(outDir, "404.html"));

function createRedirect(relativeDir, targetPath) {
  const dir = join(outDir, relativeDir);
  mkdirSync(dir, { recursive: true });
  const url = `${basePath}${targetPath}/`;
  const html = `<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${url}" />
    <link rel="canonical" href="${url}" />
    <script>location.replace("${url}")</script>
  </head>
  <body>
    <p><a href="${url}">Przekierowanie…</a></p>
  </body>
</html>`;
  writeFileSync(join(dir, "index.html"), html);
}

createRedirect("katalog-kwitnienia/roslina/dabrówka", "/katalog-kwitnienia/roslina/dabrowka");
createRedirect("katalog-kwitnienia/roslina/dabr%C3%B3wka", "/katalog-kwitnienia/roslina/dabrowka");

console.log("GitHub Pages post-build complete.");
