import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import { CheckoutItemCard } from '../components/CheckoutItemCard';
import { useSettings } from '../../settings/hooks/useSettings';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { checkoutSchema, CheckoutFormData } from '../schemas/checkoutSchema';

export const CheckoutTemplate = () => {
  const { data: cartData } = useCart();
  const { mutate: placeOrder, isPending: isProcessing } = useCheckout();
  const { data: settingsData } = useSettings();
  
  const cart = cartData?.data?.cart;
  const items = cart?.items || [];
  const settings = settingsData?.data?.settings;
  
  const subtotal = items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  
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
      <PageHeader title="Checkout" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Section: Your Items */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View className="bg-primary/10 p-2 rounded-lg mr-3">
                <Feather name="shopping-bag" size={20} color="#192C56" />
              </View>
              <Text className="text-xl font-bold text-primary">Your Items</Text>
            </View>
            {items.map((item) => (
              <CheckoutItemCard key={`${item.productId._id}-${item.size}`} item={item} />
            ))}
          </View>

          {/* Section: Shipping Details */}
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="bg-primary/10 p-2 rounded-lg mr-3">
                <Feather name="map-pin" size={20} color="#192C56" />
              </View>
              <Text className="text-xl font-bold text-primary">Shipping Details</Text>
            </View>
            
            <Controller
              control={control}
              name="recipientName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  leftIcon="person-outline"
                  placeholder="Enter recipient name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.recipientName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="recipientPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Phone Number"
                  leftIcon="call-outline"
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.recipientPhone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="shippingAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Address"
                  leftIcon="home-outline"
                  placeholder="Street, building, apartment"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.shippingAddress?.message}
                />
              )}
            />
            
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="City"
                      leftIcon="map-outline"
                      placeholder="City"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.city?.message}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  name="governorate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Governorate"
                      leftIcon="flag-outline"
                      placeholder="Governorate"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.governorate?.message}
                    />
                  )}
                />
              </View>
            </View>
            
            <Controller
              control={control}
              name="customerNotes"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Notes"
                  leftIcon="create-outline"
                  placeholder="Any notes for delivery?"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.customerNotes?.message}
                />
              )}
            />
          </View>
          
          <View style={{ height: 250 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View 
        className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8"
        style={{ paddingBottom: 110 }} 
      >
        <View className="gap-3 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-content-secondary text-base">Total Amount</Text>
            <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
          </View>
        </View>

        <Button
          title="Confirm Order"
          rightIcon="checkmark-outline"
          onPress={() => handleSubmit(onSubmit)()}
          loading={isProcessing}
        />
      </View>
    </View>
  );
};
