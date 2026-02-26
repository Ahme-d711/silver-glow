import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import { CheckoutItemCard } from '../components/CheckoutItemCard';
import { useSettings } from '../../settings/hooks/useSettings';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { CheckoutPayload } from '../types/checkout.types';

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

  const [formData, setFormData] = useState<CheckoutPayload>({
    recipientName: '',
    recipientPhone: '',
    shippingAddress: '',
    city: '',
    governorate: '',
    country: 'Egypt',
    postalCode: '',
    customerNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutPayload, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof CheckoutPayload, string>> = {};
    if (!formData.recipientName) newErrors.recipientName = 'Required';
    if (!formData.recipientPhone) newErrors.recipientPhone = 'Required';
    if (!formData.shippingAddress) newErrors.shippingAddress = 'Required';
    if (!formData.city) newErrors.city = 'Required';
    if (!formData.governorate) newErrors.governorate = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validate()) {
      placeOrder(formData);
    }
  };

  const renderInput = (
    label: string, 
    field: keyof CheckoutPayload, 
    icon: string, 
    placeholder: string,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default'
  ) => (
    <Input
      label={label}
      leftIcon={icon as any}
      placeholder={placeholder}
      value={formData[field] as string}
      onChangeText={(text) => {
        setFormData({ ...formData, [field]: text });
        if (errors[field]) setErrors({ ...errors, [field]: undefined });
      }}
      error={errors[field] ? `${errors[field]} is required` : undefined}
      keyboardType={keyboardType}
    />
  );

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
          {/* Section: Order Summary (Products) */}
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

          {/* Section: Shipping Address */}
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="bg-primary/10 p-2 rounded-lg mr-3">
                <Feather name="map-pin" size={20} color="#192C56" />
              </View>
              <Text className="text-xl font-bold text-primary">Shipping Details</Text>
            </View>
            
            {renderInput('Full Name', 'recipientName', 'person-outline', 'Enter recipient name')}
            {renderInput('Phone Number', 'recipientPhone', 'call-outline', 'Enter phone number', 'phone-pad')}
            {renderInput('Address', 'shippingAddress', 'home-outline', 'Street, building, apartment')}
            
            <View className="flex-row gap-4">
              <View className="flex-1">
                {renderInput('City', 'city', 'map-outline', 'City')}
              </View>
              <View className="flex-1">
                {renderInput('Governorate', 'governorate', 'flag-outline', 'Governorate')}
              </View>
            </View>
            
            {renderInput('Notes', 'customerNotes', 'create-outline', 'Any notes for delivery?')}
          </View>
          
          {/* Spacer for floating footer */}
          <View style={{ height: 250 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Price Summary & Action */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8"
        style={{ paddingBottom: 110 }} // Lift above TabBar
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
          onPress={handlePlaceOrder}
          loading={isProcessing}
        />
      </View>
    </View>
  );
};
