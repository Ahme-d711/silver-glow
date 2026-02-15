import { useTranslations } from "next-intl";
import Link from "next/link";

export function AuthFooter() {
  const t = useTranslations("Auth");

  return (
    <div className="absolute bottom-10 left-10 md:left-24 lg:left-60 w-[calc(100%-80px)] lg:w-[1300px] flex flex-col md:flex-row items-center justify-between pointer-events-auto z-10">
      <span className="text-sm font-medium text-primary/60 text-center md:text-left mb-4 md:mb-0">
        {t("rights", { year: new Date().getFullYear() })}
      </span>
      <div className="flex items-center gap-4 md:gap-8 text-white text-sm font-medium">
        <Link href="#" className="hover:opacity-80 transition-opacity">{t("marketplace")}</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">{t("license")}</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">{t("terms_of_use")}</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">{t("blog")}</Link>
      </div>
    </div>
  );
}
