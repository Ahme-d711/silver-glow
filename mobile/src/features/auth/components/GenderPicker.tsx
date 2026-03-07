import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useLanguage } from '@/src/hooks/useLanguage';

interface GenderPickerProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  label?: string;
  name?: string;
}

export const GenderPicker: React.FC<GenderPickerProps> = ({ 
  control, 
  errors, 
  label,
  name = "gender"
}) => {
  const { t } = useLanguage();
  const displayLabel = label || t('auth.gender');

  return (
    <View className="mb-6">
      <Text className="text-content-secondary text-lg font-medium mb-3 ml-1">{displayLabel}</Text>
      <View className="flex-row gap-4">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => onChange('male')}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 56,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  backgroundColor: value === 'male' ? '#F8FAFC' : '#FFFFFF',
                  borderColor: value === 'male' ? '#0B1324' : '#F1F5F9',
                }}
              >
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={value === 'male' ? '#0B1324' : '#94a3b8'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={{
                  fontWeight: '600',
                  color: value === 'male' ? '#0B1324' : '#94a3b8',
                }}>
                  {t('auth.male')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('female')}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 56,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  backgroundColor: value === 'female' ? '#F8FAFC' : '#FFFFFF',
                  borderColor: value === 'female' ? '#0B1324' : '#F1F5F9',
                }}
              >
                <Ionicons 
                  name="woman-outline" 
                  size={20} 
                  color={value === 'female' ? '#0B1324' : '#94a3b8'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={{
                  fontWeight: '600',
                  color: value === 'female' ? '#0B1324' : '#94a3b8',
                }}>
                  {t('auth.female')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      {errors[name] && (
        <Text className="text-red-500 text-sm mt-2 ml-1">
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
};
