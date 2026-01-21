# قائمة المهام - تحويل التطبيق للترجمة

## المرحلة 1: الإعداد الأولي ✅
- [x] تثبيت next-intl
- [x] إنشاء ملفات الإعدادات
- [x] إنشاء ملفات الترجمة
- [x] إعداد middleware
- [x] تحديث next.config.ts
- [x] إنشاء LanguageSelector component

## المرحلة 2: تحديث الـ Layout و Navigation 🔄
- [ ] إضافة LanguageSelector إلى Navbar الرئيسي
- [ ] تحديث Sidebar لاستخدام الترجمة
- [ ] تحديث Footer لاستخدام الترجمة
- [ ] اختبار التنقل بين الصفحات بكلا اللغتين

## المرحلة 3: تحويل صفحات Auth 🔄
- [ ] تحويل `/login` page
- [ ] تحويل `/register` page
- [ ] تحويل `/verify` page
- [ ] تحويل `/forgot-password` page
- [ ] تحويل Auth Forms
- [ ] اختبار Auth flow بكلا اللغتين

## المرحلة 4: تحويل Dashboard 🔄
- [ ] تحويل Dashboard Overview page
- [ ] تحديث Dashboard sidebar
- [ ] تحديث Dashboard header
- [ ] تحديث Statistics cards
- [ ] اختبار Dashboard بكلا اللغتين

## المرحلة 5: تحويل صفحات Users 🔄
- [ ] تحويل Users List page
- [ ] تحويل Add User page
- [ ] تحويل Edit User page
- [ ] تحويل User Details page
- [ ] تحويل UserForm component
- [ ] تحويل UsersTable component
- [ ] إضافة ترجمات User-related في messages
- [ ] اختبار Users section بكلا اللغتين

## المرحلة 6: تحويل صفحات Products 🔄
- [ ] تحويل Products List page
- [ ] تحويل Add Product page
- [ ] تحويل Edit Product page
- [ ] تحويل Product Details page
- [ ] تحويل ProductForm component
- [ ] تحويل ProductsTable component
- [ ] إضافة ترجمات Product-related في messages
- [ ] اختبار Products section بكلا اللغتين

## المرحلة 7: تحويل صفحات Categories 🔄
- [ ] تحويل Categories List page
- [ ] تحويل Add Category page
- [ ] تحويل Edit Category page
- [ ] تحويل CategoryForm component
- [ ] إضافة ترجمات Category-related في messages
- [ ] اختبار Categories section بكلا اللغتين

## المرحلة 8: تحويل صفحات Brands 🔄
- [ ] تحويل Brands List page
- [ ] تحويل Add Brand page
- [ ] تحويل Edit Brand page
- [ ] تحويل BrandForm component
- [ ] إضافة ترجمات Brand-related في messages
- [ ] اختبار Brands section بكلا اللغتين

## المرحلة 9: تحويل صفحات Orders 🔄
- [ ] تحويل Orders List page
- [ ] تحويل Order Details page
- [ ] تحويل OrdersTable component
- [ ] إضافة ترجمات Order-related في messages
- [ ] اختبار Orders section بكلا اللغتين

## المرحلة 10: تحويل صفحات Advertisements 🔄
- [ ] تحويل Ads List page
- [ ] تحويل Add Ad page
- [ ] تحويل Edit Ad page
- [ ] تحويل AdForm component
- [ ] إضافة ترجمات Ad-related في messages
- [ ] اختبار Ads section بكلا اللغتين

## المرحلة 11: تحويل صفحات Support 🔄
- [ ] تحويل Support page
- [ ] تحويل Support requests list
- [ ] تحويل Support details page
- [ ] إضافة ترجمات Support-related في messages
- [ ] اختبار Support section بكلا اللغتين

## المرحلة 12: تحويل المكونات المشتركة 🔄
- [ ] تحويل Button components
- [ ] تحويل Dialog components
- [ ] تحويل Toast notifications
- [ ] تحويل Loading states
- [ ] تحويل Error messages
- [ ] تحويل Success messages
- [ ] اختبار جميع المكونات المشتركة

## المرحلة 13: تحديث الـ API Responses 🔄
- [ ] تحديث Error messages
- [ ] تحديث Success messages
- [ ] تحديث Validation messages
- [ ] اختبار جميع API responses

## المرحلة 14: إضافة ترجمات إضافية 🔄
- [ ] إضافة ترجمات Validation errors
- [ ] إضافة ترجمات Toast messages
- [ ] إضافة ترجمات Dialog messages
- [ ] إضافة ترجمات Tooltips
- [ ] إضافة ترجمات Placeholders

## المرحلة 15: الاختبار النهائي 🔄
- [ ] اختبار جميع الصفحات بالعربية
- [ ] اختبار جميع الصفحات بالإنجليزية
- [ ] اختبار RTL في كل الصفحات
- [ ] اختبار التنقل بين اللغات
- [ ] اختبار Forms في كلا اللغتين
- [ ] اختبار API calls في كلا اللغتين
- [ ] اختبار Error handling
- [ ] اختبار على أجهزة مختلفة

## المرحلة 16: التحسينات والتنظيف 🔄
- [ ] مراجعة وتنظيف ملفات الترجمة
- [ ] التأكد من عدم وجود نصوص ثابتة متبقية
- [ ] تحسين الأداء
- [ ] إضافة ترجمات ناقصة
- [ ] مراجعة جودة الترجمة

## نصائح للعمل

1. **ابدأ من الأعلى للأسفل**: Layout → Pages → Components
2. **اختبر بعد كل مرحلة**: لا تنتقل للمرحلة التالية قبل اختبار الحالية
3. **استخدم Git**: قم بعمل commit بعد كل مرحلة
4. **راجع الأمثلة**: استخدم `examples/i18n-usage-examples.tsx` للمساعدة
5. **راجع الأدلة**: `I18N_GUIDE.md` و `MIGRATION_GUIDE.md` هما أصدقاؤك

## مثال على workflow يومي

1. اختر صفحة/مكون للتحويل
2. افتح `MIGRATION_GUIDE.md` للمراجعة
3. حوّل الملف
4. أضف الترجمات في `messages/ar.json` و `messages/en.json`
5. اختبر في كلا اللغتين
6. ضع علامة ✅ على المهمة
7. قم بعمل commit
8. انتقل للمهمة التالية

---

**تحديث أخير**: {{ تاريخ آخر تحديث }}
**التقدم الكلي**: 6/200+ مهمة (المرحلة 1 مكتملة)
