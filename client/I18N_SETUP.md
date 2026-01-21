# إعداد نظام الترجمة - Silver Glow

تم إعداد نظام ترجمة كامل ومتقدم للتطبيق يدعم اللغتين العربية والإنجليزية بنفس البنية المستخدمة في مشروع Whale Tanks.

## ✅ ما تم إنجازه

### 1. البنية التحتية
- ✅ تثبيت `next-intl` library
- ✅ إنشاء مجلد `i18n/` مع ملفات الإعدادات
- ✅ إنشاء مجلد `messages/` مع ملفات الترجمة
- ✅ إعداد `middleware.ts` لمعالجة اللغات
- ✅ تحديث `next.config.ts` لدعم next-intl

### 2. الملفات المُنشأة

#### ملفات الإعدادات
- `i18n/routing.ts` - إعدادات التوجيه واللغات المدعومة
- `i18n/request.ts` - تحميل ملفات الترجمة
- `middleware.ts` - Middleware لمعالجة اللغات والتوجيه

#### ملفات الترجمة
- `messages/ar.json` - الترجمة العربية الكاملة
- `messages/en.json` - الترجمة الإنجليزية الكاملة

تحتوي ملفات الترجمة على:
- Brand (اسم العلامة التجارية)
- Navigation (روابط التنقل)
- Auth (صفحات المصادقة)
- Dashboard (لوحة التحكم)
- Common (الكلمات الشائعة)
- Users (إدارة المستخدمين)
- Products (إدارة المنتجات)

#### المكونات
- `components/shared/LanguageSelector.tsx` - مكون تبديل اللغة

#### البنية الجديدة
- `app/[locale]/layout.tsx` - Layout يدعم اللغات و RTL
- `app/[locale]/page.tsx` - صفحة رئيسية نموذجية
- نقل `dashboard` إلى داخل `[locale]`

### 3. الوثائق
- ✅ `I18N_GUIDE.md` - دليل شامل لاستخدام نظام الترجمة
- ✅ `MIGRATION_GUIDE.md` - دليل ترحيل الملفات الموجودة
- ✅ `examples/i18n-usage-examples.tsx` - أمثلة عملية

## 🎯 المميزات

1. **دعم كامل للغتين**
   - العربية (ar)
   - الإنجليزية (en)

2. **دعم RTL تلقائي**
   - يتم تطبيق `dir="rtl"` تلقائياً للعربية
   - يتم تطبيق `dir="ltr"` تلقائياً للإنجليزية

3. **SEO Friendly**
   - روابط واضحة: `/ar/dashboard` و `/en/dashboard`
   - Meta tags تدعم اللغات

4. **Type Safety**
   - دعم كامل لـ TypeScript
   - Auto-completion للترجمات

5. **مكون تبديل اللغة**
   - UI جميل وسهل الاستخدام
   - يمكن إضافته في أي مكان

## 📝 كيفية الاستخدام

### استخدام بسيط
```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Navigation');
  return <h1>{t('home')}</h1>;
}
```

### الروابط
```tsx
import { Link } from '@/i18n/routing';

<Link href="/dashboard">Dashboard</Link>
```

### التنقل
```tsx
import { useRouter } from '@/i18n/routing';

const router = useRouter();
router.push('/dashboard');
```

## 🔧 ما يجب فعله الآن

### 1. إضافة LanguageSelector إلى Navbar
قم بإضافة المكون في navbar الخاص بك:

```tsx
import LanguageSelector from '@/components/shared/LanguageSelector';

export default function Navbar() {
  return (
    <nav>
      {/* محتوى navbar */}
      <LanguageSelector />
    </nav>
  );
}
```

### 2. تحويل الصفحات الموجودة
استخدم `MIGRATION_GUIDE.md` لتحويل الصفحات الموجودة

### 3. إضافة ترجمات جديدة
عند إضافة صفحات أو مكونات جديدة، أضف الترجمات في:
- `/messages/ar.json`
- `/messages/en.json`

## 📂 البنية النهائية

```
client/
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── ar.json
│   └── en.json
├── middleware.ts
├── app/
│   ├── layout.tsx (root - placeholder)
│   └── [locale]/
│       ├── layout.tsx (locale-aware)
│       ├── page.tsx
│       └── dashboard/
│           └── ...
├── components/
│   └── shared/
│       └── LanguageSelector.tsx
├── examples/
│   └── i18n-usage-examples.tsx
├── I18N_GUIDE.md
└── MIGRATION_GUIDE.md
```

## 🚀 اختبار النظام

التطبيق يعمل الآن على:
- http://localhost:3000

جرب الروابط التالية:
- http://localhost:3000/en - النسخة الإنجليزية
- http://localhost:3000/ar - النسخة العربية

## 📚 الموارد

- `I18N_GUIDE.md` - للاستخدام اليومي
- `MIGRATION_GUIDE.md` - لتحويل الملفات الموجودة
- `examples/i18n-usage-examples.tsx` - أمثلة عملية

## ⚠️ ملاحظات مهمة

1. **استخدم دائماً** `Link` و `useRouter` من `@/i18n/routing`
2. **لا تستخدم** `next/link` أو `next/navigation` مباشرة
3. **أضف الترجمات** في كلا الملفين (ar.json و en.json)
4. **اختبر** في كلا اللغتين

## 🎨 التخصيص

يمكنك تخصيص:
- إضافة لغات جديدة في `i18n/routing.ts`
- تعديل اللغة الافتراضية
- تخصيص UI مكون LanguageSelector

## 🐛 المشاكل المحتملة

إذا واجهت مشاكل:
1. تأكد من أن الترجمة موجودة في كلا الملفين
2. تحقق من مسارات الـ imports
3. تأكد من استخدام `"use client"` للـ client components
4. راجع `I18N_GUIDE.md` للحلول

---

تم الإعداد بنجاح! ✨
