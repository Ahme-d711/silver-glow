import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from './page-header';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  backgroundColor?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title, 
  message = "Failed to load data. Please try again.", 
  onRetry,
  backgroundColor = "bg-white"
}) => {
  return (
    <View className={`flex-1 ${backgroundColor}`}>
      {title && <PageHeader title={title} />}
      <View className="flex-1 justify-center items-center px-10">
        <View className="bg-red-50 p-6 rounded-full mb-6">
          <Feather name="alert-circle" size={48} color="#EF4444" />
        </View>
        <Text className="text-xl font-bold text-primary text-center mb-2">Something went wrong</Text>
        <Text className="text-content-tertiary text-center mb-8 leading-5">
          {message}
        </Text>
        {onRetry && (
          <Button 
            title="Try Again" 
            onPress={onRetry} 
            variant="outline"
            className="px-10"
          />
        )}
      </View>
    </View>
  );
};
