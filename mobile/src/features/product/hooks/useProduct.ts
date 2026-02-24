import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { GetProductsParams } from '../types/product.types';

export const useHomeProducts = (params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts({ limit: 8, isShow: true, ...params }),
    select: (response) => response.data.products,
  });
};

export const useHomeSections = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: () => productService.getSections(),
    select: (response) => response.data.sections,
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'best-seller'],
    queryFn: () => productService.getProducts({ limit: 8, isShow: true }), // Server might have a specific flag or sort for best sellers
    select: (response) => response.data.products,
  });
};
