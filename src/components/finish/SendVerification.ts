import { supabase } from "@/integrations/supabase/client";

export const sendVerification = async (
  phoneNumber: string,
  countryCode: string,
  method: 'sms' | 'whatsapp',
  commitmentName?: string,
  frequency?: string
) => {
  try {
    const response = await supabase.functions.invoke('send-verification', {
      body: {
        to: phoneNumber,
        countryCode,
        commitmentName: commitmentName || 'your commitment',
        frequency: frequency || 'today',
        method // Add method to specify SMS or WhatsApp
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
          `${method === 'sms' ? 'SMS' : 'WhatsApp'} verification is not available in your country yet. Please try a different verification method or contact support for assistance.`
        );
      }
      throw new Error(response.error.message || `Failed to send ${method} verification`);
    }

    return response.data;
  } catch (error: any) {
    console.error(`Error sending ${method} verification:`, error);
    throw error;
  }
};