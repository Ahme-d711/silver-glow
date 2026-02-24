import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { GetProductsParams } from '../types/product.types';

export const useHomeProducts = (params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts({ limit: 12, isShow: true, ...params }),
    select: (response) => ({
      products: response.data.products,
      pagination: response.data.pagination
    }),
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
    queryFn: () => productService.getProducts({ limit: 8, isShow: true }),
    select: (response) => response.data.products,
  });
};

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    select: (response) => response.data.product,
    enabled: !!id,
  });
};
