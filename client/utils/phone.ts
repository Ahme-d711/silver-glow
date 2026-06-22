import { ORDERED_COUNTRIES, type Country } from "./countries";

const COUNTRIES_BY_DIAL_LENGTH = [...ORDERED_COUNTRIES].sort(
  (a, b) => b.dialCode.replace(/\D/g, "").length - a.dialCode.replace(/\D/g, "").length
);

/** Digits-only phone for API calls (no +, no spaces). */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return "";

  let value = phone.trim();
  try {
    if (value.includes("%")) {
      value = decodeURIComponent(value);
    }
  } catch {
    // Keep original value when decoding fails.
  }

  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  return digits;
}

export function parsePhoneInput(
  rawInput: string,
  fallbackCountry: Country
): { country: Country; localDigits: string } {
  let digits = rawInput.replace(/\D/g, "");

  const fallbackDial = fallbackCountry.dialCode.replace(/\D/g, "");
  if (fallbackDial && digits.startsWith(fallbackDial)) {
    let localDigits = digits.slice(fallbackDial.length);
    if (localDigits.startsWith("0")) {
      localDigits = localDigits.slice(1);
    }
    return { country: fallbackCountry, localDigits };
  }

  // Auto-detect only for pasted full international numbers.
  if (digits.length >= 11) {
    for (const country of COUNTRIES_BY_DIAL_LENGTH) {
      const dialDigits = country.dialCode.replace(/\D/g, "");
      if (dialDigits.length < 2) continue;
      if (digits.startsWith(dialDigits)) {
        let localDigits = digits.slice(dialDigits.length);
        if (localDigits.startsWith("0")) {
          localDigits = localDigits.slice(1);
        }
        return { country, localDigits };
      }
    }
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return { country: fallbackCountry, localDigits: digits };
}

export function formatPhoneWithCountryCode(localDigits: string, country: Country): string {
  const { country: resolvedCountry, localDigits: normalized } = parsePhoneInput(
    localDigits,
    country
  );
  return `${resolvedCountry.dialCode}${normalized}`;
}

export function getCountryFromPhoneValue(value: string | undefined): Country | undefined {
  if (!value) return undefined;

  const digits = normalizePhoneNumber(value);
  return COUNTRIES_BY_DIAL_LENGTH.find((country) => {
    const dialDigits = country.dialCode.replace(/\D/g, "");
    return dialDigits.length >= 2 && digits.startsWith(dialDigits);
  });
}

export function getLocalPhoneDigits(value: string | undefined, country: Country): string {
  if (!value) return "";

  const digits = normalizePhoneNumber(value);
  const dialDigits = country.dialCode.replace(/\D/g, "");

  if (digits.startsWith(dialDigits)) {
    const local = digits.slice(dialDigits.length);
    return local.startsWith("0") ? local.slice(1) : local;
  }

  return parsePhoneInput(digits, country).localDigits;
}

export function toApiPhone(value: string): string {
  return normalizePhoneNumber(value);
}
