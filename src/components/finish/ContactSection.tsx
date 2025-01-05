import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { PhoneInput } from "./PhoneInput";

interface ContactSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactDetails: {
    firstName: string;
    email: string;
    phone: string;
    countryCode: string;
  };
  onContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryCodeChange: (value: string) => void;
}

export const ContactSection = ({
  open,
  onOpenChange,
  contactDetails,
  onContactChange,
  onCountryCodeChange,
}: ContactSectionProps) => {
  const isComplete = 
    contactDetails.firstName.trim() !== "" && 
    contactDetails.email.trim() !== "" && 
    contactDetails.phone.trim() !== "";

  const displayValue = isComplete 
    ? `${contactDetails.firstName} • ${contactDetails.countryCode}${contactDetails.phone}`
    : undefined;

  const handlePhoneChange = (value: string) => {
    onContactChange({
      target: { name: "phone", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <CollapsibleTrigger 
        className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground"
      >
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isComplete ? "bg-primary" : "bg-muted"}`} />
          <span className="font-medium">Contact</span>
          {displayValue && (
            <span className="text-sm text-muted-foreground">{displayValue}</span>
          )}
        </div>
        <ChevronRight className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4">
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
              onChange={onContactChange}
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
              onChange={onContactChange}
            />
          </div>
          <PhoneInput
            value={contactDetails.phone}
            countryCode={contactDetails.countryCode}
            onChange={handlePhoneChange}
            onCountryChange={onCountryCodeChange}
          />
        </div>
      </CollapsibleContent>
    </>
  );
};