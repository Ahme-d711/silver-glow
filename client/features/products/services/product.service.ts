"use client";

import clientAxios from "@/lib/axios/clientAxios";
import {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  GetProductsParams,
  ServiceResponse,
} from "../types";

export const getAllProducts = async (params: GetProductsParams = {}) => {
  const response = await clientAxios.get<
    ServiceResponse<{ products: Product[]; pagination: any }>
  >("/products", { params });
  return response.data.data?.products || [];
};

export const getProductById = async (id: string) => {
  const response = await clientAxios.get<ServiceResponse<{ product: Product }>>(
    `/products/${id}`
  );
  return response.data.data?.product;
};

export const getProductBySlug = async (slug: string) => {
  const response = await clientAxios.get<ServiceResponse<{ product: Product }>>(
    `/products/slug/${slug}`
  );
  return response.data.data?.product;
};

export const createProduct = async (payload: CreateProductPayload | FormData) => {
  const response = await clientAxios.post<ServiceResponse<{ product: Product }>>(
    "/products",
    payload,
    {
      headers: {
        "Content-Type":
          payload instanceof FormData ? "multipart/form-data" : "application/json",
      },
    }
  );
  return response.data;
};

export const updateProduct = async (
  id: string,
  payload: UpdateProductPayload | FormData
) => {
  const response = await clientAxios.put<ServiceResponse<{ product: Product }>>(
    `/products/${id}`,
    payload,
    {
      headers: {
        "Content-Type":
          payload instanceof FormData ? "multipart/form-data" : "application/json",
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await clientAxios.delete<ServiceResponse<null>>(
    `/products/${id}`
  );
  return response.data;
};

export const toggleProductStatus = async (id: string) => {
  const response = await clientAxios.patch<ServiceResponse<{ product: Product }>>(
    `/products/${id}/toggle-status`
  );
  return response.data;
};

export const restoreProduct = async (id: string) => {
  const response = await clientAxios.patch<ServiceResponse<{ product: Product }>>(
    `/products/${id}/restore`
  );
  return response.data;
};
