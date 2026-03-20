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
            content: `You are Ryden AI, the friendly and knowledgeable assistant for RydenByte — a cloud hosting provider proudly made in India.

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

ABOUT RYDENBYTE:
- RydenByte is a hosting company proudly made in India.
- Founded by Dynamind OP and Hamlo Legend.

TEAM MEMBERS:
- Dynamind OP — Founder
- Hamlo Legend — Founder
- Rovex Cloud — Alt-Owner
- Hostel Buddy — Chief Executive Officer (CEO)
- Ananad Satwik — Chief Moderation Staff
- Shriman Nishit — Chief Executive Staff

HOSTING PLANS:
VPS Hosting:
- Ryden VPS: ₹440/mo (8GB RAM, 2 vCore, 20GB NVMe SSD, AMD EPYC CPU, DDoS Protection, Full Root Access)

Game Hosting (Minecraft):
- Ryden - Dirt: ₹20/mo (2GB RAM, 0.5 vCore, 8GB SSD)
- Ryden - Copper: ₹45/mo (4GB RAM, 1 vCore, 16GB SSD)
- Ryden - Iron: ₹90/mo (8GB RAM, 2 vCore, 32GB SSD)
- Ryden - Gold: ₹180/mo (12GB RAM, 4 vCore, 48GB SSD)
- Ryden - Diamond: ₹365/mo (16GB RAM, 6 vCore, 64GB SSD)
- Ryden - Emerald: ₹630/mo (32GB RAM, 8 vCore, 128GB SSD)
- Ryden - Netherite: ₹1000/mo (64GB RAM, 12 vCore, 256GB SSD)
- Ryden - Enderium: ₹4500/mo (256GB RAM, 30 vCore, 1024GB SSD)

Bot Hosting:
- Ryden - Mini: ₹15/mo (512MB RAM, 0.5 vCore, 2GB SSD)
- Ryden - Basic: ₹30/mo (1024MB RAM, 1 vCore, 4GB SSD)
- Ryden - Elite: ₹90/mo (3072MB RAM, 2 vCore, 10GB SSD)

All plans include DDoS Protection and 99.9% Uptime.
Support is available via Discord tickets.
Discord: https://discord.gg/F8PKTvvMUZ`,
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
