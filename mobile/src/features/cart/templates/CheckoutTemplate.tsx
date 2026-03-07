import React from 'react';
import { 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '../../../../components/ui/page-header';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import { useSettings } from '../../settings/hooks/useSettings';
import { checkoutSchema, CheckoutFormData } from '../schemas/checkoutSchema';
import { CheckoutItems } from '../components/CheckoutItems';
import { CheckoutShippingForm } from '../components/CheckoutShippingForm';
import { CheckoutSummary } from '../components/CheckoutSummary';
import { useLanguage } from '@/src/hooks/useLanguage';

export const CheckoutTemplate = () => {
  const { data: cartData } = useCart();
  const { mutate: placeOrder, isPending: isProcessing } = useCheckout();
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      recipientName: '',
      recipientPhone: '',
      shippingAddress: '',
      city: '',
      governorate: '',
      country: 'Egypt',
      postalCode: '',
      customerNotes: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    placeOrder(data);
  };

  return (
    <View className="flex-1 bg-background">
      <PageHeader title={t('checkout.title')} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <CheckoutItems items={items} />
          
          <CheckoutShippingForm control={control} errors={errors} />
          
          <View style={{ height: 250 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <CheckoutSummary 
        total={total} 
        isProcessing={isProcessing} 
        onConfirm={handleSubmit(onSubmit)} 
      />
    </View>
  );
};
