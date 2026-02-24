import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/category.service';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    select: (response) => response.data.categories,
  });
};

export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => categoryService.getSubcategories(categoryId),
    select: (response) => response.data.subcategories,
    enabled: !!categoryId,
  });
};
