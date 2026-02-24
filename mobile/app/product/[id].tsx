import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProductDetailsTemplate } from '../../src/features/product/templates/ProductDetailsTemplate';

export default function ProductDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <ProductDetailsTemplate id={id} />;
}
