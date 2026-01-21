# دليل الترحيل إلى نظام الترجمة

هذا الدليل يساعدك في تحويل الملفات الموجودة لاستخدام نظام الترجمة.

## الخطوات الأساسية

### 1. تحديث الـ Imports

#### قبل:
```tsx
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
```

#### بعد:
```tsx
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
```

### 2. استبدال النصوص الثابتة

#### قبل:
```tsx
export default function LoginPage() {
  return (
    <div>
      <h1>تسجيل الدخول</h1>
      <form>
        <input placeholder="البريد الإلكتروني" />
        <input placeholder="كلمة المرور" />
        <button>دخول</button>
      </form>
    </div>
  );
}
```

#### بعد:
```tsx
"use client"

import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');

  return (
    <div>
      <h1>{t('login')}</h1>
      <form>
        <input placeholder={t('email_placeholder')} />
        <input placeholder={t('password_placeholder')} />
        <button>{tCommon('submit')}</button>
      </form>
    </div>
  );
}
```

### 3. تحديث الروابط

#### قبل:
```tsx
<Link href="/dashboard">
  Dashboard
</Link>
```

#### بعد:
```tsx
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// في المكون:
const t = useTranslations('Navigation');

<Link href="/dashboard">
  {t('dashboard')}
</Link>
```

### 4. تحديث Navigation

#### قبل:
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/dashboard');
```

#### بعد:
```tsx
import { useRouter } from '@/i18n/routing';

const router = useRouter();
router.push('/dashboard'); // سيتم إضافة اللغة تلقائياً
```

## أمثلة عملية

### مثال 1: تحويل صفحة Dashboard

#### قبل:
```tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>لوحة التحكم</h1>
      <div>
        <Link href="/users">المستخدمين</Link>
        <Link href="/products">المنتجات</Link>
        <Link href="/orders">الطلبات</Link>
      </div>
    </div>
  );
}
```

#### بعد:
```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div>
      <h1>{t('overview')}</h1>
      <div>
        <Link href="/users">{t('users')}</Link>
        <Link href="/products">{t('products')}</Link>
        <Link href="/orders">{t('orders')}</Link>
      </div>
    </div>
  );
}
```

### مثال 2: تحويل Form Component

#### قبل:
```tsx
export function UserForm() {
  return (
    <form>
      <label>الاسم</label>
      <input placeholder="أدخل اسمك" />
      
      <label>البريد الإلكتروني</label>
      <input placeholder="أدخل بريدك الإلكتروني" />
      
      <button>حفظ</button>
      <button>إلغاء</button>
    </form>
  );
}
```

#### بعد:
```tsx
"use client"

import { useTranslations } from 'next-intl';

export function UserForm() {
  const t = useTranslations('Users');
  const tCommon = useTranslations('Common');

  return (
    <form>
      <label>{t('name')}</label>
      <input placeholder={t('name')} />
      
      <label>{t('email')}</label>
      <input placeholder={t('email')} />
      
      <button>{tCommon('save')}</button>
      <button>{tCommon('cancel')}</button>
    </form>
  );
}
```

### مثال 3: تحويل Table Component

#### قبل:
```tsx
export function UsersTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>الاسم</th>
          <th>البريد الإلكتروني</th>
          <th>الدور</th>
          <th>الحالة</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>
              <button>تعديل</button>
              <button>حذف</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

#### بعد:
```tsx
"use client"

import { useTranslations } from 'next-intl';

export function UsersTable({ users }) {
  const t = useTranslations('Users');
  const tCommon = useTranslations('Common');

  return (
    <table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('role')}</th>
          <th>{t('status')}</th>
          <th>{tCommon('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>
              <button>{tCommon('edit')}</button>
              <button>{tCommon('delete')}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## ملاحظات مهمة

### Server vs Client Components

- **Server Components**: لا تحتاج `"use client"` directive
- **Client Components**: يجب إضافة `"use client"` في بداية الملف

### إضافة ترجمات جديدة

عند إضافة نصوص جديدة:

1. أضفها في `/messages/ar.json`:
```json
{
  "MySection": {
    "myKey": "النص بالعربية"
  }
}
```

2. أضفها في `/messages/en.json`:
```json
{
  "MySection": {
    "myKey": "Text in English"
  }
}
```

3. استخدمها:
```tsx
const t = useTranslations('MySection');
console.log(t('myKey'));
```

## Checklist للترحيل

- [ ] استبدل `next/link` بـ `@/i18n/routing`
- [ ] استبدل `next/navigation` router بـ `@/i18n/routing`
- [ ] استبدل النصوص الثابتة بـ `useTranslations`
- [ ] أضف الترجمات في ملفات JSON
- [ ] اختبر في كلا اللغتين
- [ ] تأكد من RTL في العربية
- [ ] تأكد من عمل الروابط بشكل صحيح

## مثال كامل لملف مُحول

```tsx
"use client"

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';

export default function CompleteExample() {
  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    setLoading(true);
    // Do something
    router.push('/success');
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{t('welcome')}</h1>
      
      <nav>
        <Link href="/users">{t('users')}</Link>
        <Link href="/products">{t('products')}</Link>
      </nav>

      <button onClick={handleAction} disabled={loading}>
        {loading ? tCommon('loading') : tCommon('submit')}
      </button>
    </div>
  );
}
```

## الخطوات التالية

1. ابدأ بتحويل الصفحات الرئيسية
2. ثم انتقل إلى Components المشتركة
3. أخيراً، حوّل الصفحات الفرعية
4. اختبر كل صفحة بعد التحويل
