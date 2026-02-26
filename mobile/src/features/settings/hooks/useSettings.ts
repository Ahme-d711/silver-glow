import { useQuery } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";

export const useSettings = () => {
  return useQuery({
    queryKey: ["app-settings"],
    queryFn: settingsService.getSettings,
    staleTime: 1000 * 60 * 60, // 1 hour - global settings don't change often
  });
};
