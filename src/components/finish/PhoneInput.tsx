import { useState, useEffect } from "react";
import { parsePhoneNumber, CountryCode, AsYouType } from "libphonenumber-js";
import { Check, Phone, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
];

export const PhoneInput = ({
  value,
  countryCode,
  onChange,
  onCountryChange,
}: PhoneInputProps) => {
  const [isValid, setIsValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    try {
      const asYouType = new AsYouType(countryCode.slice(1) as CountryCode);
      const formatted = asYouType.input(value);
      setFormattedValue(formatted);

      const phoneNumber = parsePhoneNumber(countryCode + value);
      setIsValid(phoneNumber?.isValid() || false);
    } catch (error) {
      setIsValid(false);
    }
  }, [value, countryCode]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, "");
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex gap-2">
        <Select value={countryCode} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Input
            id="phone"
            type="tel"
            value={formattedValue}
            onChange={handlePhoneChange}
            className={`pr-10 ${
              isValid ? "border-primary" : value ? "border-warning" : ""
            }`}
            placeholder="Your phone number"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {value ? (
              isValid ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Phone className="h-4 w-4 text-warning" />
              )
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};