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
import { registerSchema, RegisterFormData } from '../schemas/registerSchema';

export const RegisterForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  const [image, setImage] = useState<string | null>(null);

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
      // If we wanted to add image to form state:
      // setValue('avatar', uri); 
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log('Form Data:', data);
    router.replace('/(main)');
  };

  return (
    <View className="flex-1 bg-white px-8 pt-12 pb-10">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-content-primary mb-2">Create account</Text>
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
          <View className="w-24 h-24 rounded-full bg-background border border-divider items-center justify-center overflow-hidden">
            {image ? (
              <Image 
                source={{ uri: image }} 
                className="w-full h-full" 
                contentFit="cover"
              />
            ) : (
              <Ionicons name="image-outline" size={32} color="#94a3b8" />
            )}
          </View>
          {/* Plus Icon - Positioned to look "on top" of the edge */}
          <View className="absolute bottom-0 right-0 bg-white border border-divider rounded-full p-2 shadow-sm z-20">
            <Ionicons name="add" size={16} color="#1e293b" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Full name"
            leftIcon="person-outline"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.fullName?.message}
          />
        )}
      />

      <View className="flex-row gap-3">
        <View className="w-20">
          <Input 
            placeholder="+20"
            className="text-center px-0"
            keyboardType="phone-pad"
            editable={false}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input 
                placeholder="Phone number"
                leftIcon="call-outline"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.phoneNumber?.message}
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
            error={errors.email?.message}
          />
        )}
      />

      {/* Gender Selection */}
      <View className="mb-6">
        <Text className="text-slate-600 font-medium mb-3">Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <>
              <View className="flex-row gap-4">
                <TouchableOpacity 
                  onPress={() => onChange('male')}
                  className={`flex-1 h-14 rounded-2xl flex-row items-center justify-center border ${
                    value === 'male' ? 'bg-slate-50 border-primary' : 'bg-white border-divider'
                  }`}
                >
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={value === 'male' ? '#1e293b' : '#94a3b8'} 
                    className="mr-2"
                  />
                  <Text className={`font-medium ${value === 'male' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onChange('female')}
                  className={`flex-1 h-14 rounded-2xl flex-row items-center justify-center border ${
                    value === 'female' ? 'bg-slate-50 border-primary' : 'bg-white border-divider'
                  }`}
                >
                  <Ionicons 
                    name="woman-outline" 
                    size={20} 
                    color={value === 'female' ? '#1e293b' : '#94a3b8'} 
                    className="mr-2"
                  />
                  <Text className={`font-medium ${value === 'female' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.gender && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{errors.gender.message}</Text>
              )}
            </>
          )}
        />
      </View>

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
            error={errors.password?.message}
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
            error={errors.confirmPassword?.message}
          />
        )}
      />
      
      <Button 
        title="Create account"
        onPress={handleSubmit(onSubmit)}
        className="bg-primary border-none mt-2 mb-6"
        textClassName="text-white"
      />
      
      <View className="flex-row justify-center items-center">
        <Text className="text-slate-500 text-base">Already have account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-base font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
