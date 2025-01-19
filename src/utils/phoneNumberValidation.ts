import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export const validatePhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
  try {
    return isValidPhoneNumber(phoneNumber, countryCode as CountryCode);
  } catch (error) {
    return false;
  }
};

export const formatPhoneNumber = (phoneNumber: string, countryCode: string): string => {
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, countryCode as CountryCode);
    return parsedNumber ? parsedNumber.formatNational() : phoneNumber;
  } catch (error) {
    return phoneNumber;
  }
};

export const getCountryFromCode = (code: string): string => {
  const countryCode = code.replace('+', '');
  switch (countryCode) {
    case '1': return 'US';
    case '44': return 'GB';
    case '46': return 'SE';
    case '61': return 'AU';
    case '33': return 'FR';
    case '49': return 'DE';
    case '81': return 'JP';
    case '86': return 'CN';
    default: return 'US';
  }
};

export const getCodeFromCountry = (country: string): string => {
  switch (country) {
    case 'US': return '+1';
    case 'GB': return '+44';
    case 'SE': return '+46';
    case 'AU': return '+61';
    case 'FR': return '+33';
    case 'DE': return '+49';
    case 'JP': return '+81';
    case 'CN': return '+86';
    default: return '+1';
  }
};