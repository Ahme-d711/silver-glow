"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { Globe, Check } from "lucide-react"
import { useLocale } from "next-intl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇪🇬' },
]

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost"
          size="icon"
          className="rounded-xl hover:bg-accent"
          aria-label="Select Language"
        >
          <Globe className="w-5 h-5" />
          <span className="sr-only">Select Language</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <div className="flex flex-col gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </div>
              {locale === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

