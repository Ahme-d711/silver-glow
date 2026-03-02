import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { resetPasswordSchema, ResetPasswordFormData } from '../schemas/resetPasswordSchema';
import { useResetPasswordMutation } from '../hooks/useAuth';

export const ResetPasswordForm = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { mutate: resetPassword, isPending, error: apiError } = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: phone || '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data);
  };

  return (
    <View className="flex-1 bg-white -mt-12 rounded-t-[40px] px-8 pt-10 pb-12">
      <Text className="text-2xl font-bold text-primary mb-2">Reset Password</Text>
      <Text className="text-content-secondary mb-8">
        Enter the 6-digit code sent to your WhatsApp and your new password.
      </Text>

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="Verification Code"
            leftIcon="shield-checkmark-outline"
            keyboardType="number-pad"
            label='Verification Code'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.code?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder="New Password"
            leftIcon="lock-closed-outline"
            isPassword
            label='New Password'
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
            placeholder="Confirm New Password"
            leftIcon="lock-closed-outline"
            isPassword
            label='Confirm New Password'
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
        title="Reset Password"
        onPress={handleSubmit(onSubmit)}
        className="mt-4 bg-primary"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />
    </View>
  );
};
