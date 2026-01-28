import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {t('Brand.name')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('Navigation.home')}
        </p>
      </div>
    </div>
  );
}
