import { buildRssFeed, getRssItems } from "@/lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const feed = buildRssFeed(getRssItems(60));

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
