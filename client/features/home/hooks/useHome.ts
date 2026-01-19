import { useAuthStore } from "@/features/auth/stores/authStore"

export const useHome = () => {
  const { user } = useAuthStore()
  console.log(user);
  
  const userName = user?.name?.split(' ')[0] || user?.username || "User"

  return {
    userName,
  }
}
