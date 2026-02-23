import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../../components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema, VerifyFormData } from '../schemas/verifySchema';
import { useVerifyMutation, useResendVerificationMutation } from '../hooks/useAuth';

const { width } = Dimensions.get('window');
const CODE_LENGTH = 6;
const BOX_SIZE = (width - 64 - (CODE_LENGTH - 1) * 10) / CODE_LENGTH;

export const VerifyForm = () => {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [timer, setTimer] = useState(44);
  
  const { mutate: verify, isPending, error: apiError } = useVerifyMutation();
  const { mutate: resend, isPending: isResending } = useResendVerificationMutation();

  const {
    control,
    handleSubmit,
    setValue,
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
    <View className="flex-1 bg-white px-8 pt-12 pb-10">
      {/* Sparkles Decoration */}
      <View style={styles.sparkle1}>
        <Ionicons name="sparkles" size={24} color="#94a3b8" />
      </View>
      <View style={styles.sparkle2}>
        <Ionicons name="sparkles" size={32} color="#0B1324" />
      </View>
      <View style={styles.sparkle3}>
        <Ionicons name="sparkles" size={24} color="#94a3b8" />
      </View>

      {/* Header */}
      <View className="items-center mb-10 mt-6">
        <Text className="text-2xl font-bold text-slate-900 mb-2">Confirm your account</Text>
        <Text className="text-slate-500 text-center text-base leading-6">
          Enter 6-digit code that send to your{'\n'}phone number
        </Text>
      </View>

      {/* OTP Input Container */}
      <View className="mb-10">
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

      {apiError && (
        <Text className="text-red-500 text-sm mb-4 text-center">{(apiError as Error).message}</Text>
      )}

      <Button 
        title="Confirm"
        onPress={handleSubmit(onSubmit)}
        className={`h-14 rounded-2xl mb-6 ${codeValue.length === CODE_LENGTH ? 'bg-primary' : 'bg-slate-300'}`}
        textClassName="text-white font-bold text-lg"
        loading={isPending}
        disabled={isPending || codeValue.length !== CODE_LENGTH}
      />

      <View className="flex-row justify-center items-center">
        <Text className="text-slate-500 text-base">Don’t received code? </Text>
        <TouchableOpacity onPress={handleResend} disabled={timer > 0 || isResending}>
          <Text className={`text-base font-bold ${timer > 0 ? 'text-slate-400' : 'text-primary'}`}>
            Resend {timer > 0 ? `in ${formatTime(timer)}` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Back to Login */}
      <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')}
        className="mt-8 self-center"
      >
        <Text className="text-slate-400 text-base">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sparkle1: {
    position: 'absolute',
    top: 80,
    right: 32,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 220,
    right: 28,
  },
  sparkle3: {
    position: 'absolute',
    bottom: 180,
    right: 32,
  },
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
