# البنية المعمارية لنظام الترجمة

## رسم توضيحي للبنية

```
┌─────────────────────────────────────────────────────┐
│                   Browser Request                    │
│              (http://localhost:3000/ar/...)          │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  middleware.ts                       │
│  ┌──────────────────────────────────────────────┐   │
│  │ 1. يقرأ اللغة من URL                         │   │
│  │ 2. يتحقق من صحة اللغة (ar/en)               │   │
│  │ 3. يعيد التوجيه إن لزم الأمر                │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              app/[locale]/layout.tsx                 │
│  ┌──────────────────────────────────────────────┐   │
│  │ 1. يستقبل locale من params                  │   │
│  │ 2. يحمل messages من i18n/request.ts         │   │
│  │ 3. يحدد direction (rtl/ltr)                 │   │
│  │ 4. يضع NextIntlClientProvider               │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│ Server       │          │ Client       │
│ Components   │          │ Components   │
└──────────────┘          └──────────────┘
        │                         │
        └────────────┬────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   useTranslations()    │
        │         ↓              │
        │   messages/ar.json     │
        │   messages/en.json     │
        └────────────────────────┘
```

## تدفق البيانات

```
User clicks language → LanguageSelector
                              ↓
                    router.replace(pathname, {locale})
                              ↓
                      URL updates (/ar/...)
                              ↓
                     Middleware intercepts
                              ↓
                  Validates & routes to [locale]
                              ↓
                   Layout loads messages
                              ↓
                 NextIntlClientProvider wraps
                              ↓
              Components use useTranslations()
                              ↓
                    Display translated text
```

## File Structure Tree

```
client/
│
├── 📁 i18n/
│   ├── 📄 routing.ts          ← تعريف اللغات المدعومة
│   └── 📄 request.ts          ← تحميل ملفات الترجمة
│
├── 📁 messages/
│   ├── 📄 ar.json             ← الترجمة العربية
│   └── 📄 en.json             ← الترجمة الإنجليزية
│
├── 📄 middleware.ts           ← معالجة اللغات في الطلبات
│
├── 📁 app/
│   ├── 📄 layout.tsx          ← Root layout (placeholder)
│   │
│   └── 📁 [locale]/           ← Dynamic locale segment
│       ├── 📄 layout.tsx      ← Locale-aware layout
│       ├── 📄 page.tsx        ← Home page
│       │
│       └── 📁 dashboard/      ← All app routes
│           ├── 📁 users/
│           ├── 📁 products/
│           └── ...
│
└── 📁 components/
    └── 📁 shared/
        └── 📄 LanguageSelector.tsx  ← مكون تبديل اللغة
```

## Component Communication

```
┌─────────────────────────────────────────────────┐
│             LanguageSelector                     │
│  ┌───────────────────────────────────────────┐  │
│  │ useLocale() → gets current locale         │  │
│  │ useRouter() → changes locale              │  │
│  │ usePathname() → preserves current path    │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│            Any Component                         │
│  ┌───────────────────────────────────────────┐  │
│  │ const t = useTranslations('Section')      │  │
│  │ return <h1>{t('key')}</h1>                │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Translation Loading Flow

```
Request comes in
       ↓
middleware.ts checks locale
       ↓
Routes to app/[locale]
       ↓
layout.tsx calls getMessages()
       ↓
i18n/request.ts receives locale
       ↓
Loads messages/${locale}.json
       ↓
Returns messages object
       ↓
NextIntlClientProvider receives messages
       ↓
Components can use useTranslations()
```

## URL Patterns

```
Root redirect:
/  →  /en (default locale)

Explicit locale:
/ar/dashboard  →  Arabic Dashboard
/en/dashboard  →  English Dashboard

Nested routes:
/ar/dashboard/users
/en/dashboard/products
/ar/auth/login
```

## imports Pattern

```
❌ WRONG:
import Link from 'next/link';
import { useRouter } from 'next/navigation';

✅ CORRECT:
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
```

## RTL/LTR Handling

```
Locale: ar
   ↓
dir="rtl" applied to <html>
   ↓
CSS automatically flips:
   - margin-left ← → margin-right
   - padding-left ← → padding-right
   - text-align: left ← → text-align: right
   - flex-direction reverses

Locale: en
   ↓
dir="ltr" applied to <html>
   ↓
Normal CSS behavior
```

## Translation Keys Pattern

```json
{
  "Section": {           ← Category/Page/Feature
    "subsection": {      ← Optional nesting
      "key": "value"     ← Actual translation
    },
    "simpleKey": "value"
  }
}
```

Example usage:
```tsx
const t = useTranslations('Section');
t('subsection.key')  // For nested
t('simpleKey')       // For simple
```

## Best Practices Visualization

```
┌─────────────────────────────────────┐
│     Component Hierarchy              │
│                                      │
│  Layout (provides NextIntlProvider) │
│    ↓                                 │
│  Page (uses translations)           │
│    ↓                                 │
│  Components (use translations)      │
│    ↓                                 │
│  Shared Components (reusable)       │
└─────────────────────────────────────┘

Each level can use:
- useTranslations()
- useLocale()
- Link from @/i18n/routing
- useRouter from @/i18n/routing
```
