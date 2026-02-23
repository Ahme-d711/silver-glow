import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CountryPickerModal } from './CountryPickerModal';
import { Country } from '../../../utils/countries';
import { registerSchema, RegisterFormData } from '../schemas/registerSchema';

import { useRegisterMutation } from '../hooks/useAuth';

export const RegisterForm = () => {
  const router = useRouter();
  const { mutate: register, isPending, error: apiError } = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [image, setImage] = useState<string | null>(null);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: 'Egypt',
    code: 'EG',
    flag: '🇪🇬',
    dialCode: '+20',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    register({ ...data, phone: selectedCountry.dialCode + data.phone });
  };

  return (
    <View className="flex-1 bg-white px-8 pt-12 pb-10">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-content-primary mb-2">Create account</Text>
        <Text className="text-content-secondary text-center">
          Please enter your information to create account.
        </Text>
      </View>

      {/* Avatar Placeholder */}
      <View className="items-center mb-8">
        <TouchableOpacity 
          onPress={pickImage}
          activeOpacity={0.7}
          className="relative"
        >
          <View style={{
            width: 128,
            height: 128,
            borderRadius: 64,
            backgroundColor: '#f8fafc',
            borderWidth: 1,
            borderColor: '#e2e8f0',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="image-outline" size={40} color="#94a3b8" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Full name"
            leftIcon="person-outline"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message as string}
          />
        )}
      />

      <View className="flex-row gap-3">
        <TouchableOpacity 
          onPress={() => setIsCountryPickerVisible(true)}
          activeOpacity={0.7}
          className="w-24"
        >
          <Input 
            placeholder={selectedCountry.dialCode}
            value={selectedCountry.dialCode}
            className="text-center px-0 font-bold text-slate-900"
            keyboardType="phone-pad"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <View className="flex-1">
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input 
                placeholder="Phone number"
                leftIcon="call-outline"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.phone?.message as string}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Email"
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message as string}
          />
        )}
      />


      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Password"
            leftIcon="lock-closed-outline"
            isPassword
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Confirm password"
            leftIcon="lock-closed-outline"
            isPassword
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.confirmPassword?.message as string}
          />
        )}
      />
      
      {apiError && (
        <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
      )}

      <Button 
        title="Create account"
        onPress={handleSubmit(onSubmit)}
        className="bg-primary border-none mt-2 mb-6"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />
      
      <View className="flex-row justify-center items-center">
        <Text className="text-slate-500 text-base">Already have account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-base font-bold">Login</Text>
        </TouchableOpacity>
      </View>

      <CountryPickerModal 
        visible={isCountryPickerVisible}
        onClose={() => setIsCountryPickerVisible(false)}
        onSelect={setSelectedCountry}
      />
    </View>
  );
};
