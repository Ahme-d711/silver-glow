import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PageHeader } from './page-header';

interface LoadingStateProps {
  title?: string;
  backgroundColor?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  title, 
  backgroundColor = 'bg-white' 
}) => {
  return (
    <View className={`flex-1 ${backgroundColor}`}>
      {title && <PageHeader title={title} />}
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#192C56" />
      </View>
    </View>
  );
};
