import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  to: string;
  firstName: string;
  commitmentName: string;
  frequency: string;
  endDate: string;
  stakeAmount: number;
  charity: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Clone the request before reading the body
    const clonedReq = req.clone();
    const { to, firstName, commitmentName, frequency, endDate, stakeAmount, charity }: EmailData = await clonedReq.json();

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service configuration is missing");
    }

    console.log("Sending email to:", to);
    console.log("Email data:", { firstName, commitmentName, frequency, endDate, stakeAmount, charity });

    const emailHtml = `
      <h1>Your Commitment is Confirmed! 🎉</h1>
      <p>Hi ${firstName},</p>
      <p>Your commitment has been successfully created. Here are the details:</p>
      <ul>
        <li><strong>Commitment:</strong> ${commitmentName}</li>
        <li><strong>Frequency:</strong> ${frequency}</li>
        <li><strong>Until:</strong> ${endDate}</li>
        <li><strong>Stake:</strong> $${stakeAmount} to ${charity}</li>
      </ul>
      <p>We'll be checking in with you regularly to help you stay on track. Good luck with your commitment!</p>
      <p>Best regards,<br>Your Commitment Team</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Commitments <onboarding@resend.dev>",
        to: [to],
        subject: "Your Commitment is Confirmed! 🎉",
        html: emailHtml,
      }),
    });

    const data = await res.json();
    console.log("Resend API response:", data);

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);