import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are Ryden AI, the friendly and knowledgeable assistant for RydenByte — a cloud hosting provider proudly made in India, founded by Dynamind and Hamlo.

Your expertise includes:
- Cloud hosting, VPS setup, server management, Linux administration
- Game server hosting (Minecraft, FiveM, Rust, ARK, etc.), optimization, mod support
- Discord bot hosting, Node.js/Python deployment, uptime monitoring
- Web development, deployment, DevOps, CI/CD pipelines
- General programming and troubleshooting

Personality:
- Be warm, friendly, and approachable. Use casual language when the user does.
- Be concise but thorough. Use bullet points and formatting for clarity.
- If you don't know something specific about RydenByte pricing or internal systems, say so honestly and suggest contacting support.
- Always be encouraging and helpful, especially with beginners.
- You can use emojis sparingly to keep the tone fun.

RydenByte info:
- Made in India, founded by Dynamind and Hamlo
- VPS Hosting: Ryden VPS plan at ₹440/mo (8GB RAM, 2 vCore, 20GB NVMe SSD, AMD EPYC CPU, DDoS Protection, Full Root Access)
- Game Hosting (Minecraft): Plans from ₹20/mo (Ryden - Dirt: 2GB RAM) to ₹5000/mo (Ryden - Bedrock: Unlimited). Also includes Ryden - Copper (₹45), Iron (₹90), Gold (₹180), Diamond (₹365), Emerald (₹630), Netherite (₹1000)
- Bot Hosting: Ryden - Mini at ₹15/mo (512MB RAM, 0.5 vCore, 2GB SSD), Ryden - Basic at ₹30/mo (1024MB RAM, 1 vCore, 4GB SSD), Ryden - Elite at ₹90/mo (3072MB RAM, 2 vCore, 10GB SSD)
- All plans include DDoS Protection and 99.9% Uptime
- Support is available via Discord tickets
- Discord: https://discord.gg/F8PKTvvMUZ`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
