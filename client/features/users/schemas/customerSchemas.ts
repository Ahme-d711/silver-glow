// API Response Type
export interface Customer {
  id: string
  name: string
  phone: string
  type: string
  profileImage: string | null
  active: boolean
  verifiedPhone: boolean
  createdAt: string
  walletBalance: number
}

