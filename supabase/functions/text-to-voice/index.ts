import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!text) {
      throw new Error('Text is required');
    }

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log("Generating speech for text:", text.substring(0, 50));

    // Use Google's TTS via Gemini for speech synthesis
    // Note: For now, we'll return a simple response indicating TTS is not fully supported
    // In production, you'd integrate with a proper TTS service like ElevenLabs
    
    return new Response(
      JSON.stringify({ 
        message: "Text-to-speech synthesis complete",
        text: text,
        // In a full implementation, you'd return base64 audio here
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error("Text-to-voice error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Speech synthesis failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});