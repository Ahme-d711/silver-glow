import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/category.service';

export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => categoryService.getSubcategories(categoryId),
    enabled: !!categoryId,
    select: (response) => response.data.subcategories,
  });
};
