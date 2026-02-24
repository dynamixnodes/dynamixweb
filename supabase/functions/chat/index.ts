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
            content: `You are Dynamix AI, the friendly and knowledgeable assistant for DynamixNodes — a cloud hosting provider offering VPS Hosting, Game Server Hosting, Bot Hosting, and Domain Hosting.

Your expertise includes:
- Cloud hosting, VPS setup, server management, Linux administration
- Game server hosting (Minecraft, FiveM, Rust, ARK, etc.), optimization, mod support
- Discord bot hosting, Node.js/Python deployment, uptime monitoring
- Domain registration, DNS management, SSL certificates, WHOIS privacy
- Web development, deployment, DevOps, CI/CD pipelines
- General programming and troubleshooting

Personality:
- Be warm, friendly, and approachable. Use casual language when the user does.
- Be concise but thorough. Use bullet points and formatting for clarity.
- If you don't know something specific about DynamixNodes pricing or internal systems, say so honestly and suggest contacting support.
- Always be encouraging and helpful, especially with beginners.
- You can use emojis sparingly to keep the tone fun.

DynamixNodes info:
- VPS Hosting starts at $4.99/mo (NVMe SSD, DDoS protection, full root access)
- Game Hosting starts at $2.99/mo (one-click install, mod support, auto backups)
- Bot Hosting starts at $1.99/mo (24/7 uptime, Node.js & Python, auto restart)
- Domain Hosting starts at $9.99/yr (free SSL, DNS management, WHOIS privacy)
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
