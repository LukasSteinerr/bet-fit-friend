import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneInputProps {
  onChange: (phone: string, countryCode: string) => void;
}

const countryCodes = [
  { value: "+1", label: "US/CA (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+61", label: "AU (+61)" },
  { value: "+33", label: "FR (+33)" },
  { value: "+49", label: "DE (+49)" },
  { value: "+81", label: "JP (+81)" },
  { value: "+86", label: "CN (+86)" },
];

export const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    onChange(value, countryCode);
  };

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    onChange(phone, value);
  };

  return (
    <div className="flex gap-2">
      <Select
        value={countryCode}
        onValueChange={handleCountryCodeChange}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((code) => (
            <SelectItem key={code.value} value={code.value}>
              {code.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder="(555) 555-5555"
        value={phone}
        onChange={handlePhoneChange}
        className="flex-1"
      />
    </div>
  );
};