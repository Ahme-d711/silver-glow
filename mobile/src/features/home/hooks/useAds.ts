import { useQuery } from '@tanstack/react-query';
import { adService } from '../services/ad.service';

export const useAds = () => {
  return useQuery({
    queryKey: ['ads'],
    queryFn: () => adService.getAllAds(),
    select: (response) => response.data.ads,
  });
};
