import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  
  const iconMap: Record<string, React.ComponentProps<typeof Feather>['name']> = {
    index: 'home',
    shop: 'shopping-bag',
    wishlist: 'heart',
    profile: 'user',
    cart: 'shopping-cart',
  };

  return (
    <View style={styles.container}>
      <View 
        style={{ paddingBottom: Math.max(insets.bottom, 15) }}
        className="flex-row items-center justify-around bg-white py-3 px-4 rounded-t-[40px] shadow-lg"
      >
        {state.routes.filter(route => {
          const { options } = descriptors[route.key];
          return (options as any).href !== null && route.name !== 'orders';
        }).map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = iconMap[route.name] || 'help-circle';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="items-center justify-center"
              activeOpacity={0.7}
            >
              <View 
                className={`w-20 h-14 items-center justify-center rounded-full ${
                  isFocused ? 'bg-[#F1F5F9]' : 'bg-transparent'
                }`}
              >
                <Feather 
                  name={iconName} 
                  size={24} 
                  color={isFocused ? '#192C56' : '#94A3B8'} 
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
