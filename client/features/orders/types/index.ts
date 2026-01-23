export type OrderStatus = 
  | "CREATED" 
  | "PENDING" 
  | "ACCEPTED" 
  | "IN_PROGRESS" 
  | "IN_THE_WAY" 
  | "RETURN" 
  | "DELIVERED"

export type OrderType = 
  | "CLOTHES" 
  | "ELECTRONICS" 
  | "DOCUMENTS"
  | "FOOD"
  | "FRAGILE"
  | "OTHER"
  | string // Allow other types from API

export interface Order {
  _id: string
  userId: any // To handle populated user object or ID string
  driverId: string | null
  userName: string
  driverName: string | null
  pickupLatitude: number
  pickupLongitude: number
  pickupAddress: string
  recipientLatitude: number
  recipientLongitude: number
  recipientAddress: string
  recipientName: string
  recipientPhone: string
  orderType: OrderType
  insuranceValue: number
  deliveryCost: number
  pictureUrl: string | null
  additionalNotes: string | null
  collectionDate: string
  collectionTime: string
  anyTime: boolean
  allowInspection: boolean
  receiverPaysShipping: boolean
  status: OrderStatus
  trackingNumber: string | null
  distanceKm: number
  pickupConfirmed: boolean
  deliveryConfirmed: boolean
  createdAt: string
  confirmedAt: string | null
  pickedUpAt: string | null
  deliveredAt: string | null
}

