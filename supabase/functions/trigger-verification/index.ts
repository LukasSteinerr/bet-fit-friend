import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Fetching active daily commitments...')
    
    // Get all active daily commitments that need verification
    const { data: commitments, error: fetchError } = await supabaseClient
      .from('commitments')
      .select('*')
      .eq('frequency', 'Daily')
      .eq('status', 'active')
      .eq('verification_method', 'sms')
      .filter('last_verified_at', 'is', null)
      .or('last_verified_at.lt.now')

    if (fetchError) {
      throw fetchError
    }

    console.log(`Found ${commitments?.length} commitments to verify`)

    // Send verification for each commitment
    const sendPromises = commitments?.map(async (commitment) => {
      console.log(`Sending verification for commitment: ${commitment.id}`)
      
      const response = await fetch(
        `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-verification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({
            to: commitment.contact_details.phone,
            countryCode: commitment.contact_details.countryCode,
            commitmentName: commitment.name,
            frequency: commitment.frequency,
            method: 'sms'
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to send verification: ${errorText}`)
      }

      return response.json()
    }) || []

    const results = await Promise.all(sendPromises)
    console.log('Verification results:', results)

    return new Response(
      JSON.stringify({ 
        message: `Sent ${results.length} verifications`,
        results 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})