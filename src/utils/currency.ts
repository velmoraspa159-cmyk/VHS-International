export const CURRENCY_SYMBOL = "₹";
export const CURRENCY_CODE = "INR";

export const formatINR = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  majorCities: string[];
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    majorCities: ['Delhi NCR / Gurgaon', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Goa', 'Pune', 'Zirakpur / Punjab']
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    majorCities: ['Madrid', 'Barcelona', 'Marbella / Costa del Sol', 'Ibiza', 'Mallorca', 'Valencia', 'Sevilla']
  }
];
