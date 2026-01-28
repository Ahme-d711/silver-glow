export interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

export const COUNTRIES: Country[] = [
  { name: "Egypt", code: "EG", flag: "🇪🇬", dialCode: "+20" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", dialCode: "+965" },
  { name: "Qatar", code: "QA", flag: "🇶🇦", dialCode: "+974" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", dialCode: "+973" },
  { name: "Oman", code: "OM", flag: "🇴🇲", dialCode: "+968" },
  { name: "Jordan", code: "JO", flag: "🇯🇴", dialCode: "+962" },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", dialCode: "+961" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", dialCode: "+90" },
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
].sort((a, b) => a.name.localeCompare(b.name));

// Put priority countries at the top (example: Egypt, UAE, SA)
const PRIORITY_CODES = ["EG", "AE", "SA"];
export const ORDERED_COUNTRIES = [
  ...COUNTRIES.filter((c) => PRIORITY_CODES.includes(c.code)),
  ...COUNTRIES.filter((c) => !PRIORITY_CODES.includes(c.code)),
];
