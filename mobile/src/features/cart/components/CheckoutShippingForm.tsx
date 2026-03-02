import React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../../../components/ui/input';

interface CheckoutShippingFormProps {
  control: any;
  errors: any;
}

export const CheckoutShippingForm: React.FC<CheckoutShippingFormProps> = ({ control, errors }) => {
  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <View className="bg-primary/10 p-2 rounded-lg mr-3">
          <Feather name="map-pin" size={20} color="#192C56" />
        </View>
        <Text className="text-xl font-bold text-primary">Shipping Details</Text>
      </View>
      
      <Controller
        control={control}
        name="recipientName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            leftIcon="person-outline"
            placeholder="Enter recipient name"
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
            label="Phone Number"
            leftIcon="call-outline"
            placeholder="Enter phone number"
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
            label="Address"
            leftIcon="home-outline"
            placeholder="Street, building, apartment"
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
                label="City"
                leftIcon="map-outline"
                placeholder="City"
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
                label="Governorate"
                leftIcon="flag-outline"
                placeholder="Governorate"
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
            label="Notes"
            leftIcon="create-outline"
            placeholder="Any notes for delivery?"
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
