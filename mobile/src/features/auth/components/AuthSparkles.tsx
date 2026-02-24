import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AuthSparkles = () => {
  return (
    <>
      <View style={styles.sparkle1}>
        <Ionicons name="sparkles" size={24} color="#94a3b8" />
      </View>
      <View style={styles.sparkle2}>
        <Ionicons name="sparkles" size={32} color="#0B1324" />
      </View>
      <View style={styles.sparkle3}>
        <Ionicons name="sparkles" size={24} color="#94a3b8" />
      </View>
    </>
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
});
