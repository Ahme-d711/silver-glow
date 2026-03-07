import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../../../components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema, VerifyFormData } from '../schemas/verifySchema';
import { useVerifyMutation, useResendVerificationMutation } from '../hooks/useAuth';
import { AuthSparkles } from './AuthSparkles';
import { useLanguage } from '@/src/hooks/useLanguage';

const { width } = Dimensions.get('window');
const CODE_LENGTH = 6;
const BOX_SIZE = (width - 64 - (CODE_LENGTH - 1) * 10) / CODE_LENGTH;

export const VerifyForm = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [timer, setTimer] = useState(44);
  
  const { mutate: verify, isPending, error: apiError } = useVerifyMutation();
  const { mutate: resend, isPending: isResending } = useResendVerificationMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      phone: phone || '',
      code: '',
    },
  });

  const codeValue = watch('code');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = (data: VerifyFormData) => {
    verify(data);
  };

  const handleResend = () => {
    if (timer === 0 && phone) {
      resend({ phone }, {
        onSuccess: () => setTimer(60)
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 32, paddingTop: 48, paddingBottom: 40 }}>
      {/* Sparkles Decoration */}
      <AuthSparkles />

      <View className="flex-1 justify-center py-10">
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-3xl font-bold text-slate-900 mb-2">{t('auth.verify_title')}</Text>
          <Text className="text-slate-500 text-center text-lg leading-6">
            {t('auth.verify_subtitle')}
          </Text>
        </View>

        {/* OTP Input Container */}
        <View className="mb-4">
          <TouchableOpacity     
            activeOpacity={1} 
            onPress={() => inputRef.current?.focus()}
            className="flex-row justify-between"
          >
            {Array(CODE_LENGTH).fill(0).map((_, i) => (
              <View 
                key={i}
                style={[
                  styles.codeBox,
                  codeValue.length === i && styles.codeBoxActive,
                  codeValue.length > i && styles.codeBoxFilled
                ]}
              >
                <Text style={styles.codeText}>{codeValue[i] || ''}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Hidden TextInput */}
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={inputRef}
                value={value}
                onChangeText={(text) => {
                  if (text.length <= CODE_LENGTH) {
                    onChange(text);
                  }
                }}
                keyboardType="number-pad"
                style={styles.hiddenInput}
                autoFocus
              />
            )}
          />
          {errors.code && (
            <Text className="text-red-500 text-sm mt-4 text-center">{errors.code.message}</Text>
          )}
        </View>
      </View>

      {/* Bottom Actions */}
      <View className="mt-auto">
        {apiError && (
          <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
        )}

      <Button 
        title={t('auth.confirm')}
        onPress={handleSubmit(onSubmit)}
        className={`h-14 rounded-2xl mb-6 ${codeValue.length === CODE_LENGTH ? 'bg-primary' : 'bg-slate-300'}`}
        textClassName="text-white font-bold text-lg"
        loading={isPending}
        disabled={isPending || codeValue.length !== CODE_LENGTH}
      />

      <View className="flex-row justify-center items-center">
        <Text className="text-slate-500 text-base">{t('auth.resend_code_question')}</Text>
        <TouchableOpacity onPress={handleResend} disabled={timer > 0 || isResending}>
          <Text className={`text-base font-bold ${timer > 0 ? 'text-slate-400' : 'text-primary'}`}>
            {t('auth.resend')} {timer > 0 ? `${t('auth.resend_in')}${formatTime(timer)}` : ''}
          </Text>
        </TouchableOpacity>
      </View>

        {/* Back to Login */}
        <TouchableOpacity 
          onPress={() => router.replace('/(auth)/login')}
          className="mt-8 self-center"
        >
          <Text className="text-slate-400 text-base">{t('auth.back_to_login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeBox: {
    width: BOX_SIZE,
    height: BOX_SIZE * 1.2,
    backgroundColor: '#F1F5F9', // slate-100
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  codeBoxActive: {
    borderColor: '#0B1324',
    backgroundColor: '#FFFFFF',
  },
  codeBoxFilled: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1324',
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
});
