import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { VerificationSection } from "./finish/VerificationSection";
import { ContactSection } from "./finish/ContactSection";
import { PaymentSection } from "./finish/PaymentSection";
import { ProgressSteps } from "./ProgressSteps";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const Finish = () => {
  const navigate = useNavigate();
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
      
      if (!session) {
        setShowAuth(true);
        return;
      }

      const { error } = await supabase
        .from('commitments')
        .update({
          verification_method: verificationMethod,
          contact_details: contactDetails,
          payment_verified: paymentVerified,
          payment_method_id: paymentMethodId,
          user_id: session.user.id
        })
        .is('payment_verified', null);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your commitment has been created",
      });
      
      navigate('/');
    } catch (error) {
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
        <div className="container max-w-md">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
            Create an account to complete your commitment
          </h2>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/finish`}
            onlyThirdPartyProviders
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        <ProgressSteps currentStep={3} />
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Add details</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you want to verify your actions and add your contact info.
            </p>
          </div>

          <div className="space-y-4">
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
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            size="lg" 
            className="px-8"
            onClick={handleSubmit}
            disabled={!isComplete}
          >
            Review & confirm
          </Button>
        </div>
      </div>
    </div>
  );
};