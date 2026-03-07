import React from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCart, useClearCart } from '../hooks/useCart';
import { CartItemCard } from '../components/CartItemCard';
import { PageHeader } from '../../../../components/ui/page-header';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { router } from 'expo-router';
import { CartGuestState } from '../components/CartGuestState';
import { CartEmptyState } from '../components/CartEmptyState';
import { CartSummaryFooter } from '../components/CartSummaryFooter';

import { useSettings } from '../../settings/hooks/useSettings';
import { LoadingState } from '../../../../components/ui/LoadingState';
import { useLanguage } from '@/src/hooks/useLanguage';

export const CartTemplate = () => {
  const { user } = useAuthStore();
  const { openAuthModal, openConfirmModal } = useModalStore();
  const { data: cartData, isLoading } = useCart();
  const { mutate: clearCart } = useClearCart();
  const { data: settingsData } = useSettings();
  const { t } = useLanguage();

  const cart = cartData?.data?.cart;
  const items = cart?.items || [];
  const settings = settingsData?.data;

  const subtotal = items.reduce((acc, item) => {
    const productId = item.productId;
    const size = item.size;
    let unitPrice = productId.price;
    
    if (size && productId.sizes) {
      const sizeData = productId.sizes.find(s => s.size === size);
      if (sizeData) unitPrice = sizeData.price;
    }
    
    return acc + (unitPrice * item.quantity);
  }, 0);
  
  // Calculate dynamic shipping cost
  const baseShipping = settings?.shippingCost ?? 10;
  const freeThreshold = settings?.freeShippingThreshold ?? 1000;
  
  const shipping = items.length === 0 || subtotal >= freeThreshold ? 0 : baseShipping;
  const total = subtotal + shipping;

  const handleClearCart = () => {
    openConfirmModal({
      title: t('cart.clear_confirm_title'),
      message: t('cart.clear_confirm_message'),
      type: 'danger',
      label: t('cart.clear_all'),
      onConfirm: () => clearCart()
    });
  };

  const handleCheckout = () => {
    router.push('/(main)/checkout');
  };

  if (!user) {
    return <CartGuestState onLogin={openAuthModal} />;
  }

  if (isLoading) {
    return <LoadingState title={t('cart.title')} />;
  }

  if (items.length === 0) {
    return <CartEmptyState onExplore={() => router.push('/(main)/shop')} />;
  }

  return (
    <View className="flex-1 bg-background">
      <PageHeader 
        title={t('cart.title')} 
        rightElement={
          <TouchableOpacity onPress={handleClearCart}>
            <Feather name="trash-2" size={24} color="#EF4444" />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <CartItemCard key={`${item.productId._id}-${item.size}`} item={item} />
        ))}
        
        {/* Spacer for floating footer to allow scrolling past it */}
        <View style={{ height: 360 }} />
      </ScrollView>

      <CartSummaryFooter 
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onCheckout={handleCheckout}
      />
    </View>
  );
};
