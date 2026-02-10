import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, password, redirectTo } = await req.json();

    if (!email || !password) {
      throw new Error("Missing required fields: email and password");
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Create the user via admin API — this does NOT send any default email
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    });

    if (createError) {
      console.error("Error creating user:", createError);
      // Check for duplicate user
      if (createError.message?.includes("already been registered") || createError.message?.includes("already exists")) {
        return new Response(
          JSON.stringify({ error: "already_registered" }),
          { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw new Error(createError.message);
    }

    // Generate a proper signup confirmation link
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email,
      options: {
        redirectTo: redirectTo || "https://medispero.com/",
      },
    });

    if (linkError) {
      console.error("Error generating link:", linkError);
      throw new Error(linkError.message);
    }

    const confirmationUrl = linkData.properties?.action_link;
    if (!confirmationUrl) {
      throw new Error("Failed to generate confirmation link");
    }

    console.log(`Sending branded verification email to ${email}`);

    const { data, error } = await resend.emails.send({
      from: "Medi Spero <info@medispero.com>",
      to: [email],
      subject: "Verify your Medi Spero account",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f0fdf4;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
                  
                  <!-- Logo & Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0f4d2e 0%,#166534 40%,#15803d 100%);padding:40px 32px;text-align:center;border-radius:16px 16px 0 0;">
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                        <tr>
                          <td style="width:44px;height:44px;background:rgba(255,255,255,0.15);border-radius:12px;text-align:center;vertical-align:middle;">
                            <span style="font-size:22px;font-weight:800;color:#ffffff;">M</span>
                          </td>
                          <td style="padding-left:12px;">
                            <span style="font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Medi Spero</span>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:12px 0 0;color:#bbf7d0;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">Premium Wellness &amp; CBD Products</p>
                    </td>
                  </tr>
                  
                  <!-- Body -->
                  <tr>
                    <td style="background:#ffffff;padding:40px 36px;">
                      <!-- Icon -->
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                        <tr>
                          <td style="width:64px;height:64px;background:#f0fdf4;border-radius:50%;text-align:center;vertical-align:middle;border:2px solid #bbf7d0;">
                            <span style="font-size:28px;">✉️</span>
                          </td>
                        </tr>
                      </table>
                      
                      <h1 style="margin:0 0 12px;color:#0f172a;font-size:22px;font-weight:700;text-align:center;">Verify Your Email Address</h1>
                      <p style="margin:0 0 28px;color:#64748b;font-size:15px;line-height:1.7;text-align:center;">
                        Thank you for creating your Medi Spero account! Please confirm your email address to activate your account and start exploring our premium wellness products.
                      </p>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="${confirmationUrl}" 
                               style="display:inline-block;background:linear-gradient(135deg,#166534,#15803d);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:10px;font-size:16px;font-weight:600;letter-spacing:0.3px;box-shadow:0 4px 14px rgba(22,101,52,0.3);">
                              Verify Email Address
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Divider -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                        <tr>
                          <td style="border-top:1px solid #e2e8f0;"></td>
                        </tr>
                      </table>
                      
                      <!-- Benefits -->
                      <p style="margin:0 0 16px;color:#334155;font-size:14px;font-weight:600;">With your account, you can:</p>
                      <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                        <tr>
                          <td style="padding:4px 8px 4px 0;color:#166534;font-size:14px;">✓</td>
                          <td style="padding:4px 0;color:#64748b;font-size:14px;">Track your orders in real-time</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 8px 4px 0;color:#166534;font-size:14px;">✓</td>
                          <td style="padding:4px 0;color:#64748b;font-size:14px;">Access lab results &amp; certificates of analysis</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 8px 4px 0;color:#166534;font-size:14px;">✓</td>
                          <td style="padding:4px 0;color:#64748b;font-size:14px;">Save addresses for faster checkout</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 8px 4px 0;color:#166534;font-size:14px;">✓</td>
                          <td style="padding:4px 0;color:#64748b;font-size:14px;">Get exclusive wellness offers</td>
                        </tr>
                      </table>
                      
                      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;text-align:center;">
                        If you didn't create this account, you can safely ignore this email.
                        This verification link will expire in 24 hours.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:24px 36px;border-top:1px solid #e2e8f0;border-radius:0 0 16px 16px;text-align:center;">
                      <p style="margin:0 0 8px;color:#64748b;font-size:13px;">
                        Need help? Contact us at
                        <a href="mailto:info@medispero.com" style="color:#166534;text-decoration:none;font-weight:500;">info@medispero.com</a>
                      </p>
                      <p style="margin:0;color:#94a3b8;font-size:11px;">
                        © ${new Date().getFullYear()} Medi Spero. All rights reserved.<br>
                        Premium Wellness &amp; CBD Products
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Verification email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in signup flow:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
