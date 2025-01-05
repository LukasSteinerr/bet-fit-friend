import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible } from "@/components/ui/collapsible";
import { VerificationSection } from "./finish/VerificationSection";
import { ContactSection } from "./finish/ContactSection";
import { PaymentSection } from "./finish/PaymentSection";
import { FinishLayout } from "./finish/FinishLayout";
import { AuthSection } from "./finish/AuthSection";
import { ErrorSection } from "./finish/ErrorSection";

export const Finish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [verificationOpen, setVerificationOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'whatsapp' | null>(null);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  });
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const commitmentData = location.state?.commitmentData;
  const stakeData = location.state?.stakeData;

  // If we don't have the required data, show the error section
  if (!commitmentData || !stakeData) {
    return <ErrorSection />;
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (value: string) => {
    setContactDetails((prev) => ({
      ...prev,
      countryCode: value,
    }));
  };

  const handleVerificationMethodChange = (method: 'sms' | 'whatsapp') => {
    setVerificationMethod(method);
  };

  const handlePaymentVerification = (methodId: string) => {
    setPaymentMethodId(methodId);
    setPaymentVerified(true);
  };

  const handleSubmit = async () => {
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
        payment_verified: paymentVerified,
        payment_method_id: paymentMethodId,
        ...(session?.user && { user_id: session.user.id })
      };

      const { error } = await supabase
        .from('commitments')
        .insert([commitmentRecord]);

      if (error) throw error;

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
    }
  };

  const isComplete = verificationMethod && 
    contactDetails.firstName && 
    contactDetails.email && 
    contactDetails.phone && 
    paymentVerified;

  if (showAuth) {
    return <AuthSection />;
  }

  return (
    <FinishLayout isComplete={isComplete} onSubmit={handleSubmit}>
      <Collapsible
        open={verificationOpen}
        onOpenChange={setVerificationOpen}
        className="rounded-lg border bg-card text-card-foreground"
      >
        <VerificationSection 
          open={verificationOpen}
          onOpenChange={setVerificationOpen}
          verificationMethod={verificationMethod}
          onVerificationMethodChange={handleVerificationMethodChange}
        />
      </Collapsible>

      <Collapsible
        open={contactOpen}
        onOpenChange={setContactOpen}
        className="rounded-lg border bg-card text-card-foreground"
      >
        <ContactSection 
          open={contactOpen}
          onOpenChange={setContactOpen}
          contactDetails={contactDetails}
          onContactChange={handleContactChange}
          onCountryCodeChange={handleCountryCodeChange}
        />
      </Collapsible>

      <Collapsible
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        className="rounded-lg border bg-card text-card-foreground"
      >
        <PaymentSection 
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          paymentVerified={paymentVerified}
          onPaymentVerification={handlePaymentVerification}
        />
      </Collapsible>
    </FinishLayout>
  );
};