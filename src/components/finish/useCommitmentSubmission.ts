import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendVerification } from "./SendVerification";
import { format } from "date-fns";

export const useCommitmentSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    commitmentData: any,
    stakeData: any,
    contactDetails: any,
    verificationMethod: 'sms' | 'whatsapp' | null,
    paymentMethodId: string | null
  ) => {
    setIsSubmitting(true);
    try {
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

      const { error: commitmentError } = await supabase
        .from('commitments')
        .insert([commitmentRecord]);

      if (commitmentError) throw commitmentError;

      // Send verification message if SMS is selected
      if (verificationMethod === 'sms') {
        await sendVerification(
          contactDetails.phone,
          contactDetails.countryCode,
          'sms'
        );
      }

      // Send confirmation email
      await supabase.functions.invoke('send-confirmation', {
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

      toast({
        title: "Success!",
        description: "Your commitment has been created",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error saving commitment:', error);
      toast({
        title: "Error",
        description: "Failed to save your commitment",
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