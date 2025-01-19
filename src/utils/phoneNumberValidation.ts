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
  return code.replace('+', '').toUpperCase();
};

export const getCodeFromCountry = (country: string): string => {
  return `+${country}`;
};