import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../schemas/forgotPasswordSchema';
import { useForgotPasswordMutation } from '../hooks/useAuth';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: forgotPassword, isPending, error: apiError } = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data);
  };

  return (
    <View className="flex-1 bg-white -mt-12 rounded-t-[40px] px-8 pt-10 pb-12">
      <Text className="text-2xl font-bold text-primary mb-2">Forgot Password?</Text>
      <Text className="text-content-secondary mb-8">
        Enter your phone number and we will send you a verification code to reset your password.
      </Text>

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
      
      {apiError && (
        <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
      )}
      
      <Button 
        title="Send Reset Code"
        onPress={handleSubmit(onSubmit)}
        className="mt-4 bg-primary"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />

      <TouchableOpacity 
        onPress={() => router.back()}
        className="mt-6 self-center"
      >
        <Text className="text-primary font-semibold">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};
