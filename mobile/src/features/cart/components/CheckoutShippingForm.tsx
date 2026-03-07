import React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../../../components/ui/input';
import { useLanguage } from '@/src/hooks/useLanguage';

interface CheckoutShippingFormProps {
  control: any;
  errors: any;
}

export const CheckoutShippingForm: React.FC<CheckoutShippingFormProps> = ({ control, errors }) => {
  const { t } = useLanguage();

  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <View className="bg-primary/10 p-2 rounded-lg mr-3">
          <Feather name="map-pin" size={20} color="#192C56" />
        </View>
        <Text className="text-xl font-bold text-primary">{t('checkout.shipping_details')}</Text>
      </View>
      
      <Controller
        control={control}
        name="recipientName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('checkout.recipient_name')}
            leftIcon="person-outline"
            placeholder={t('checkout.recipient_name_placeholder')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.recipientName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="recipientPhone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('checkout.recipient_phone')}
            leftIcon="call-outline"
            placeholder={t('checkout.recipient_phone_placeholder')}
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.recipientPhone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="shippingAddress"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('checkout.shipping_address')}
            leftIcon="home-outline"
            placeholder={t('checkout.shipping_address_placeholder')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.shippingAddress?.message}
          />
        )}
      />
      
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('checkout.city')}
                leftIcon="map-outline"
                placeholder={t('checkout.city')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.city?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="governorate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('checkout.governorate')}
                leftIcon="flag-outline"
                placeholder={t('checkout.governorate')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.governorate?.message}
              />
            )}
          />
        </View>
      </View>
      
      <Controller
        control={control}
        name="customerNotes"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('checkout.notes')}
            leftIcon="create-outline"
            placeholder={t('checkout.notes_placeholder')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.customerNotes?.message}
          />
        )}
      />
    </View>
  );
};
