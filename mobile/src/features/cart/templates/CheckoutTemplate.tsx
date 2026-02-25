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
import { LinearGradient } from 'expo-linear-gradient';
import { CheckoutPayload } from '../types/checkout.types';

export const CheckoutTemplate = () => {
  const { data: cartData } = useCart();
  const { mutate: placeOrder, isPending: isProcessing } = useCheckout();
  
  const cart = cartData?.data?.cart;
  const items = cart?.items || [];
  
  const subtotal = items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const shipping = items.length > 0 ? 10 : 0;
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
    <View className="mb-4">
      <Text className="text-primary font-bold mb-2 ml-1">{label}</Text>
      <View className={`bg-gray-50 rounded-2xl flex-row items-center px-4 py-3 border ${errors[field] ? 'border-red-400' : 'border-divider'}`}>
        <Feather name={icon as any} size={20} color="#64748B" />
        <TextInput
          className="flex-1 ml-3 text-primary font-medium"
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={formData[field] as string}
          onChangeText={(text) => {
            setFormData({ ...formData, [field]: text });
            if (errors[field]) setErrors({ ...errors, [field]: undefined });
          }}
          keyboardType={keyboardType}
        />
      </View>
      {errors[field] && (
        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors[field]} is required</Text>
      )}
    </View>
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
          <View className="mb-24">
            <View className="flex-row items-center mb-4">
              <View className="bg-primary/10 p-2 rounded-lg mr-3">
                <Feather name="map-pin" size={20} color="#192C56" />
              </View>
              <Text className="text-xl font-bold text-primary">Shipping Details</Text>
            </View>
            
            {renderInput('Full Name', 'recipientName', 'user', 'Enter recipient name')}
            {renderInput('Phone Number', 'recipientPhone', 'phone', 'Enter phone number', 'phone-pad')}
            {renderInput('Address', 'shippingAddress', 'home', 'Street, building, apartment')}
            
            <View className="flex-row gap-4">
              <View className="flex-1">
                {renderInput('City', 'city', 'map', 'City')}
              </View>
              <View className="flex-1">
                {renderInput('Governorate', 'governorate', 'flag', 'Governorate')}
              </View>
            </View>
            
            {renderInput('Notes', 'customerNotes', 'edit-3', 'Any notes for delivery?')}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Price Summary & Action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8">
        <View className="gap-3 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-content-secondary text-base">Total Amount</Text>
            <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
        >
          <LinearGradient
            colors={['#192C56', '#2A457D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-[70px] rounded-3xl items-center justify-center flex-row shadow-xl shadow-primary/40"
          >
            {isProcessing ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-xl mr-3">Confirm Order</Text>
                <Feather name="check" size={24} color="white" />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
