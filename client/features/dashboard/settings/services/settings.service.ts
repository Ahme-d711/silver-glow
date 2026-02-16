"use client";

import clientAxios from "@/lib/axios/clientAxios";
import { SettingsFormValues } from "../schemas/settingsSchema";

export const getSettings = async () => {
  const response = await clientAxios.get<{ data: SettingsFormValues & { _id: string } }>("/settings");
  return response.data.data;
};

export const updateSettings = async (data: SettingsFormValues) => {
  const response = await clientAxios.put<{ data: SettingsFormValues }>("/settings", data);
  return response.data.data;
};
