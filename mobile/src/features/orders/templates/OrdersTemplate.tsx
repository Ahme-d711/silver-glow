import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';
import { useOrders } from '../hooks/useOrders';
import { OrderItemCard } from '../components/OrderItemCard';
import { LastOrderSection } from '../components/LastOrderSection';
import { BestSellerSection } from '../../product/components/BestSellerSection';

export const OrdersTemplate = () => {
  const { data: ordersData, isLoading, error } = useOrders();
  
  const orders = ordersData?.data?.orders || [];
  const lastOrder = orders.length > 0 ? orders[0] : null;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#192C56" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-500 font-bold text-center">Failed to load your orders. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <PageHeader title="My Orders" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-6 pt-4">
          {/* Last Order Section */}
          {lastOrder && <LastOrderSection order={lastOrder} />}

          {/* Last Orders List */}
          <View className="mt-4">
            <Text className="text-xl font-bold text-primary mb-4">Last Orders</Text>
            {orders.length > 0 ? (
              orders.map((order) => 
                order.items.map((item, index) => (
                  <OrderItemCard 
                    key={`${order._id}-${item.productId?._id || item.productId}-${index}`} 
                    item={item} 
                    status={order.status} 
                    note={order.customerNotes}
                    date={order.createdAt}
                  />
                ))
              )
            ) : (
              <View className="py-10 items-center">
                <Text className="text-content-tertiary">You don't have any orders yet.</Text>
              </View>
            )}
          </View>
        </View>

        {/* Best Seller Section */}
        <BestSellerSection />
      </ScrollView>

      {/* Floating Shop Now Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <Button 
          title="Shop Now"
          leftIcon="cart-outline"
          onPress={() => router.push('/(main)')}
        />
      </View>
    </View>
  );
};
