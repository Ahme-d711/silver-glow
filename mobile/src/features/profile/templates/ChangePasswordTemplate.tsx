import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordSchema, ChangePasswordFormData } from '../../auth/schemas/changePasswordSchema';
import { useChangePasswordMutation } from '../../auth/hooks/useAuth';
import { useLanguage } from '@/src/hooks/useLanguage';

export const ChangePasswordTemplate = () => {
  const { mutate: changePassword, isPending, error } = useChangePasswordMutation();
  const { t } = useLanguage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data);
  };

  return (
    <View className="flex-1 bg-white">
      <PageHeader title={t('profile.change_password')} showBackButton />

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-slate-500 text-sm font-medium mb-6 ml-1 uppercase tracking-wider">
            {t('profile.update_security')}
          </Text>

          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('profile.current_password')}
                leftIcon="lock-closed-outline"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.currentPassword?.message}
              />
            )}
          />

          <View className="h-4" />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('profile.new_password')}
                leftIcon="lock-closed-outline"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.newPassword?.message}
              />
            )}
          />

          <View className="h-4" />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('profile.confirm_new_password')}
                leftIcon="lock-closed-outline"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        {error && (
          <View className="mb-6 p-4 bg-red-50 rounded-2xl flex-row items-center border border-red-100">
            <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
            <Text className="text-red-500 text-sm ml-2 flex-1">
              {error instanceof Error ? error.message : t('profile.something_wrong')}
            </Text>
          </View>
        )}

        <Button
          title={t('profile.update_password')}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
          className="bg-primary h-14 rounded-2xl"
          textClassName="text-white font-bold"
        />

        <View className="mt-8 items-center">
          <View className="bg-slate-50 p-4 rounded-2xl flex-row items-center max-w-[90%]">
            <Ionicons name="information-circle-outline" size={18} color="#64748B" />
            <Text className="text-slate-400 text-xs ml-2 leading-relaxed">
              {t('profile.password_hint')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
