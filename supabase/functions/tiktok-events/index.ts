import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
const PIXEL_ID = 'D687SDRC77U6DR98KFFG';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const token = Deno.env.get('TIKTOK_EVENTS_API_TOKEN');
  if (!token) {
    return new Response(JSON.stringify({ error: 'TIKTOK_EVENTS_API_TOKEN not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { event, properties, user } = await req.json();

    const eventId = crypto.randomUUID();
    const props = properties || {};

    // Build TikTok Events API v1.3 payload
    // content_id, contents, etc. must be at the top level of properties
    const eventData = {
      event: event,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      properties: {
        ...props,
        event_id: eventId,
        // Ensure content_id is a string (TikTok requirement)
        ...(props.content_id ? { content_id: String(props.content_id) } : {}),
        // Ensure contents array content_ids are strings
        ...(props.contents ? {
          contents: (props.contents as Array<Record<string, unknown>>).map((c: Record<string, unknown>) => ({
            ...c,
            content_id: String(c.content_id || ''),
          })),
        } : {}),
      },
      context: {
        user_agent: req.headers.get('user-agent') || '',
        ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '',
        page: {
          url: props.page_url || '',
        },
        user: user || {},
      },
    };

    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token,
      },
      body: JSON.stringify({
        event_source: 'web',
        event_source_id: PIXEL_ID,
        data: [eventData],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('TikTok Events API error:', result);
      return new Response(JSON.stringify({ error: 'TikTok API error', details: result }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in tiktok-events:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
