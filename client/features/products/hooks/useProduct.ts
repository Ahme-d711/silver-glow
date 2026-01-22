import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getProductBySlug,
  restoreProduct,
} from "../services/product.service";
import {
  CreateProductPayload,
  GetProductsParams,
  UpdateProductPayload,
} from "../types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useProducts = (params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", "slug", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Common");

  return useMutation({
    mutationFn: (payload: CreateProductPayload | FormData) => createProduct(payload),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(response.message || t("success"));
      } else {
        toast.error(response.message || t("error"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Common");

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProductPayload | FormData;
    }) => updateProduct(id, payload),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(response.message || t("success"));
      } else {
        toast.error(response.message || t("error"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Common");

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(response.message || t("success_deleted"));
      } else {
        toast.error(response.message || t("error"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};

export const useToggleProductStatus = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Common");

  return useMutation({
    mutationFn: (id: string) => toggleProductStatus(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(response.message || t("success"));
      } else {
        toast.error(response.message || t("error"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};

export const useRestoreProduct = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Common");

  return useMutation({
    mutationFn: (id: string) => restoreProduct(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(response.message || t("success"));
      } else {
        toast.error(response.message || t("error"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
