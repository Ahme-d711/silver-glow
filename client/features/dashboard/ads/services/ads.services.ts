"use client";

import clientAxios from "@/lib/axios/clientAxios";
import { ServiceResponse } from "@/features/dashboard/orders/services/orders.services";
import { Ad } from "../types";

export interface GetAdsParams {
  isShown?: boolean;
  page?: number;
  limit?: number;
}

export const getAllAds = async (params: GetAdsParams = {}) => {
  const response = await clientAxios.get<{ success: boolean; data: { ads: Ad[] } }>("/ads", { params });
  return response.data.data.ads;
};

export const getAdById = async (id: string) => {
  const response = await clientAxios.get<{ success: boolean; data: { ad: Ad } }>(`/ads/${id}`);
  return response.data.data.ad;
};

export const createAd = async (payload: FormData) => {
  const response = await clientAxios.post<{ success: boolean; message: string; data: { ad: Ad } }>(
    "/ads",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateAd = async (id: string, payload: FormData) => {
  const response = await clientAxios.put<{ success: boolean; message: string; data: { ad: Ad } }>(
    `/ads/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteAd = async (id: string) => {
  const response = await clientAxios.delete<{ success: boolean; message: string }>(`/ads/${id}`);
  return response.data;
};

export const toggleAdStatus = async (id: string) => {
  const response = await clientAxios.patch<{ success: boolean; message: string; data: { ad: Ad } }>(
    `/ads/${id}/toggle-status`
  );
  return response.data;
};
