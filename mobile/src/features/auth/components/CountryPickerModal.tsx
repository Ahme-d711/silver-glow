import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { countries, Country } from '../../../utils/countries';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export const CountryPickerModal = ({ visible, onClose, onSelect }: Props) => {
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dialCode.includes(search)
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView className="flex-1 bg-black/50">
        <View className="flex-1 mt-20 bg-white rounded-t-[40px] overflow-hidden">
          <View className="flex-row items-center justify-between px-8 py-6 border-b border-divider">
            <Text className="text-xl font-bold text-content-primary">Select Country</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#1e293b" />
            </TouchableOpacity>
          </View>

          <View className="px-8 py-4">
            <View className="flex-row items-center bg-background border border-divider rounded-2xl px-4 h-14">
              <Ionicons name="search-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search country or code..."
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2 text-base text-content-primary"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            </View>
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                activeOpacity={0.6}
                className="flex-row items-center px-8 py-4 border-b border-slate-50"
              >
                <Text className="text-2xl mr-4">{item.flag}</Text>
                <Text className="flex-1 text-base font-medium text-slate-700">{item.name}</Text>
                <Text className="text-base font-bold text-slate-400">{item.dialCode}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
