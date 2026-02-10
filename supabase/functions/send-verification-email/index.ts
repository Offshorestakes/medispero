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
    const { email, redirectTo } = await req.json();

    if (!email) {
      throw new Error("Missing required field: email");
    }

    console.log(`Generating verification link for ${email}`);

    // Use Supabase Admin to generate a proper signup confirmation link
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email: email,
      options: {
        redirectTo: redirectTo || "https://medispero.com/",
      },
    });

    if (linkError) {
      console.error("Error generating link:", linkError);
      throw new Error(linkError.message);
    }

    // The generated link contains the proper token-based verification URL
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
        <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="background:linear-gradient(135deg,#166534,#15803d);padding:32px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Medi Spero</h1>
                      <p style="margin:8px 0 0;color:#bbf7d0;font-size:14px;">Premium Wellness Products</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px;">
                      <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Verify your email</h2>
                      <p style="margin:0 0 24px;color:#525252;font-size:15px;line-height:1.6;">
                        Thank you for creating an account. Please click the button below to verify your email address and activate your account.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="${confirmationUrl}" 
                               style="display:inline-block;background:#166534;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;">
                              Verify Email Address
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:24px 0 0;color:#a1a1aa;font-size:13px;line-height:1.5;">
                        If you didn't create this account, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
                      <p style="margin:0;color:#a1a1aa;font-size:12px;">© ${new Date().getFullYear()} Medi Spero. All rights reserved.</p>
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
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
