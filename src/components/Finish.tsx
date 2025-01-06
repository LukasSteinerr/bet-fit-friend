import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Collapsible } from "@/components/ui/collapsible";
import { VerificationSection } from "./finish/VerificationSection";
import { ContactSection } from "./finish/ContactSection";
import { PaymentSection } from "./finish/PaymentSection";
import { FinishLayout } from "./finish/FinishLayout";
import { AuthSection } from "./finish/AuthSection";
import { ErrorSection } from "./finish/ErrorSection";
import { ConfirmDialog } from "./finish/ConfirmDialog";
import { useCommitmentSubmission } from "./finish/useCommitmentSubmission";

export const Finish = () => {
  const location = useLocation();
  const [verificationOpen, setVerificationOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'whatsapp' | null>(null);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  });
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const { handleSubmit, isSubmitting } = useCommitmentSubmission();

  const commitmentData = location.state?.commitmentData;
  const stakeData = location.state?.stakeData;

  if (!location.state || !commitmentData || !stakeData) {
    return <ErrorSection />;
  }

  const handleVerificationMethodChange = (method: 'sms' | 'whatsapp') => {
    setVerificationMethod(method);
    if (method) {
      setVerificationOpen(false);
      setContactOpen(true);
    }
  };

  const handleContactDetailsChange = (details: typeof contactDetails) => {
    setContactDetails(details);
    // Only proceed if all fields are filled
    if (details.firstName && details.email && details.phone && details.countryCode) {
      setContactOpen(false);
      setPaymentOpen(true);
    }
  };

  const handlePaymentVerification = (methodId: string) => {
    setPaymentMethodId(methodId);
  };

  const handleConfirm = () => {
    handleSubmit(
      commitmentData,
      stakeData,
      contactDetails,
      verificationMethod,
      paymentMethodId
    );
    setShowConfirmDialog(false);
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
          open={verificationOpen}
          onOpenChange={setVerificationOpen}
          className="rounded-lg border bg-card text-card-foreground"
        >
          <VerificationSection 
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
            onContactDetailsChange={handleContactDetailsChange}
            initialValues={contactDetails}
          />
        </Collapsible>

        <Collapsible
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          className="rounded-lg border bg-card text-card-foreground"
        >
          <PaymentSection 
            paymentVerified={!!paymentMethodId}
            onPaymentVerification={handlePaymentVerification}
          />
        </Collapsible>
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