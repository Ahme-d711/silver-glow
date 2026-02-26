import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { useOrders } from '../hooks/useOrders';
import { OrderItemCard } from '../components/OrderItemCard';
import { LastOrderSection } from '../components/LastOrderSection';
import { BestSellerSection } from '../../product/components/BestSellerSection';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';
import { LoadingState } from '../../../../components/ui/LoadingState';
import { ErrorState } from '../../../../components/ui/ErrorState';

export const OrdersTemplate = () => {
  const { data: ordersData, isLoading, error, refetch } = useOrders();
  
  const orders = ordersData?.data?.orders || [];
  const lastOrder = orders.length > 0 ? orders[0] : null;

  if (isLoading) {
    return <LoadingState title="My Orders" />;
  }

  if (error) {
    return (
      <ErrorState 
        title="My Orders" 
        message="Failed to load your orders. Please try again later." 
        onRetry={refetch}
      />
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
