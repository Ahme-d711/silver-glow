import { axiosInstance } from '../../../services/api/axios';
import { CategoriesResponse } from '../types/category.types';
import { SubcategoriesResponse } from '../types/subcategory.types';

export const categoryService = {
  getAllCategories: async (): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get<CategoriesResponse>('/categories');
    return response.data;
  },

  getSubcategories: async (categoryId: string): Promise<SubcategoriesResponse> => {
    const response = await axiosInstance.get<SubcategoriesResponse>('/subcategories', {
      params: { categoryId, isShow: true }
    });
    return response.data;
  },
};
