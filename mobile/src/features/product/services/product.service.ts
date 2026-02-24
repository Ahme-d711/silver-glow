import { axiosInstance } from '../../../services/api/axios';
import { ProductsResponse, SectionsResponse, GetProductsParams, SingleProductResponse } from '../types/product.types';

export const productService = {
  getProducts: async (params?: GetProductsParams): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>('/products', { params });
    return response.data;
  },
  
  getSections: async (): Promise<SectionsResponse> => {
    const response = await axiosInstance.get<SectionsResponse>('/sections');
    return response.data;
  },

  getProductById: async (id: string): Promise<SingleProductResponse> => {
    const response = await axiosInstance.get<SingleProductResponse>(`/products/${id}`);
    return response.data;
  },
};
