import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { VerificationSection } from "./finish/VerificationSection";
import { ContactSection } from "./finish/ContactSection";
import { PaymentSection } from "./finish/PaymentSection";

export const Finish = () => {
  const [verificationOpen, setVerificationOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">✓</span>
            </div>
            <span className="text-sm font-medium text-primary">Create commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">✓</span>
            </div>
            <span className="text-sm font-medium text-primary">Add stake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">3</span>
            </div>
            <span className="text-sm font-medium text-primary">Finish</span>
          </div>
        </div>

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
              />
            </Collapsible>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="px-8">
            Review & confirm
          </Button>
        </div>
      </div>
    </div>
  );
};