export interface User {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  rolesStr?: string[]; // Array of user permissions/roles
  photo?: string | null;
  profileImage?: string | null;
  username?: string;
  phone?: string;
  type?: string;
  active?: boolean;
  verifiedPhone?: boolean;
  walletBalance?: number;
  session_id?: string | null;
  session_expiry?: string | null;
  createdAt?: string;
  [key: string]: unknown; // Allow additional fields from API
}

export interface Sales {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  rating: number;
  branch: string;
  session_id: string | null;
  session_expiry: string | null;
  createdAt: string;
}

// Login API response structure (user object with token)
export interface LoginResponse extends User {
  token: string | null;
}

// Wrapper response for internal use
export interface AuthActionResponse {
  success: boolean;
  message?: string;
  status?: string;
  code?: number | string;
  temp_token?: string;
  // Actual API response structure
  token?: string | null; // New API format
  accessToken?: string; // Legacy support
  refreshToken?: string;
  user?: User;
  name?: string;
  // Legacy structure support
  data?: {
    user?: User;
    accessToken?: string;
  };
  // Spread all user fields from LoginResponse
  id?: string;
  phone?: string;
  type?: string;
  profileImage?: string | null;
  active?: boolean;
  verifiedPhone?: boolean;
  walletBalance?: number;
  createdAt?: string;
}

export interface SignupPayload {
  username?: string;
  name: string;
  email: string;
  companyName?: string;
  categoryId?: string;
  phone: string;
  address?: string;
  city?: string;
  responsibleName?: string;
  governorate?: string;
  referralCoupon?: string;
  referralEmail?: string;
  role?: string | string[];
  password?: string;
  readLicense?: boolean;
  [key: string]: unknown;
}