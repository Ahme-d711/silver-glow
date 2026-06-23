"use client";

import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { ORDERED_COUNTRIES, Country } from "@/utils/countries";
import {
  formatPhoneWithCountryCode,
  getCountryFromPhoneValue,
  getLocalPhoneDigits,
  parsePhoneInput,
} from "@/utils/phone";

interface UniPhoneInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export function UniPhoneInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = "123456789",
  className,
  required = false,
  disabled = false,
}: UniPhoneInputProps<TFieldValues>) {
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(ORDERED_COUNTRIES[0]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const isRtl = useLocale() === "ar";

  const filteredCountries = ORDERED_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery)
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const countryFromValue = getCountryFromPhoneValue(field.value);
        const activeCountry = countryFromValue ?? selectedCountry;

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const parsed = parsePhoneInput(e.target.value, activeCountry);
          setSelectedCountry(parsed.country);
          field.onChange(`${parsed.country.dialCode}${parsed.localDigits}`);
        };

        const displayValue = getLocalPhoneDigits(field.value, activeCountry);

        return (
          <FormItem className={cn(isRtl && "text-right", className)} id={name}>
            {label && (
              <FormLabel
                className={cn(
                  "text-base text-content-secondary font-medium cursor-pointer",
                  isRtl && "block w-full text-right",
                )}
              >
                {label}
                {required && <span className="text-destructive ms-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div
                className={cn(
                  "flex h-12.5 w-full items-stretch rounded-xl border border-divider/50 bg-white ring-offset-background focus-within:border-primary transition-all",
                  isRtl && "flex-row-reverse",
                )}
              >
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={disabled}
                      className={cn(
                        "flex items-center gap-1.5 px-3 border-divider/50 hover:bg-black/5 transition-colors focus:outline-none",
                        isRtl ? "border-s rounded-e-xl" : "border-e rounded-s-xl",
                      )}
                    >
                      <span className="text-lg leading-none">{activeCountry.flag}</span>
                      <span className="text-sm font-semibold text-content-primary leading-none">
                        {activeCountry.dialCode}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 z-100" align="start">
                    <div className="p-3 border-b border-divider">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          className="h-9 w-full rounded-md border border-divider bg-transparent py-2 pl-9 pr-3 text-sm outline-none focus:border-primary transition-colors"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      {filteredCountries.length === 0 ? (
                        <div className="p-4 text-sm text-center text-muted-foreground">No country found.</div>
                      ) : (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            className={cn(
                              "flex items-center w-full gap-2 px-4 py-3 text-sm hover:bg-black/5 transition-colors text-left",
                              activeCountry.code === country.code && "bg-black/5 font-semibold"
                            )}
                            onClick={() => {
                              const localDigits = getLocalPhoneDigits(field.value, activeCountry);
                              setSelectedCountry(country);
                              setOpen(false);
                              setSearchQuery("");
                              field.onChange(formatPhoneWithCountryCode(localDigits, country));
                            }}
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="flex-1 truncate">{country.name}</span>
                            <span className="text-muted-foreground text-xs">{country.dialCode}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  type="tel"
                  placeholder={placeholder}
                  disabled={disabled}
                  dir={isRtl ? "rtl" : "ltr"}
                  className={cn(
                    "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full px-4 flex-1 shadow-none",
                    isRtl ? "rounded-s-xl text-right" : "rounded-e-xl",
                  )}
                  value={displayValue}
                  onChange={handlePhoneChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage className={cn("text-xs", isRtl && "text-right")} />
          </FormItem>
        );
      }}
    />
  );
}
