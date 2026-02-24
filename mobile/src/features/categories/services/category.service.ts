import { axiosInstance } from '../../../services/api/axios';
import { CategoriesResponse } from '../types/category.types';

export const categoryService = {
  getAllCategories: async (): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get<CategoriesResponse>('/categories');
    return response.data;
  },
};
