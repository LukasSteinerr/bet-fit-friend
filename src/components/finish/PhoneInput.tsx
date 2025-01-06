interface PhoneInputProps {
  onChange: (phone: string, countryCode: string) => void;
}

export const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Assuming the phone number is in a specific format, you can extract the country code and phone number here
    const countryCode = "+1"; // Default country code, you can modify this as needed
    onChange(value, countryCode);
  };

  return (
    <input
      type="tel"
      placeholder="Enter your phone number"
      onChange={handlePhoneChange}
      className="border rounded-md p-2 w-full"
    />
  );
};
