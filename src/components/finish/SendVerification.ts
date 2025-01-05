import { supabase } from "@/integrations/supabase/client";

export const sendVerification = async (
  phoneNumber: string,
  countryCode: string,
  method: 'sms' | 'whatsapp'
) => {
  if (method === 'sms') {
    try {
      const message = "Thank you for creating your commitment! Reply YES to this message to verify your phone number.";
      
      const response = await supabase.functions.invoke('send-sms', {
        body: {
          to: `${countryCode}${phoneNumber}`,
          message,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    } catch (error: any) {
      console.error('Error sending SMS verification:', error);
      throw error;
    }
  }
  // WhatsApp implementation can be added here later
  return null;
};