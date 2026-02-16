"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSettings, updateSettings } from "../services/settings.service";
import { SettingsFormValues } from "../schemas/settingsSchema";

export const useSettings = () => {
  const queryClient = useQueryClient();

  // Fetch settings
  const { 
    data: settings, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Update settings
  const { 
    mutateAsync: updateSettingsMutation, 
    isPending: isUpdating 
  } = useMutation({
    mutationFn: (data: SettingsFormValues) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update settings";
      toast.error(message);
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateSettingsMutation,
    isUpdating,
  };
};
