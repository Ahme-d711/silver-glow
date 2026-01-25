"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Languages } from "lucide-react"

export function LanguageSetting() {
  const locale = useLocale()
  const t = useTranslations("Settings")
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // Current pathname includes the locale (e.g., /en/dashboard)
    // next-intl middleware handles the redirection
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Card className="px-10 py-6 rounded-[32px] border bg-background border-divider shadow-none">
      <div className="">
        <label className="text-lg font-medium text-content-primary">
          {t("language")}
        </label>
        
        <Select value={locale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="h-14 rounded-2xl border-divider/50 mt-4 bg-white focus:ring-primary shadow-none px-6 w-full">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-divider bg-white" position="popper">
            <SelectItem value="en" className="py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-xl">🇺🇸</span>
                <span className="font-medium">{t("english")}</span>
              </div>
            </SelectItem>
            <SelectItem value="ar" className="py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-xl">🇪🇬</span>
                <span className="font-medium">{t("arabic")}</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
