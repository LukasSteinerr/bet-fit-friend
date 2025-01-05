import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${open ? 'bg-primary' : 'bg-muted'}`} />
          <span className="font-medium">Contact</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
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
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select
                  value={contactDetails.countryCode}
                  onValueChange={onCountryCodeChange}
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
                  onChange={onContactChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </>
  );
};