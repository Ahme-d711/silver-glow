import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { resetPasswordSchema, ResetPasswordFormData } from '../schemas/resetPasswordSchema';
import { useResetPasswordMutation } from '../hooks/useAuth';
import { useLanguage } from '@/src/hooks/useLanguage';

export const ResetPasswordForm = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { t } = useLanguage();
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
      <Text className="text-2xl font-bold text-primary mb-2">{t('auth.reset_password_title')}</Text>
      <Text className="text-content-secondary mb-8">
        {t('auth.reset_password_subtitle')}
      </Text>

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder={t('auth.verification_code')}
            leftIcon="shield-checkmark-outline"
            keyboardType="number-pad"
            label={t('auth.verification_code')}
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
            placeholder={t('auth.new_password')}
            leftIcon="lock-closed-outline"
            isPassword
            label={t('auth.new_password')}
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
            placeholder={t('auth.confirm_new_password')}
            leftIcon="lock-closed-outline"
            isPassword
            label={t('auth.confirm_new_password')}
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
        title={t('auth.reset_password_title')}
        onPress={handleSubmit(onSubmit)}
        className="mt-4 bg-primary"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />
    </View>
  );
};
