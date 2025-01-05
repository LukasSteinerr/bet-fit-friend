import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SMSRequest {
  to: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, message }: SMSRequest = await req.json()
    console.log('Attempting to send SMS to:', to)

    // Format phone number (remove spaces, dashes, etc)
    const formattedPhone = to.replace(/\D/g, '')

    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
    
    const twilioResponse = await fetch(twilioEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
      },
      body: new URLSearchParams({
        To: `+${formattedPhone}`,
        From: TWILIO_PHONE_NUMBER,
        Body: message,
      }).toString(),
    })

    const result = await twilioResponse.json()
    console.log('Twilio API response:', result)

    if (!twilioResponse.ok) {
      // Check for geographic permissions error
      if (result.message?.includes('Permission') || result.message?.includes('region')) {
        return new Response(
          JSON.stringify({
            error: 'SMS sending is not enabled for this country. Please try a different phone number or contact support.',
            details: result.message
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }
      throw new Error(result.message || 'Failed to send SMS')
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error sending SMS:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        tip: "If this is a geographic restriction error, you'll need to enable SMS sending for this country in your Twilio console."
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})