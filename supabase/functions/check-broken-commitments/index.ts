CREATE OR REPLACE FUNCTION public.check_broken_commitments()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  commitment RECORD;
  difficulty_threshold NUMERIC;
  payment_result JSONB;
BEGIN
  -- Process each active commitment
  FOR commitment IN 
    SELECT 
      c.*,
      CASE 
        WHEN c.difficulty = 'Easy' THEN 0.6
        WHEN c.difficulty = 'Medium' THEN 0.8
        WHEN c.difficulty = 'Hard' THEN 1.0
      END as required_success_rate,
      COALESCE(c.verification_count, 0) as total_verifications,
      c.required_verifications as total_required
    FROM commitments c
    WHERE 
      c.status = 'active' 
      AND c.difficulty IS NOT NULL
      AND c.frequency = 'Daily'
      AND c.payment_status = 'pending'
      AND c.payment_method_id IS NOT NULL
      AND c.stake_amount > 0
  LOOP
    -- Calculate current success rate
    IF commitment.total_verifications > 0 THEN
      -- If we've exceeded the allowed number of failures based on difficulty
      IF (commitment.total_verifications::float / GREATEST(commitment.total_required, 1)::float) < commitment.required_success_rate THEN
        -- Attempt to capture payment
        SELECT content INTO payment_result 
        FROM http((
          'POST',
          'https://vgkereubgkfgxuhmwzwe.supabase.co/functions/v1/capture-payment',
          ARRAY[http_header('Content-Type', 'application/json')],
          'application/json',
          jsonb_build_object(
            'commitment_id', commitment.id,
            'payment_method_id', commitment.payment_method_id,
            'amount', commitment.stake_amount,
            'charity', commitment.charity
          )
        )::http_request);

        -- Update commitment status based on payment result
        IF (payment_result->>'success')::boolean THEN
          UPDATE commitments 
          SET 
            status = 'broken',
            payment_status = 'captured',
            payment_intent_id = payment_result->>'payment_intent_id',
            updated_at = NOW()
          WHERE id = commitment.id;

          -- Send notification about broken commitment
          PERFORM
            net.http_post(
              url:='https://vgkereubgkfgxuhmwzwe.supabase.co/functions/v1/send-broken-notification',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_key', true) || '"}'::jsonb,
              body:=jsonb_build_object(
                'to', commitment.contact_details->>'phone',
                'countryCode', commitment.contact_details->>'countryCode',
                'commitmentName', commitment.name,
                'verificationMethod', commitment.verification_method,
                'successRate', ROUND((commitment.total_verifications::float / commitment.total_required::float) * 100),
                'requiredRate', ROUND(commitment.required_success_rate * 100)
              )
            );
        ELSE
          -- Log payment failure but don't mark commitment as broken yet
          UPDATE commitments 
          SET 
            payment_status = 'failed',
            updated_at = NOW()
          WHERE id = commitment.id;
        END IF;
      END IF;
    END IF;
  END LOOP;
END;
$function$;