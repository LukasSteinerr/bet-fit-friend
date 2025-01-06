import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PhoneInputProps {
  onChange: (phone: string, countryCode: string) => void;
}

export const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const [phone, setPhone] = useState("");
  
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    onChange(value, "+1"); // Using default country code for now
  };

  return (
    <Input
      type="tel"
      placeholder="(555) 555-5555"
      value={phone}
      onChange={handlePhoneChange}
      className="mt-1"
    />
  );
};