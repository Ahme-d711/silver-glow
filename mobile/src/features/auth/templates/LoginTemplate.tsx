import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthHero } from '../components/AuthHero';
import { LoginForm } from '../components/LoginForm';

export const LoginTemplate = () => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <AuthHero />
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

