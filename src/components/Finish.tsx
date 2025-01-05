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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const Finish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
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
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const commitmentData = location.state?.commitmentData;
  const stakeData = location.state?.stakeData;

  // If we don't have the required data, show the error section
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
    setPaymentVerified(true);
  };

  const handleConfirm = async () => {
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
            paymentVerified={paymentVerified}
            onPaymentVerification={handlePaymentVerification}
          />
        </Collapsible>
      </FinishLayout>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm your commitment</DialogTitle>
            <DialogDescription>
              Please review your commitment details before finalizing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Commitment</h4>
              <p className="text-sm text-muted-foreground">
                {commitmentData.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {commitmentData.frequency} until {format(new Date(commitmentData.end_date), 'PPP')}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Stake</h4>
              <p className="text-sm text-muted-foreground">
                ${stakeData.amount} to {stakeData.charity}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Contact</h4>
              <p className="text-sm text-muted-foreground">
                {contactDetails.firstName} • {contactDetails.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {contactDetails.countryCode} {contactDetails.phone}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Verification</h4>
              <p className="text-sm text-muted-foreground">
                Via {verificationMethod === 'whatsapp' ? 'WhatsApp' : 'SMS'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm & Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};