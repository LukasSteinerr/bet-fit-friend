-- Update the send_scheduled_verifications function to include authorization
CREATE OR REPLACE FUNCTION public.send_scheduled_verifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_commitment RECORD;
  v_response RECORD;
  v_auth_header text;
BEGIN
  -- Get the service role key from the settings
  v_auth_header := 'Bearer ' || current_setting('app.settings.service_role_key');
  
  -- Log function start
  RAISE NOTICE 'Starting scheduled verifications at %', NOW();

  -- Process daily commitments
  FOR v_commitment IN
    SELECT 
      c.id,
      c.name,
      c.frequency,
      c.contact_details->>'phone' as phone,
      c.contact_details->>'countryCode' as country_code
    FROM commitments c
    WHERE 
      c.frequency = 'Daily'
      AND c.status = 'active'
      AND c.verification_method = 'sms'
      AND (c.last_verified_at IS NULL OR c.last_verified_at < CURRENT_DATE)
  LOOP
    BEGIN
      -- Log each commitment being processed
      RAISE NOTICE 'Processing commitment: % (ID: %)', v_commitment.name, v_commitment.id;

      -- Make the HTTP request with proper authorization
      SELECT * INTO v_response FROM net.http_post(
        url := 'https://vgkereubgkfgxuhmwzwe.supabase.co/functions/v1/send-verification',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', v_auth_header
        ),
        body := jsonb_build_object(
          'to', v_commitment.phone,
          'countryCode', v_commitment.country_code,
          'commitmentName', v_commitment.name,
          'frequency', v_commitment.frequency,
          'method', 'sms'
        )
      );

      -- Log success
      RAISE NOTICE 'Successfully sent verification for commitment %', v_commitment.id;

    EXCEPTION WHEN OTHERS THEN
      -- Log any errors but continue processing other commitments
      RAISE WARNING 'Error processing commitment %: %', v_commitment.id, SQLERRM;
    END;
  END LOOP;

  -- Process weekly commitments (on Mondays)
  IF EXTRACT(DOW FROM CURRENT_DATE) = 1 THEN
    RAISE NOTICE 'Processing weekly commitments (Monday)';
    
    FOR v_commitment IN
      SELECT 
        c.id,
        c.name,
        c.frequency,
        c.contact_details->>'phone' as phone,
        c.contact_details->>'countryCode' as country_code
      FROM commitments c
      WHERE 
        c.frequency = 'Weekly'
        AND c.status = 'active'
        AND c.verification_method = 'sms'
        AND (c.last_verified_at IS NULL OR c.last_verified_at < CURRENT_DATE - INTERVAL '7 days')
    LOOP
      BEGIN
        -- Log each weekly commitment being processed
        RAISE NOTICE 'Processing weekly commitment: % (ID: %)', v_commitment.name, v_commitment.id;

        -- Make the HTTP request with proper authorization
        SELECT * INTO v_response FROM net.http_post(
          url := 'https://vgkereubgkfgxuhmwzwe.supabase.co/functions/v1/send-verification',
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', v_auth_header
          ),
          body := jsonb_build_object(
            'to', v_commitment.phone,
            'countryCode', v_commitment.country_code,
            'commitmentName', v_commitment.name,
            'frequency', v_commitment.frequency,
            'method', 'sms'
          )
        );

        -- Log success
        RAISE NOTICE 'Successfully sent weekly verification for commitment %', v_commitment.id;

      EXCEPTION WHEN OTHERS THEN
        -- Log any errors but continue processing other commitments
        RAISE WARNING 'Error processing weekly commitment %: %', v_commitment.id, SQLERRM;
      END;
    END LOOP;
  END IF;

  -- Log function completion
  RAISE NOTICE 'Completed scheduled verifications at %', NOW();
END;
$$;

-- Update the test_send_verification function to include authorization
CREATE OR REPLACE FUNCTION public.test_send_verification(p_commitment_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_commitment RECORD;
  v_response RECORD;
  v_auth_header text;
BEGIN
  -- Get the service role key from the settings
  v_auth_header := 'Bearer ' || current_setting('app.settings.service_role_key');

  -- Get the commitment details
  SELECT 
    c.id,
    c.name,
    c.frequency,
    c.contact_details->>'phone' as phone,
    c.contact_details->>'countryCode' as country_code,
    c.verification_method
  INTO v_commitment
  FROM commitments c
  WHERE c.id = p_commitment_id;

  -- Validate commitment exists
  IF NOT FOUND THEN
    RETURN 'Commitment not found';
  END IF;

  -- Validate it has SMS verification
  IF v_commitment.verification_method != 'sms' THEN
    RETURN 'Commitment does not use SMS verification';
  END IF;

  -- Send the verification with proper authorization
  SELECT * INTO v_response FROM net.http_post(
    url := 'https://vgkereubgkfgxuhmwzwe.supabase.co/functions/v1/send-verification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', v_auth_header
    ),
    body := jsonb_build_object(
      'to', v_commitment.phone,
      'countryCode', v_commitment.country_code,
      'commitmentName', v_commitment.name,
      'frequency', v_commitment.frequency,
      'method', 'sms'
    )
  );

  RETURN 'Verification sent successfully';
EXCEPTION WHEN OTHERS THEN
  RETURN 'Error: ' || SQLERRM;
END;
$$;