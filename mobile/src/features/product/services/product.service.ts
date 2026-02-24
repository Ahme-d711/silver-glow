import { axiosInstance } from '../../../services/api/axios';
import { ProductsResponse, SectionsResponse, GetProductsParams } from '../types/product.types';

export const productService = {
  getProducts: async (params?: GetProductsParams): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>('/products', { params });
    return response.data;
  },
  
  getSections: async (): Promise<SectionsResponse> => {
    const response = await axiosInstance.get<SectionsResponse>('/sections');
    return response.data;
  },
};
