import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL");

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Form webhook received:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log("Form data received:", JSON.stringify(formData));

    // Extract common fields
    const customerName = String(formData.name || formData.Name || formData.full_name || "Unknown");
    const customerEmail = String(formData.email || formData.Email || formData.email_address || "");
    const customerPhone = String(formData.phone || formData.Phone || formData.phone_number || "");

    // 1. Store submission in database
    const { data: submission, error: insertError } = await supabase
      .from("form_submissions")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail || null,
        customer_phone: customerPhone || null,
        form_data: formData,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting submission:", insertError);
      throw insertError;
    }

    console.log("Submission stored:", submission.id);

    // 2. Send email to customer (if email provided)
    if (customerEmail && customerEmail !== "undefined") {
      try {
        const customerEmailResponse = await resend.emails.send({
          from: "Notifications <onboarding@resend.dev>",
          to: [customerEmail],
          subject: "Thank you for your submission!",
          html: `
            <h1>Hello ${customerName}!</h1>
            <p>Thank you for submitting the form. We have received your information and will get back to you soon.</p>
            <p>Best regards,<br>The Team</p>
          `,
        });

        await supabase.from("notification_logs").insert({
          submission_id: submission.id,
          notification_type: "email",
          recipient: customerEmail,
          status: customerEmailResponse.error ? "failed" : "sent",
          error_message: customerEmailResponse.error?.message,
        });

        console.log("Customer email sent:", customerEmailResponse);
      } catch (emailError) {
        console.error("Error sending customer email:", emailError);
        await supabase.from("notification_logs").insert({
          submission_id: submission.id,
          notification_type: "email",
          recipient: customerEmail,
          status: "failed",
          error_message: String(emailError),
        });
      }
    }

    // 3. Notify admin
    if (adminEmail) {
      try {
        const adminEmailResponse = await resend.emails.send({
          from: "Form Notifications <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Form Submission from ${customerName}`,
          html: `
            <h1>New Form Submission</h1>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail || "Not provided"}</p>
            <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>
            <h2>Full Form Data:</h2>
            <pre>${JSON.stringify(formData, null, 2)}</pre>
          `,
        });

        await supabase.from("notification_logs").insert({
          submission_id: submission.id,
          notification_type: "admin",
          recipient: adminEmail,
          status: adminEmailResponse.error ? "failed" : "sent",
          error_message: adminEmailResponse.error?.message,
        });

        console.log("Admin notification sent:", adminEmailResponse);
      } catch (adminError) {
        console.error("Error sending admin notification:", adminError);
        await supabase.from("notification_logs").insert({
          submission_id: submission.id,
          notification_type: "admin",
          recipient: adminEmail,
          status: "failed",
          error_message: String(adminError),
        });
      }
    }

    // Update submission status
    await supabase
      .from("form_submissions")
      .update({ status: "notified", processed_at: new Date().toISOString() })
      .eq("id", submission.id);

    return new Response(
      JSON.stringify({ success: true, submission_id: submission.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error processing form webhook:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
