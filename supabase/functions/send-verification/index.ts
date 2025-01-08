import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER')
const TWILIO_WHATSAPP_NUMBER = `whatsapp:${TWILIO_PHONE_NUMBER}`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerificationRequest {
  to: string;
  countryCode: string;
  commitmentName: string;
  frequency: string;
  method: 'sms' | 'whatsapp';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting verification request processing...')
    
    // Check authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      console.error('Missing authorization header')
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    console.log('Authorization header present')
    
    // Validate Twilio credentials
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.error('Missing Twilio credentials')
      throw new Error('Missing Twilio configuration')
    }

    const { to, countryCode, commitmentName, frequency, method }: VerificationRequest = await req.json()
    console.log('Received verification request:', { to, countryCode, commitmentName, frequency, method })

    // Format phone number (remove spaces, dashes, etc)
    const formattedPhone = `${countryCode}${to}`.replace(/\D/g, '')
    console.log('Formatted phone number:', formattedPhone)
    
    const message = `Did you complete your commitment to ${commitmentName} ${frequency.toLowerCase()}? Reply with YES or NO`
    console.log('Message to send:', message)

    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
    
    // Prepare the "from" and "to" numbers based on the method
    const fromNumber = method === 'whatsapp' ? TWILIO_WHATSAPP_NUMBER : TWILIO_PHONE_NUMBER
    const toNumber = method === 'whatsapp' ? `whatsapp:+${formattedPhone}` : `+${formattedPhone}`

    console.log('Making Twilio API request:', {
      to: toNumber,
      from: fromNumber,
      message: message,
      endpoint: twilioEndpoint
    })

    const twilioResponse = await fetch(twilioEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
      },
      body: new URLSearchParams({
        To: toNumber,
        From: fromNumber,
        Body: message,
      }).toString(),
    })

    const result = await twilioResponse.json()
    console.log('Twilio API response:', result)

    if (!twilioResponse.ok) {
      // Check for geographic permissions error
      if (result.message?.includes('Permission') || result.message?.includes('region')) {
        console.error('Geographic restriction error:', result)
        return new Response(
          JSON.stringify({
            error: `${method === 'sms' ? 'SMS' : 'WhatsApp'} sending is not enabled for this country. Please try a different method or contact support.`,
            details: result.message
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }
      console.error('Twilio API error:', result)
      throw new Error(result.message || `Failed to send ${method}`)
    }

    console.log('Successfully sent verification message')
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-verification function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        tip: "If this is a geographic restriction error, you'll need to enable the service for this country in your Twilio console."
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})