import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Server-side validation functions
function validateString(value: unknown, fieldName: string, minLen: number, maxLen: number): string | null {
  if (typeof value !== 'string') return `${fieldName} must be a string`;
  const trimmed = value.trim();
  if (trimmed.length < minLen) return `${fieldName} must be at least ${minLen} characters`;
  if (trimmed.length > maxLen) return `${fieldName} must be less than ${maxLen} characters`;
  return null;
}

function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string') return 'Email must be a string';
  const trimmed = value.trim();
  if (trimmed.length > 255) return 'Email must be less than 255 characters';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Invalid email address';
  return null;
}

function validateNumber(value: unknown, fieldName: string, min: number, max: number): string | null {
  if (typeof value !== 'number' || isNaN(value)) return `${fieldName} must be a number`;
  if (value < min) return `${fieldName} must be at least ${min}`;
  if (value > max) return `${fieldName} must be less than ${max}`;
  return null;
}

function validateAddress(formData: Record<string, unknown>): string[] {
  const errors: string[] = [];
  
  const fullNameErr = validateString(formData.fullName, 'Full name', 2, 100);
  if (fullNameErr) errors.push(fullNameErr);
  
  const emailErr = validateEmail(formData.email);
  if (emailErr) errors.push(emailErr);
  
  const phoneErr = validateString(formData.phone, 'Phone', 10, 20);
  if (phoneErr) errors.push(phoneErr);
  
  const addressErr = validateString(formData.address, 'Address', 5, 200);
  if (addressErr) errors.push(addressErr);
  
  const cityErr = validateString(formData.city, 'City', 2, 100);
  if (cityErr) errors.push(cityErr);
  
  const stateErr = validateString(formData.state, 'State', 2, 100);
  if (stateErr) errors.push(stateErr);
  
  const zipErr = validateString(formData.zipCode, 'ZIP code', 5, 10);
  if (zipErr) errors.push(zipErr);
  
  return errors;
}

interface CartItem {
  product_id: string;
  product_name: string;
  product_image?: string | null;
  price: number;
  quantity: number;
}

function validateCartItems(items: unknown): { valid: CartItem[] | null; errors: string[] } {
  const errors: string[] = [];
  
  if (!Array.isArray(items)) {
    return { valid: null, errors: ['Items must be an array'] };
  }
  
  if (items.length === 0) {
    return { valid: null, errors: ['Cart cannot be empty'] };
  }
  
  if (items.length > 50) {
    return { valid: null, errors: ['Cart cannot have more than 50 items'] };
  }
  
  const validItems: CartItem[] = [];
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (typeof item !== 'object' || item === null) {
      errors.push(`Item ${i + 1} is invalid`);
      continue;
    }
    
    const itemObj = item as Record<string, unknown>;
    
    const productIdErr = validateString(itemObj.product_id, `Item ${i + 1} product_id`, 1, 100);
    if (productIdErr) errors.push(productIdErr);
    
    const productNameErr = validateString(itemObj.product_name, `Item ${i + 1} product_name`, 1, 200);
    if (productNameErr) errors.push(productNameErr);
    
    if (itemObj.product_image !== null && itemObj.product_image !== undefined) {
      const imageErr = validateString(itemObj.product_image, `Item ${i + 1} product_image`, 0, 500);
      if (imageErr) errors.push(imageErr);
    }
    
    const priceErr = validateNumber(itemObj.price, `Item ${i + 1} price`, 0.01, 99999);
    if (priceErr) errors.push(priceErr);
    
    const qtyErr = validateNumber(itemObj.quantity, `Item ${i + 1} quantity`, 1, 100);
    if (qtyErr) errors.push(qtyErr);
    
    if (errors.length === 0) {
      validItems.push({
        product_id: String(itemObj.product_id).trim(),
        product_name: String(itemObj.product_name).trim(),
        product_image: itemObj.product_image ? String(itemObj.product_image).trim() : null,
        price: Number(itemObj.price),
        quantity: Math.floor(Number(itemObj.quantity)),
      });
    }
  }
  
  return { valid: errors.length === 0 ? validItems : null, errors };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing checkout for user: ${user.id}`);

    // Parse request body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      console.error('Invalid JSON in request body');
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate formData
    const formData = body.formData;
    if (typeof formData !== 'object' || formData === null) {
      return new Response(
        JSON.stringify({ error: 'Invalid form data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const addressErrors = validateAddress(formData as Record<string, unknown>);
    if (addressErrors.length > 0) {
      console.error('Address validation failed:', addressErrors);
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: addressErrors.map(msg => ({ field: 'formData', message: msg })) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate cart items
    const { valid: validItems, errors: itemErrors } = validateCartItems(body.items);
    if (!validItems) {
      console.error('Cart validation failed:', itemErrors);
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: itemErrors.map(msg => ({ field: 'items', message: msg })) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate totals
    const subtotalErr = validateNumber(body.subtotal, 'Subtotal', 0, 999999);
    const shippingErr = validateNumber(body.shipping, 'Shipping', 0, 9999);
    const taxErr = validateNumber(body.tax, 'Tax', 0, 99999);
    const totalErr = validateNumber(body.total, 'Total', 0.01, 999999);
    
    const totalErrors = [subtotalErr, shippingErr, taxErr, totalErr].filter(Boolean);
    if (totalErrors.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: totalErrors.map(msg => ({ field: 'totals', message: msg })) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Recalculate totals server-side for security
    const calculatedSubtotal = validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const expectedShipping = calculatedSubtotal >= 250 ? 0 : 14.99;
    const expectedTax = calculatedSubtotal * 0.08;
    const expectedTotal = calculatedSubtotal + expectedShipping + expectedTax;

    // Allow small floating point differences (less than 1 cent)
    if (Math.abs(calculatedSubtotal - Number(body.subtotal)) > 0.01) {
      console.error('Subtotal mismatch:', { calculated: calculatedSubtotal, provided: body.subtotal });
      return new Response(
        JSON.stringify({ error: 'Invalid subtotal calculation' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (Math.abs(expectedTotal - Number(body.total)) > 0.01) {
      console.error('Total mismatch:', { expected: expectedTotal, provided: body.total });
      return new Response(
        JSON.stringify({ error: 'Invalid total calculation' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create sanitized shipping address object
    const form = formData as Record<string, unknown>;
    const shippingAddress = {
      fullName: String(form.fullName).trim(),
      address: String(form.address).trim(),
      city: String(form.city).trim(),
      state: String(form.state).trim(),
      zipCode: String(form.zipCode).trim(),
      phone: String(form.phone).trim(),
    };

    // Create order with validated data
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal: calculatedSubtotal,
        shipping: expectedShipping,
        tax: expectedTax,
        total: expectedTotal,
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Failed to create order:', orderError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Order created: ${order.id}`);

    // Create order items with validated data
    const orderItems = validItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error('Failed to create order items:', itemsError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Order items created for order: ${order.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        message: 'Order placed successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error during checkout:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
