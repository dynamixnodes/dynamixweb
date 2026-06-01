import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, plans, currency } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are the Eternal AI Suggestor for EternalNodes's Minecraft hosting. You ONLY suggest Minecraft server plans. If asked about anything else, politely decline and say you only help with Minecraft plan suggestions.

Available Minecraft plans (prices in ${currency}):
${plans}

SIZING RULES — follow these strictly and do NOT over-recommend:
- 1-5 players, vanilla/few plugins → Eternal - Dirt (2GB)
- 5-10 players, vanilla or light plugins → Eternal - Copper (4GB)
- 10-20 players vanilla, OR 5-10 players with mods/modpacks → Eternal - Iron (8GB)
- 20-40 players vanilla, OR 10-20 players with medium modpacks → Eternal - Gold (12GB)
- 40-60 players, OR 15-25 players with heavy modpacks → Eternal - Diamond (16GB)
- 60-100 players, OR 25-40 players with very heavy modpacks → Eternal - Emerald (32GB)
- 100-200 players or large networks → Eternal - Netherite (64GB)
- Massive networks/enterprise → Eternal - Enderium (256GB)

Default to vanilla assumptions unless the user mentions mods/modpacks/plugins. For 10-20 players vanilla, ALWAYS suggest Iron (8GB) — never Gold. Be concise (2-3 sentences). Include plan name and price.`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ suggestion: "Sorry, couldn't generate a suggestion right now." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content || "No suggestion available.";

    return new Response(JSON.stringify({ suggestion }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("suggest error:", e);
    return new Response(JSON.stringify({ suggestion: "An error occurred. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
