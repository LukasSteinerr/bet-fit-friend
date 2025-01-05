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
        // Check if it's a geographic restriction error
        const errorBody = typeof response.error === 'string' 
          ? response.error 
          : response.error.message || '';
          
        if (errorBody.includes('Permission') || 
            errorBody.includes('region') ||
            errorBody.toLowerCase().includes('not enabled for this country')) {
          throw new Error(
            'SMS verification is not available in your country yet. Please use WhatsApp verification instead, or contact support for assistance.'
          );
        }
        throw new Error(response.error.message || 'Failed to send SMS verification');
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