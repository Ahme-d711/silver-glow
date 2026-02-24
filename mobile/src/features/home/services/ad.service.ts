import { axiosInstance } from '../../../services/api/axios';
import { AdsResponse } from '../types/ad.types';

export const adService = {
  getAllAds: async (): Promise<AdsResponse> => {
    const response = await axiosInstance.get<AdsResponse>('/ads');
    return response.data;
  },
};
