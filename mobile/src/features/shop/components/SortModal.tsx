import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SortOption {
  label: string;
  value: string;
}

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
  options: SortOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onClose,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={onClose}
        className="flex-1 justify-center bg-black/40 px-6"
      >
        <View className="bg-white rounded-3xl p-6">
          <Text className="text-xl font-bold text-content-primary mb-6">Sort By</Text>
          {options.map((option) => (
            <TouchableOpacity 
              key={option.value}
              onPress={() => onSelect(option.value)}
              className="flex-row items-center justify-between py-4 border-b border-divider/30 last:border-0"
            >
              <Text className={`text-lg ${selectedValue === option.value ? 'text-primary font-bold' : 'text-content-secondary'}`}>
                {option.label}
              </Text>
              {selectedValue === option.value && <Feather name="check" size={20} color="#192C56" />}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
