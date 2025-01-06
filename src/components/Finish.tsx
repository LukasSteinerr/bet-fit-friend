import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapsible } from "@/components/ui/collapsible";
import { VerificationSection } from "./finish/VerificationSection";
import { ContactSection } from "./finish/ContactSection";
import { PaymentSection } from "./finish/PaymentSection";
import { FinishLayout } from "./finish/FinishLayout";
import { AuthSection } from "./finish/AuthSection";
import { ErrorSection } from "./finish/ErrorSection";
import { ConfirmDialog } from "./finish/ConfirmDialog";
import { useCommitmentSubmission } from "./finish/useCommitmentSubmission";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const Finish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Section visibility states
  const [currentSection, setCurrentSection] = useState<'verification' | 'contact' | 'payment'>('verification');
  
  // Form data states
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'whatsapp' | null>(null);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  });
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  
  // UI states
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const { handleSubmit, isSubmitting } = useCommitmentSubmission();

  const commitmentData = location.state?.commitmentData;
  const stakeData = location.state?.stakeData;

  if (!location.state || !commitmentData || !stakeData) {
    return <ErrorSection />;
  }

  const handleVerificationMethodChange = (method: 'sms' | 'whatsapp') => {
    setVerificationMethod(method);
    setCurrentSection('contact');
  };

  const handleContactDetailsSubmit = (details: typeof contactDetails) => {
    setContactDetails(details);
    setCurrentSection('payment');
  };

  const handlePaymentVerification = (methodId: string) => {
    setPaymentMethodId(methodId);
    toast({
      title: "Payment method saved",
      description: "Your card has been securely saved for future use.",
    });
  };

  const handleConfirm = async () => {
    try {
      await handleSubmit(
        commitmentData,
        stakeData,
        contactDetails,
        verificationMethod,
        paymentMethodId
      );
      setShowConfirmDialog(false);
      navigate('/success');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create commitment",
        variant: "destructive",
      });
    }
  };

  const isComplete = Boolean(
    verificationMethod && 
    contactDetails.firstName && 
    contactDetails.email && 
    contactDetails.phone && 
    paymentMethodId
  );

  if (showAuth) {
    return <AuthSection />;
  }

  return (
    <>
      <FinishLayout 
        isComplete={isComplete} 
        onSubmit={() => setShowConfirmDialog(true)}
      >
        <Collapsible
          open={currentSection === 'verification'}
          onOpenChange={() => setCurrentSection('verification')}
          className="rounded-lg border bg-card text-card-foreground"
        >
          <VerificationSection 
            verificationMethod={verificationMethod}
            onVerificationMethodChange={handleVerificationMethodChange}
          />
        </Collapsible>

        <Collapsible
          open={currentSection === 'contact'}
          onOpenChange={() => {
            if (verificationMethod) {
              setCurrentSection('contact');
            } else {
              toast({
                title: "Select verification method",
                description: "Please select a verification method first.",
                variant: "destructive",
              });
            }
          }}
          className="rounded-lg border bg-card text-card-foreground"
        >
          <ContactSection 
            onSubmit={handleContactDetailsSubmit}
            initialValues={contactDetails}
          />
        </Collapsible>

        <Collapsible
          open={currentSection === 'payment'}
          onOpenChange={() => {
            if (contactDetails.firstName && contactDetails.email && contactDetails.phone) {
              setCurrentSection('payment');
            } else {
              toast({
                title: "Complete contact details",
                description: "Please fill in all contact details first.",
                variant: "destructive",
              });
            }
          }}
          className="rounded-lg border bg-card text-card-foreground"
        >
          <PaymentSection 
            paymentVerified={!!paymentMethodId}
            onPaymentVerification={handlePaymentVerification}
          />
        </Collapsible>

        {isComplete && (
          <div className="mt-6">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setShowConfirmDialog(true)}
            >
              Review & confirm
            </Button>
          </div>
        )}
      </FinishLayout>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        commitmentData={commitmentData}
        stakeData={stakeData}
        contactDetails={contactDetails}
        verificationMethod={verificationMethod}
        onConfirm={handleConfirm}
      />
    </>
  );
};