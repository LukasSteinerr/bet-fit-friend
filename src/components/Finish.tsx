import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const countryCodes = [
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+33", country: "France" },
    { code: "+49", country: "Germany" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
  ];

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
                      <div className="flex gap-2">
                        <Select
                          value={contactDetails.countryCode}
                          onValueChange={handleCountryCodeChange}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  <span>{country.code}</span>
                                  <span className="text-muted-foreground">
                                    {country.country}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={contactDetails.phone}
                          onChange={handleContactChange}
                          className="flex-1"
                        />
                      </div>
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

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="px-8">
            Review & confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
