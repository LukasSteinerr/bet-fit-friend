import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CommitmentEmailData {
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
    const { to, firstName, commitmentName, frequency, endDate, stakeAmount, charity }: CommitmentEmailData = await req.json();

    const emailHtml = `
      <h1>Your Commitment is Confirmed!</h1>
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

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);