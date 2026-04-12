import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "@supabase/supabase-js/cors";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

const domainSearchQueries: Record<string, string[]> = {
  technology: ["software development course for beginners", "programming tutorials full course", "web development bootcamp"],
  business: ["business management course", "entrepreneurship tutorial", "digital marketing full course"],
  creative: ["UI UX design course for beginners", "graphic design tutorial", "creative design masterclass"],
  healthcare: ["medical science course", "healthcare fundamentals", "human anatomy course"],
  science: ["physics course for beginners", "scientific research methods", "chemistry fundamentals course"],
  social: ["public speaking course", "teaching skills tutorial", "communication skills masterclass"],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
    if (!YOUTUBE_API_KEY) {
      return new Response(JSON.stringify({ error: "YouTube API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { domain, maxResults = 8 } = await req.json();

    if (!domain || typeof domain !== "string") {
      return new Response(JSON.stringify({ error: "domain is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const queries = domainSearchQueries[domain] || [`${domain} course for beginners`];
    const perQuery = Math.ceil(maxResults / queries.length);

    const allVideos: any[] = [];

    for (const query of queries) {
      const params = new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        videoDuration: "long",
        maxResults: String(perQuery),
        key: YOUTUBE_API_KEY,
        relevanceLanguage: "en",
      });

      const res = await fetch(`${YOUTUBE_API_URL}?${params}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("YouTube API error:", JSON.stringify(data));
        continue;
      }

      for (const item of data.items || []) {
        allVideos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          description: item.snippet.description,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          publishedAt: item.snippet.publishedAt,
        });
      }
    }

    // Deduplicate by video ID
    const unique = [...new Map(allVideos.map((v) => [v.id, v])).values()].slice(0, maxResults);

    return new Response(JSON.stringify({ courses: unique }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
