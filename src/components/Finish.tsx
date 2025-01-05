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

  const isComplete = verificationMethod && 
    contactDetails.firstName && 
    contactDetails.email && 
    contactDetails.phone && 
    paymentMethodId;

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