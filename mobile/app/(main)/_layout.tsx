import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../src/components/navigation/TabBar';
import { useLanguage } from '../../src/hooks/useLanguage';

export default function MainLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: t('navigation.shop'),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: t('navigation.wishlist'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navigation.profile'),
        }}
      />
      
      {/* Hidden tabs for secondary screens */}
      <Tabs.Screen
        name="cart"
        options={{
          title: t('navigation.cart'),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="category/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
