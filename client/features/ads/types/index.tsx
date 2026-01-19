export interface Ad {
  id: string
  photo: string
  name: string
  isShown: boolean
  note: string
}

export interface AdResponse {
  success: boolean
  message?: string
  data?: Ad
}

