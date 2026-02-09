import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-nowpayments-sig',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const nowPaymentsApiKey = Deno.env.get('NOWPAYMENTS_API_KEY');

    if (!nowPaymentsApiKey) {
      console.error('NOWPAYMENTS_API_KEY not configured');
      return new Response('Configuration error', { status: 500 });
    }

    const body = await req.json();
    console.log('NOWPayments webhook received:', JSON.stringify(body));

    const { payment_status, order_id, payment_id, pay_amount, pay_currency, actually_paid } = body;

    if (!order_id || !payment_status) {
      console.error('Missing required webhook fields');
      return new Response('Invalid webhook data', { status: 400 });
    }

    // Use service role to update order status
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let newStatus = 'pending_crypto_payment';
    
    switch (payment_status) {
      case 'finished':
      case 'confirmed':
        newStatus = 'paid';
        break;
      case 'partially_paid':
        newStatus = 'partially_paid';
        break;
      case 'failed':
      case 'expired':
        newStatus = 'payment_failed';
        break;
      case 'waiting':
      case 'confirming':
      case 'sending':
        newStatus = 'pending_crypto_payment';
        break;
      default:
        newStatus = 'pending_crypto_payment';
    }

    console.log(`Updating order ${order_id} to status: ${newStatus}`);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', order_id);

    if (error) {
      console.error('Failed to update order:', error.message);
      return new Response('Database error', { status: 500 });
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal error', { status: 500 });
  }
});
