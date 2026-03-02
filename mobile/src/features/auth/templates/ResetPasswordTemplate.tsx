import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthHero } from '../components/AuthHero';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const ResetPasswordTemplate = () => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <AuthHero />
        <ResetPasswordForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
