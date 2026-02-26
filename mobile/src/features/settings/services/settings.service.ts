import { axiosInstance } from "../../../services/api/axios";
import { SettingsResponse } from "../types/settings.types";

export const settingsService = {
  getSettings: async (): Promise<SettingsResponse> => {
    const response = await axiosInstance.get<SettingsResponse>("/settings");
    return response.data;
  },
};
