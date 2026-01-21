// مثال على استخدام الترجمة في Components

"use client"

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * مثال 1: استخدام الترجمة في مكون بسيط
 */
export function SimpleTranslationExample() {
  const t = useTranslations('Common');
  
  return (
    <div>
      <button>{t('save')}</button>
      <button>{t('cancel')}</button>
      <button>{t('delete')}</button>
    </div>
  );
}

/**
 * مثال 2: استخدام الترجمة مع أقسام مختلفة
 */
export function MultiSectionExample() {
  const tCommon = useTranslations('Common');
  const tAuth = useTranslations('Auth');
  const tNav = useTranslations('Navigation');
  
  return (
    <div>
      <h1>{tAuth('welcome_back')}</h1>
      <nav>
        <Link href="/">{tNav('home')}</Link>
        <Link href="/dashboard">{tNav('dashboard')}</Link>
      </nav>
      <button>{tCommon('submit')}</button>
    </div>
  );
}

/**
 * مثال 3: استخدام الترجمة في Form
 */
export function FormTranslationExample() {
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');
  
  return (
    <form>
      <div>
        <label>{t('name')}</label>
        <input 
          type="text" 
          placeholder={t('name_placeholder')} 
        />
      </div>
      
      <div>
        <label>{t('email')}</label>
        <input 
          type="email" 
          placeholder={t('email_placeholder')} 
        />
      </div>
      
      <div>
        <label>{t('password')}</label>
        <input 
          type="password" 
          placeholder={t('password_placeholder')} 
        />
      </div>
      
      <button type="submit">
        {tCommon('submit')}
      </button>
      <button type="button">
        {tCommon('cancel')}
      </button>
    </form>
  );
}

/**
 * مثال 4: استخدام الترجمة في Table Headers
 */
export function TableTranslationExample() {
  const t = useTranslations('Users');
  const tCommon = useTranslations('Common');
  
  return (
    <table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('phone')}</th>
          <th>{t('role')}</th>
          <th>{t('status')}</th>
          <th>{tCommon('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {/* Data rows here */}
      </tbody>
    </table>
  );
}

/**
 * مثال 5: استخدام الترجمة في Dashboard
 */
export function DashboardTranslationExample() {
  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/users">
          <div className="card">
            <h3>{t('users')}</h3>
            <p>{t('statistics')}</p>
          </div>
        </Link>
        
        <Link href="/dashboard/products">
          <div className="card">
            <h3>{t('products')}</h3>
            <p>{t('statistics')}</p>
          </div>
        </Link>
        
        <Link href="/dashboard/orders">
          <div className="card">
            <h3>{t('orders')}</h3>
            <p>{t('statistics')}</p>
          </div>
        </Link>
      </div>
      
      <button>{tCommon('view')}</button>
    </div>
  );
}
