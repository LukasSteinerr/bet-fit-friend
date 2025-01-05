import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendVerification } from "./SendVerification";
import { format } from "date-fns";

export const useCommitmentSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (
    commitmentData: any,
    stakeData: any,
    contactDetails: any,
    verificationMethod: 'sms' | 'whatsapp' | null,
    paymentMethodId: string | null
  ) => {
    setIsSubmitting(true);
    try {
      console.log('Starting commitment submission...', {
        commitmentData,
        stakeData,
        contactDetails,
        verificationMethod,
        paymentMethodId
      });

      const { data: { session } } = await supabase.auth.getSession();
      
      const commitmentRecord = {
        name: commitmentData.name,
        frequency: commitmentData.frequency,
        end_date: commitmentData.end_date,
        difficulty: commitmentData.difficulty,
        required_verifications: commitmentData.required_verifications,
        status: 'active',
        stake_amount: stakeData.amount,
        charity: stakeData.charity,
        verification_method: verificationMethod,
        contact_details: contactDetails,
        payment_verified: true,
        payment_method_id: paymentMethodId,
        ...(session?.user && { user_id: session.user.id })
      };

      console.log('Inserting commitment record:', commitmentRecord);

      const { data: insertedCommitment, error: commitmentError } = await supabase
        .from('commitments')
        .insert([commitmentRecord])
        .select()
        .single();

      if (commitmentError) {
        console.error('Error inserting commitment:', commitmentError);
        throw commitmentError;
      }

      console.log('Successfully inserted commitment:', insertedCommitment);

      // Send verification message if SMS is selected
      if (verificationMethod === 'sms') {
        try {
          await sendVerification(
            contactDetails.phone,
            contactDetails.countryCode,
            'sms'
          );
        } catch (smsError: any) {
          console.error('SMS verification error:', smsError);
          
          // Check if it's a geographic restriction error
          if (smsError.message?.includes('not available in your country')) {
            toast({
              title: "SMS Not Available",
              description: smsError.message,
              variant: "destructive",
            });
            // Allow user to continue but they'll need to change verification method later
          } else {
            toast({
              title: "SMS Verification Failed",
              description: "We couldn't send the SMS verification. You can try again later or contact support.",
              variant: "destructive",
            });
          }
        }
      }

      // Send confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-confirmation', {
          body: {
            to: contactDetails.email,
            firstName: contactDetails.firstName,
            commitmentName: commitmentData.name,
            frequency: commitmentData.frequency,
            endDate: format(new Date(commitmentData.end_date), 'PPP'),
            stakeAmount: stakeData.amount,
            charity: stakeData.charity,
          },
        });

        if (emailError) {
          console.error('Email confirmation error:', emailError);
          toast({
            title: "Email Notification Failed",
            description: "Your commitment was created but we couldn't send the confirmation email. Please check your commitment details in your dashboard.",
            variant: "destructive",
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }

      toast({
        title: "Success!",
        description: "Your commitment has been created",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error saving commitment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save your commitment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
};