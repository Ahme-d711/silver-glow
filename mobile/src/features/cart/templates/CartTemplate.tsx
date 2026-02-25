import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCart, useClearCart } from '../hooks/useCart';
import { CartItemCard } from '../components/CartItemCard';
import { PageHeader } from '../../../../components/ui/page-header';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export const CartTemplate = () => {
  const { user } = useAuthStore();
  const { openAuthModal, openConfirmModal } = useModalStore();
  const { data: cartData, isLoading } = useCart();
  const { mutate: clearCart } = useClearCart();

  const cart = cartData?.data?.cart;
  const items = cart?.items || [];

  const subtotal = items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const shipping = items.length > 0 ? 10 : 0; // Flat shipping for demo
  const total = subtotal + shipping;

  const handleClearCart = () => {
    openConfirmModal({
      title: "Clear Cart",
      message: "Are you sure you want to remove all items from your cart?",
      type: 'danger',
      label: 'Clear All',
      onConfirm: () => clearCart()
    });
  };

  if (!user) {
    return (
      <View className="flex-1 bg-background">
        <PageHeader title="My Cart" />
        <View className="flex-1 justify-center items-center px-10">
          <View className="bg-primary/10 p-8 rounded-full mb-6">
            <Feather name="shopping-bag" size={60} color="#192C56" />
          </View>
          <Text className="text-2xl font-bold text-primary text-center">Your cart is waiting</Text>
          <Text className="text-content-tertiary text-center mt-3 text-lg">
            Login to see your items and start shopping our premium collection.
          </Text>
          <TouchableOpacity 
            onPress={openAuthModal}
            className="bg-primary px-10 py-4 rounded-2xl mt-8 shadow-lg shadow-primary/30"
          >
            <Text className="text-white font-bold text-lg">Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-background">
        <PageHeader title="My Cart" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#192C56" />
        </View>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <PageHeader title="My Cart" />
        <View className="flex-1 justify-center items-center px-10">
          <View className="bg-gray-100 p-8 rounded-full mb-6">
            <Feather name="shopping-cart" size={60} color="#CBD5E1" />
          </View>
          <Text className="text-2xl font-bold text-primary text-center">Your cart is empty</Text>
          <Text className="text-content-tertiary text-center mt-3 text-lg">
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity 
            className="bg-primary px-10 py-4 rounded-2xl mt-8 shadow-lg shadow-primary/30"
          >
            <Text className="text-white font-bold text-lg">Explore Shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <PageHeader 
        title="My Cart" 
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
        
        {/* Spacer for floating footer */}
        <View className="h-80" />
      </ScrollView>

      {/* Floating Price Summary */}
      <View className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8">
        <View className="gap-4 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-content-secondary text-lg">Subtotal</Text>
            <Text className="text-primary font-bold text-lg">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-content-secondary text-lg">Shipping</Text>
            <Text className="text-primary font-bold text-lg">${shipping.toFixed(2)}</Text>
          </View>
          <View className="h-[1px] bg-divider my-1" />
          <View className="flex-row justify-between">
            <Text className="text-primary font-bold text-2xl">Total</Text>
            <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/(main)/checkout')}
        >
          <LinearGradient
            colors={['#192C56', '#2A457D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-[70px] rounded-3xl items-center justify-center flex-row shadow-xl shadow-primary/40"
          >
            <Text className="text-white font-bold text-xl mr-3">Checkout Now</Text>
            <Feather name="arrow-right" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
