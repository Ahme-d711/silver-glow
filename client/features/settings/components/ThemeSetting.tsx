"use client"

import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Moon, Sun } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ThemeSetting() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("Settings")

  return (
    <Card className="p-8 rounded-[32px] border border-divider shadow-none">
      <div className="space-y-4">
        <label className="text-lg font-semibold text-content-primary">
          {t("theme")}
        </label>
        
        <Select value={theme} onValueChange={setTheme} >
          <SelectTrigger className="h-14 rounded-2xl border-divider/50 focus:ring-primary w-full shadow-none px-6">
            <SelectValue placeholder={t("theme")} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-divider w-full" position="popper">
            <SelectItem value="light" className="py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-amber-500" />
                <span className="font-medium">{t("light")}</span>
              </div>
            </SelectItem>
            <SelectItem value="dark" className="py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-blue-500" />
                <span className="font-medium">{t("dark")}</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
