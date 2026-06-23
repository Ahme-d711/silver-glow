import { Linking } from 'react-native';
import { useRouter } from 'expo-router';

import { Ad } from '../types/ad.types';

export function useAdPress() {
  const router = useRouter();

  const handleAdPress = (item: Ad) => {
    if (item.link) {
      Linking.openURL(item.link).catch((err) =>
        console.error("Couldn't load page", err)
      );
      return;
    }

    if (!item.productId) return;

    const productId =
      typeof item.productId === 'string' ? item.productId : item.productId._id;

    router.push({
      pathname: '/product/[id]' as any,
      params: { id: productId },
    });
  };

  return { handleAdPress };
}
