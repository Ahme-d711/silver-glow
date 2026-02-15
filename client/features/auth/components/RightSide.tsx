import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function RightSide() {
  const t = useTranslations("Auth");

  return (
    <div className="h-screen w-1/2 hidden lg:flex object-center justify-center bg-primary rounded-bl-[150px]">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image 
          src="/logo.svg" 
          alt={t("logo_alt")} 
          width={266}
          height={365}
          className="object-contain"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-white text-[40px]">Silver Glow</h1>
          <p className="text-xl text-center text-secondary">{t("since", { year: 2007 })}</p>
        </div>
      </div>
    </div>
  );
}
