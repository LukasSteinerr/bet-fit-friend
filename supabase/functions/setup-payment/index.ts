import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { paymentMethodId } = await req.json()

    if (!paymentMethodId) {
      throw new Error('Payment method ID is required')
    }

    console.log('Setting up payment method:', paymentMethodId)

    // First, retrieve the payment method to ensure it exists
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    
    if (!paymentMethod) {
      throw new Error('Payment method not found')
    }

    // Create a Setup Intent with the payment method
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      confirm: true,
      payment_method: paymentMethodId,
      usage: 'off_session', // This allows us to charge the card later
    })

    console.log('Setup Intent created:', setupIntent.id)

    return new Response(
      JSON.stringify({ 
        clientSecret: setupIntent.client_secret,
        paymentMethodId: setupIntent.payment_method 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error setting up payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})