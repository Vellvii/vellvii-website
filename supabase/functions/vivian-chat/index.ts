import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ABACUS_PREDICTIONS_URL = Deno.env.get("ABACUS_PREDICTIONS_URL");
const ABACUS_API_KEY = Deno.env.get("ABACUS_API_KEY");
const ABACUS_DEPLOYMENT_TOKEN = Deno.env.get("ABACUS_DEPLOYMENT_TOKEN");
const ABACUS_DEPLOYMENT_ID = Deno.env.get("ABACUS_DEPLOYMENT_ID");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type UiMsg = { role: "system" | "user" | "assistant"; content: string };
type AbacusMsg = { is_user: boolean; text: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    const { messages = [], temperature = 0.3, max_tokens = 600 } = await req.json();
    
    console.log('Received request:', { messages: messages?.length, temperature, max_tokens });
    console.log('Environment check:', {
      predictionsUrl: ABACUS_PREDICTIONS_URL ? 'Present' : 'Missing',
      apiKey: ABACUS_API_KEY ? 'Present' : 'Missing',
      deploymentToken: ABACUS_DEPLOYMENT_TOKEN ? 'Present' : 'Missing',
      deploymentId: ABACUS_DEPLOYMENT_ID ? 'Present' : 'Missing'
    });
    
    if (!ABACUS_PREDICTIONS_URL || !ABACUS_API_KEY || !ABACUS_DEPLOYMENT_TOKEN || !ABACUS_DEPLOYMENT_ID) {
      console.error('Missing required Abacus configuration');
      return new Response(JSON.stringify({ error: "Abacus configuration incomplete" }), {
        status: 500,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    // Convert UI messages to Abacus format
    const abacusMessages: AbacusMsg[] = (messages as UiMsg[])
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ is_user: m.role === "user", text: m.content }));

    // Add system message as first message if no messages exist
    if (abacusMessages.length === 0) {
      abacusMessages.push({ 
        is_user: true, 
        text: "Hello, I'd like to learn about your products." 
      });
    }

    const body = {
      deploymentToken: ABACUS_DEPLOYMENT_TOKEN,
      deploymentId: ABACUS_DEPLOYMENT_ID,
      messages: abacusMessages,
      numCompletionTokens: max_tokens,
      temperature,
    };

    console.log('Request payload:', { 
      deploymentId: body.deploymentId,
      messages_count: body.messages.length,
      numCompletionTokens: body.numCompletionTokens,
      temperature: body.temperature,
      firstMessage: body.messages[0],
      lastMessage: body.messages[body.messages.length - 1]
    });

    console.log('Making request to Abacus Predictions API...');
    
    const upstream = await fetch(ABACUS_PREDICTIONS_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ABACUS_API_KEY}`
      },
      body: JSON.stringify(body),
    });

    const txt = await upstream.text();
    console.log("ABACUS status:", upstream.status);
    console.log("ABACUS raw response (first 400):", txt.slice(0, 400));

    if (!upstream.ok) {
      console.error("ABACUS error response:", { status: upstream.status, body: txt.slice(0, 1000) });
      return new Response(JSON.stringify({ error: "abacus_error", status: upstream.status, body: txt }), {
        status: 502, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Parse and log the JSON structure for debugging
    try {
      const jsonData = JSON.parse(txt);
      console.log("ABACUS JSON structure - top level keys:", Object.keys(jsonData));
      if (jsonData.choices && jsonData.choices[0]) {
        console.log("choices[0] keys:", Object.keys(jsonData.choices[0]));
      }
      if (jsonData.output_text) {
        console.log("output_text found:", jsonData.output_text.substring(0, 100));
      }
    } catch (e) {
      console.log("Could not parse JSON for inspection:", e);
    }

    // Return JSON to the client
    return new Response(txt, { 
      status: 200, 
      headers: { ...CORS, "Content-Type": "application/json" } 
    });

  } catch (e) {
    console.error('Error in vivian-chat function:', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 400, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});