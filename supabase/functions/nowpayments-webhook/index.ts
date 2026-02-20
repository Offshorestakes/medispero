import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-nowpayments-sig',
};

async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );
  const signatureData = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const expectedSig = Array.from(new Uint8Array(signatureData))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Constant-length comparison
  if (expectedSig.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    mismatch |= expectedSig.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ipnSecret = Deno.env.get('NOWPAYMENTS_IPN_SECRET');
    if (!ipnSecret) {
      console.error('NOWPAYMENTS_IPN_SECRET not configured');
      return new Response('Configuration error', { status: 500 });
    }

    // Get signature header
    const signature = req.headers.get('x-nowpayments-sig');
    if (!signature) {
      console.error('Missing x-nowpayments-sig header');
      return new Response('Unauthorized', { status: 401 });
    }

    // Read raw body for signature verification
    const rawBody = await req.text();

    // NOWPayments sorts keys before signing
    const bodyObj = JSON.parse(rawBody);
    const sortedBody = JSON.stringify(bodyObj, Object.keys(bodyObj).sort());

    const isValid = await verifySignature(sortedBody, signature, ipnSecret);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response('Invalid signature', { status: 401 });
    }

    console.log('Verified NOWPayments webhook received:', sortedBody);

    const { payment_status, order_id } = bodyObj;

    if (!order_id || !payment_status) {
      console.error('Missing required webhook fields');
      return new Response('Invalid webhook data', { status: 400 });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
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
