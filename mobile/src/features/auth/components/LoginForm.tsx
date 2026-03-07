import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { useLoginMutation } from '../hooks/useAuth';
import { useLanguage } from '@/src/hooks/useLanguage';

export const LoginForm = () => {
  const router = useRouter();
  const { t } = useLanguage();
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
            placeholder={t('auth.phone')}
            leftIcon="call-outline"
            keyboardType="phone-pad"
            label={t('auth.phone')}
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
            placeholder={t('auth.password')}
            leftIcon="lock-closed-outline"
            isPassword
            label={t('auth.password')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message as string}
          />
        )}
      />

      <TouchableOpacity 
        onPress={() => router.push('/(auth)/forgot-password')}
        className="mb-6 self-end"
      >
        <Text className="text-primary font-semibold">{t('auth.forgot_password')}</Text>
      </TouchableOpacity>
      
      {apiError && (
        <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
      )}
      
      <Button 
        title={t('auth.login')}
        onPress={handleSubmit(onSubmit)}
        className="mb-4 bg-primary"
        textClassName="text-white"
        loading={isPending}
        disabled={isPending}
      />

      <Button 
        title={t('auth.join_guest')}
        variant="outline"
        onPress={() => router.replace('/(main)')}
        className="mb-8"
      />
      
      <View className="flex-row justify-center items-center">
        <Text className="text-content-secondary text-lg">{t('auth.dont_have_account')}</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-primary text-lg font-bold">{t('auth.signup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
