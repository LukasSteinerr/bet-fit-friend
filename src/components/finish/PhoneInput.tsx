import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneInputProps {
  onChange: (phone: string, countryCode: string) => void;
  initialValue?: {
    phone: string;
    countryCode: string;
  };
}

const countryCodes = [
  { value: "+1", label: "US/CA (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+46", label: "SE (+46)" },
  { value: "+61", label: "AU (+61)" },
  { value: "+33", label: "FR (+33)" },
  { value: "+49", label: "DE (+49)" },
  { value: "+81", label: "JP (+81)" },
  { value: "+86", label: "CN (+86)" },
];

export const PhoneInput = ({ onChange, initialValue }: PhoneInputProps) => {
  const [phone, setPhone] = useState(initialValue?.phone || "");
  const [countryCode, setCountryCode] = useState(initialValue?.countryCode || "+1");

  useEffect(() => {
    if (initialValue) {
      setPhone(initialValue.phone);
      setCountryCode(initialValue.countryCode);
    }
  }, [initialValue]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value.replace(/[^\d]/g, '');
    setPhone(newPhone);
    onChange(newPhone, countryCode);
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