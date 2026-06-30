import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
