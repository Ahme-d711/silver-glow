# نظام الترجمة (Internationalization - i18n)

تم تطبيق نظام ترجمة متقدم باستخدام `next-intl` يدعم اللغتين العربية والإنجليزية.

## البنية التحتية

```
client/
├── i18n/
│   ├── routing.ts       # إعدادات التوجيه واللغات
│   └── request.ts       # تحميل ملفات الترجمة
├── messages/
│   ├── ar.json          # الترجمة العربية
│   └── en.json          # الترجمة الإنجليزية
├── middleware.ts        # Middleware للتعامل مع اللغات
└── app/
    └── [locale]/        # المجلد الديناميكي للغة
        ├── layout.tsx   # Layout يدعم RTL/LTR
        └── ...
```

## كيفية الاستخدام

### 1. في Server Components

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Navigation');
  
  return <h1>{t('home')}</h1>;
}
```

### 2. في Client Components

```tsx
"use client"

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('Auth');
  
  return <button>{t('login')}</button>;
}
```

### 3. استخدام الروابط

استخدم `Link` من `@/i18n/routing` بدلاً من `next/link`:

```tsx
import { Link } from '@/i18n/routing';

export default function MyComponent() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

### 4. استخدام Router

```tsx
"use client"

import { useRouter } from '@/i18n/routing';

export default function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/dashboard');
  };
  
  return <button onClick={handleClick}>Go</button>;
}
```

### 5. الحصول على اللغة الحالية

```tsx
import { useLocale } from 'next-intl';

export default function MyComponent() {
  const locale = useLocale(); // 'ar' or 'en'
  
  return <div>Current locale: {locale}</div>;
}
```

## إضافة ترجمات جديدة

1. افتح ملف `/messages/ar.json` و `/messages/en.json`
2. أضف الترجمات بنفس البنية:

```json
{
  "MySection": {
    "title": "عنوان",
    "description": "وصف"
  }
}
```

3. استخدمها في الكود:

```tsx
const t = useTranslations('MySection');
console.log(t('title'));
```

## مكون تبديل اللغة

تم إنشاء مكون `LanguageSelector` يمكن استخدامه في أي مكان:

```tsx
import LanguageSelector from '@/components/shared/LanguageSelector';

export default function Navbar() {
  return (
    <nav>
      {/* محتوى Navbar */}
      <LanguageSelector />
    </nav>
  );
}
```

## دعم RTL

تم تكوين النظام تلقائياً لدعم RTL للغة العربية:
- عند اختيار العربية، يتم تطبيق `dir="rtl"` على عنصر HTML
- عند اختيار الإنجليزية، يتم تطبيق `dir="ltr"`

## الروابط

- البنية: `/{locale}/{path}`
- مثال: `/ar/dashboard` أو `/en/dashboard`
- يتم التعامل تلقائياً مع إعادة التوجيه للغة الافتراضية

## مثال كامل

```tsx
"use client"

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';

export default function ExamplePage() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const router = useRouter();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>Current language: {locale}</p>
      
      <Link href="/users">
        {t('users')}
      </Link>
      
      <button onClick={() => router.push('/products')}>
        {t('products')}
      </button>
    </div>
  );
}
```

## ملاحظات مهمة

1. **استخدم دائماً** `Link` و `useRouter` من `@/i18n/routing` وليس من `next/navigation`
2. **أضف الترجمات** في كلا الملفين (`ar.json` و `en.json`)
3. **استخدم نفس البنية** في كلا الملفين للحفاظ على التناسق
4. **اختبر** التطبيق في كلا اللغتين للتأكد من عمل كل شيء بشكل صحيح
