import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface CartEmptyStateProps {
  onExplore: () => void;
}

export const CartEmptyState: React.FC<CartEmptyStateProps> = ({ onExplore }) => {
  return (
    <View className="flex-1 bg-white">
      <PageHeader title="My Cart" />
      
      <View className="flex-1 justify-center items-center px-8 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        
        {/* Main Content Container */}
        <View className="items-center z-10">
          {/* Layered Icon Design */}
          <View className="mb-10 items-center justify-center">
             {/* Sub Glow */}
             <View style={styles.glow} />
             
             {/* Outer Circle */}
             <LinearGradient
                colors={['#F8FAFC', '#F1F5F9']}
                style={styles.outerCircle}
             >
                {/* Inner Circle with Shadow */}
                <View style={styles.innerCircle}>
                  <Feather name="shopping-bag" size={64} color="#192C56" />
                  
                  {/* Floating Small Icons for detail */}
                  <View style={styles.miniIcon1}>
                    <Ionicons name="sparkles" size={16} color="#D4AF37" />
                  </View>
                  <View style={styles.miniIcon2}>
                    <Feather name="plus" size={12} color="#192C56" />
                  </View>
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

const styles = StyleSheet.create({
  outerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  innerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#192C56",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(25, 44, 86, 0.03)',
  },
  miniIcon1: {
    position: 'absolute',
    top: -5,
    right: 15,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  miniIcon2: {
    position: 'absolute',
    bottom: 20,
    left: -5,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  decorCircle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#F8FAFC',
    zIndex: 0,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#F8FAFC',
    zIndex: 0,
  }
});
