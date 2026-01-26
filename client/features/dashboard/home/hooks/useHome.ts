import { useAuthStore } from "@/features/dashboard/auth/stores/authStore"
import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "../services/dashboard.services"
import { DashboardStats } from "../types/dashboard.types"

export const useHome = () => {
  const { user } = useAuthStore()
  
  const userName = user?.name?.split(' ')[0] || user?.username || "User"

  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  })

  return {
    userName,
    stats,
    isLoading,
    error
  }
}
