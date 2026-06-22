# Silver Glow

## اسم المشروع

**Silver Glow** — منصة تجارة إلكترونية للأزياء والملابس، مع لوحة تحكم إدارية وتطبيق موبايل.

---

## نوع المشروع

**E-commerce** (مع **Admin Dashboard**)

يشمل المتجر الإلكتروني: منتجات، فئات، علامات تجارية، سلة، طلبات، محفظة، قائمة أمنيات، وإعلانات — بالإضافة إلى لوحة تحكم لإدارة المحتوى والمستخدمين والتقارير.

---

## التقنيات المستخدمة

### الواجهة الأمامية (Web — `client/`)

| التقنية | الاستخدام |
|---------|-----------|
| **Next.js 16** | إطار React مع App Router |
| **React 19** | واجهة المستخدم |
| **TypeScript** | الأنواع والسلامة |
| **Tailwind CSS 4** | التنسيق |
| **Radix UI** | مكونات واجهة قابلة للوصول |
| **TanStack Query & Table** | جلب البيانات والجداول |
| **Zustand** | إدارة الحالة |
| **React Hook Form + Zod** | النماذج والتحقق |
| **next-intl** | الترجمة (عربي / إنجليزي) ودعم RTL |
| **Recharts** | الرسوم البيانية في لوحة التحكم |
| **Axios** | طلبات HTTP |

### الخادم (API — `server/`)

| التقنية | الاستخدام |
|---------|-----------|
| **Express 5** | إطار الـ API |
| **Bun** | بيئة التشغيل والتطوير |
| **TypeScript** | الأنواع |
| **MongoDB + Mongoose** | قاعدة البيانات |
| **JWT + bcrypt** | المصادقة وتشفير كلمات المرور |
| **Multer** | رفع الملفات والصور |
| **Swagger** | توثيق الـ API |
| **PM2** | تشغيل الإنتاج |
| **Docker** | الحاويات والنشر |

### تطبيق الموبايل (`mobile/`)

| التقنية | الاستخدام |
|---------|-----------|
| **React Native** | تطبيق iOS و Android |
| **Expo 54 + Expo Router** | التطوير والتنقل |
| **NativeWind** | التنسيق بـ Tailwind |
| **TanStack Query + Zustand** | البيانات والحالة |
| **i18next** | الترجمة |

### البنية التحتية

- **Docker Compose** — MongoDB + Backend + Frontend للتطوير المحلي
- **Vercel** — نشر الـ API في الإنتاج

---

## الروابط

| | الرابط |
|---|--------|
| **Live Demo (الموقع)** | [https://silver-glow.sa/](https://silver-glow.sa/) |
| **API (الإنتاج)** | [https://silver-glow-api-e51h.vercel.app](https://silver-glow-api-e51h.vercel.app) |
| **GitHub** | [https://github.com/Ahme-d711/silver-glow](https://github.com/Ahme-d711/silver-glow) |

---

## هيكل المشروع

```
silver-glow/
├── client/     # واجهة الويب (Next.js)
├── server/     # الـ API (Express + Bun)
├── mobile/     # تطبيق الموبايل (Expo)
└── docker-compose.yml
```
