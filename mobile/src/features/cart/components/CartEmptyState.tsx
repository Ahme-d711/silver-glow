import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';
import { LinearGradient } from 'expo-linear-gradient';

interface CartEmptyStateProps {
  onExplore: () => void;
}

export const CartEmptyState: React.FC<CartEmptyStateProps> = ({ onExplore }) => {
  return (
    <View className="flex-1 bg-white">
      <PageHeader title="My Cart" />
      
      <View className="flex-1 justify-center items-center px-8 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <View className="absolute -top-[100px] -right-[50px] w-[300px] h-[300px] rounded-full bg-slate-50 z-0" />
        <View className="absolute -bottom-[150px] -left-[100px] w-[400px] h-[400px] rounded-full bg-slate-50 z-0" />
        
        {/* Main Content Container */}
        <View className="items-center z-10">
          {/* Layered Icon Design */}
          <View className="mb-10 items-center justify-center">
             {/* Sub Glow */}
             <View className="absolute w-[250px] h-[250px] rounded-full bg-primary/5" />
             
             {/* Outer Circle */}
             <LinearGradient
                colors={['#F8FAFC', '#F1F5F9']}
                className="w-[180px] h-[180px] rounded-full overflow-hidden justify-center items-center border border-slate-200"
             >
                {/* Inner Circle with Shadow */}
                <View className="w-[130px] h-[130px] rounded-full bg-white justify-center items-center shadow-lg shadow-primary/10 elevation-8 relative">
                  <Feather name="shopping-bag" size={64} color="#192C56" />
                </View>
             </LinearGradient>
          </View>

          {/* Text Content */}
          <Text className="text-3xl font-bold text-primary text-center mb-3">
            Your Cart is Empty
          </Text>
          <Text className="text-content-tertiary text-center px-6 leading-6 text-base">
            It seems you haven't discovered your next favorite piece yet. Let's find something special for you.
          </Text>

          {/* Action Button */}
          <View className="mt-12 w-full px-4">
            <Button 
              title="Discover Collection"
              onPress={onExplore}
              className="h-16 rounded-2xl shadow-lg shadow-blue-900/20"
              textClassName="text-lg font-bold"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
