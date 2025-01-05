import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Finish = () => {
  const [verificationOpen, setVerificationOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
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

        <div className="grid gap-8">
          {/* Preview Card */}
          <Card className="relative overflow-hidden border-none bg-gradient-to-br from-secondary/50 to-warning/30 p-8">
            <div className="relative z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
                I commit to get a job on a weekly basis for 2 days.
              </h2>
            </div>
          </Card>

          {/* Form Section */}
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
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${verificationOpen ? 'bg-primary' : 'bg-muted'}`} />
                    <span className="font-medium">Verification</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${verificationOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-4 pt-0">
                  <div className="space-y-2">
                    <h3 className="font-medium">Choose your verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Through this channel you will receive weekly reminders where you'll be asked to verify that you took action.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button variant="outline" className="h-auto justify-start p-4" disabled>
                      <div className="text-left">
                        <div className="font-medium">Text Message (SMS)</div>
                        <div className="text-sm text-muted-foreground">Available soon</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto justify-start p-4">
                      <div className="text-left">
                        <div className="font-medium">WhatsApp</div>
                      </div>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={contactOpen}
                onOpenChange={setContactOpen}
                className="rounded-lg border bg-card text-card-foreground"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${contactOpen ? 'bg-primary' : 'bg-muted'}`} />
                    <span className="font-medium">Contact</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${contactOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Add your contact details</h3>
                      <p className="text-sm text-muted-foreground">
                        Add your name, e-mail and phone number.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Your first name"
                          value={contactDetails.firstName}
                          onChange={handleContactChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your e-mail"
                          value={contactDetails.email}
                          onChange={handleContactChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={contactDetails.phone}
                          onChange={handleContactChange}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={paymentOpen}
                onOpenChange={setPaymentOpen}
                className="rounded-lg border bg-card text-card-foreground"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${paymentOpen ? 'bg-primary' : 'bg-muted'}`} />
                    <span className="font-medium">Payment Method</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${paymentOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0">
                  Payment method form content here
                </CollapsibleContent>
              </Collapsible>
            </div>
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