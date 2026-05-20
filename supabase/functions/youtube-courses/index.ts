import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const YOUTUBE_API_URL =
  "https://www.googleapis.com/youtube/v3/search";

const domainSearchQueries: Record<string, string[]> = {
  technology: [
    "software development course for beginners",
    "programming tutorials full course",
    "web development bootcamp",
  ],

  business: [
    "business management course",
    "entrepreneurship tutorial",
    "digital marketing full course",
  ],

  creative: [
    "UI UX design course for beginners",
    "graphic design tutorial",
    "creative design masterclass",
  ],

  healthcare: [
    "medical science course",
    "healthcare fundamentals",
    "human anatomy course",
  ],

  science: [
    "physics course for beginners",
    "scientific research methods",
    "chemistry fundamentals course",
  ],

  social: [
    "public speaking course",
    "teaching skills tutorial",
    "communication skills masterclass",
  ],
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // Get API key from Supabase secrets
    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");

    console.log("API KEY EXISTS:", !!YOUTUBE_API_KEY);

    // Check if API key exists
    if (!YOUTUBE_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "YouTube API key not configured",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { domain, maxResults = 8 } = body;

    // Validate domain
    if (!domain || typeof domain !== "string") {
      return new Response(
        JSON.stringify({
          error: "domain is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Search queries
    const queries =
      domainSearchQueries[domain] || [
        `${domain} course for beginners`,
      ];

    const perQuery = Math.ceil(maxResults / queries.length);

    const allVideos: any[] = [];

    // Fetch videos for each query
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

      let res;

      // Safe fetch handling
      try {
        res = await fetch(
          `${YOUTUBE_API_URL}?${params}`
        );
      } catch (fetchError: any) {
        console.error("Fetch failed:", fetchError);

        return new Response(
          JSON.stringify({
            error: "Failed to connect to YouTube API",
            details: fetchError.message,
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Parse response
      const data = await res.json();

      // Handle YouTube API errors
      if (!res.ok) {
        console.error("YouTube API error:", data);

        return new Response(
          JSON.stringify({
            error: "YouTube API failed",
            details: data,
          }),
          {
            status: res.status,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Extract video data
      for (const item of data.items || []) {
        allVideos.push({
          id: item.id.videoId,

          title: item.snippet.title,

          channel: item.snippet.channelTitle,

          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,

          description: item.snippet.description,

          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,

          publishedAt: item.snippet.publishedAt,
        });
      }
    }

    // Remove duplicate videos
    const uniqueVideos = [
      ...new Map(
        allVideos.map((video) => [video.id, video])
      ).values(),
    ].slice(0, maxResults);

    // Success response
    return new Response(
      JSON.stringify({
        courses: uniqueVideos,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Server Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
