import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ReactFlagsSelect from "react-flags-select";
import { validatePhoneNumber, formatPhoneNumber, getCountryFromCode, getCodeFromCountry } from "@/utils/phoneNumberValidation";

interface PhoneInputProps {
  onChange: (phone: string, countryCode: string) => void;
  initialValue?: {
    phone: string;
    countryCode: string;
  };
}

const countryCodes = [
  { code: "US", dial: "+1" },
  { code: "GB", dial: "+44" },
  { code: "SE", dial: "+46" },
  { code: "AU", dial: "+61" },
  { code: "FR", dial: "+33" },
  { code: "DE", dial: "+49" },
  { code: "JP", dial: "+81" },
  { code: "CN", dial: "+86" },
];

export const PhoneInput = ({ onChange, initialValue }: PhoneInputProps) => {
  const [phone, setPhone] = useState(initialValue?.phone || "");
  const [countryCode, setCountryCode] = useState(initialValue?.countryCode || "+1");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (initialValue) {
      setPhone(initialValue.phone);
      setCountryCode(initialValue.countryCode);
    }
  }, [initialValue]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value.replace(/[^\d]/g, '');
    setPhone(newPhone);
    
    const isValidNumber = validatePhoneNumber(newPhone, countryCode);
    setIsValid(isValidNumber);
    
    onChange(newPhone, countryCode);
  };

  const handleCountryChange = (countryCode: string) => {
    const dialCode = countryCodes.find(c => c.code === countryCode)?.dial || "+1";
    setCountryCode(dialCode);
    
    const isValidNumber = validatePhoneNumber(phone, dialCode);
    setIsValid(isValidNumber);
    
    onChange(phone, dialCode);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="w-[140px]">
          <ReactFlagsSelect
            selected={getCountryFromCode(countryCode)}
            onSelect={handleCountryChange}
            countries={countryCodes.map(c => c.code)}
            customLabels={{
              US: "US (+1)",
              GB: "UK (+44)",
              SE: "SE (+46)",
              AU: "AU (+61)",
              FR: "FR (+33)",
              DE: "DE (+49)",
              JP: "JP (+81)",
              CN: "CN (+86)",
            }}
            placeholder="Select"
            searchable={false}
          />
        </div>
        <Input
          type="tel"
          placeholder="(555) 555-5555"
          value={formatPhoneNumber(phone, countryCode)}
          onChange={handlePhoneChange}
          className={`flex-1 ${!isValid && phone ? 'border-red-500' : ''}`}
        />
      </div>
      {!isValid && phone && (
        <p className="text-sm text-red-500">
          Please enter a valid phone number for {countryCodes.find(c => c.code === getCountryFromCode(countryCode))?.code}
        </p>
      )}
    </div>
  );
};