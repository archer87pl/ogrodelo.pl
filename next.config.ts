import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
/** Empty for custom domain (ogrodelo.pl); set to /repo-name only for github.io/project URLs */
const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const productionRedirects = [
  {
    source: "/katalog-kwitnienia/roslina/dabrówka",
    destination: "/katalog-kwitnienia/roslina/dabrowka",
    permanent: true,
  },
  {
    source: "/katalog-kwitnienia/roslina/dabr%C3%B3wka",
    destination: "/katalog-kwitnienia/roslina/dabrowka",
    permanent: true,
  },
] as const;

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      ...(githubPagesBasePath
        ? { basePath: githubPagesBasePath, assetPrefix: githubPagesBasePath }
        : {}),
      trailingSlash: true,
    }
  : {
      async redirects() {
        return [...productionRedirects];
      },
    };

export default nextConfig;
