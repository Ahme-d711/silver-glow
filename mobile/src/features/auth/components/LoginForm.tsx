import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { useLoginMutation } from '../hooks/useAuth';

export const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending, error: apiError } = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <View className="flex-1 bg-white -mt-12 rounded-t-[40px] px-8 pt-10 pb-12">
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Phone number"
            leftIcon="call-outline"
            keyboardType="phone-pad"
            label='Phone number'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.phone?.message as string}
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
            label='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message as string}
          />
        )}
      />
      
      {apiError && (
        <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
      )}
      
      <Button 
        title="Login"
        onPress={handleSubmit(onSubmit)}
        className="mb-4 bg-primary"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />

      <Button 
        title="Join as Guest"
        variant="outline"
        onPress={() => router.replace('/(main)')}
        className="mb-8"
      />
      
      <View className="flex-row justify-center items-center">
        <Text className="text-content-secondary text-lg">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-primary text-lg font-bold">Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
