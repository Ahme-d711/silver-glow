import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthHero } from '../components/AuthHero';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordTemplate = () => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <AuthHero />
        <ForgotPasswordForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
