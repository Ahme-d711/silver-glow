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
import { ORDERED_COUNTRIES, Country } from "@/utils/countries";

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
        // Safe split: find which country code the string starts with
        // For registration initialized with "", it will use selectedCountry.
        // If it has a value like "+2010...", we should ideally match it to EG.
        
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, ""); // Only numbers
            // We store the FULL code + number
            field.onChange(`${selectedCountry.dialCode}${rawValue}`);
        };

        // Extract the "local" part for the input display
        const displayValue = field.value?.replace(selectedCountry.dialCode, "") || "";

        return (
          <FormItem className={cn(className)} id={name}>
            {label && (
              <FormLabel className="text-base text-content-secondary font-medium cursor-pointer">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex h-12.5 w-full items-stretch rounded-xl border border-divider/50 bg-white ring-offset-background focus-within:border-primary transition-all">
                {/* Country Picker */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={disabled}
                      className="flex items-center gap-1.5 px-3 border-r border-divider/50 hover:bg-black/5 transition-colors rounded-l-xl focus:outline-none"
                    >
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span className="text-sm font-semibold text-content-primary leading-none">{selectedCountry.dialCode}</span>
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
                              selectedCountry.code === country.code && "bg-black/5 font-semibold"
                            )}
                            onClick={() => {
                              const oldLocal = field.value?.replace(selectedCountry.dialCode, "") || "";
                              setSelectedCountry(country);
                              setOpen(false);
                              setSearchQuery("");
                              // Update full phone string with new code
                              field.onChange(`${country.dialCode}${oldLocal}`);
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

                {/* Phone Input */}
                <Input
                  type="tel"
                  placeholder={placeholder}
                  disabled={disabled}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full rounded-none rounded-r-xl px-4 flex-1 shadow-none"
                  value={displayValue}
                  onChange={handlePhoneChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  );
}
