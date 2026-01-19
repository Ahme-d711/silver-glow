"use client"

import type { Order, OrderStatus } from "../types"

// Fake data storage (in-memory)
const fakeOrders: Order[] = [
  {
    id: 1,
    userId: "user1",
    driverId: "driver1",
    userName: "أحمد محمد",
    driverName: "محمد علي",
    pickupLatitude: 30.0444,
    pickupLongitude: 31.2357,
    pickupAddress: "شارع التحرير، القاهرة",
    recipientLatitude: 30.0626,
    recipientLongitude: 31.2497,
    recipientAddress: "مدينة نصر، القاهرة",
    recipientName: "سارة أحمد",
    recipientPhone: "01234567890",
    orderType: "CLOTHES",
    insuranceValue: 500,
    deliveryCost: 50,
    pictureUrl: null,
    additionalNotes: "يرجى التعامل بحذر",
    collectionDate: "2024-01-15",
    collectionTime: "14:00",
    anyTime: false,
    allowInspection: true,
    receiverPaysShipping: false,
    status: "PENDING",
    trackingNumber: "TRK001",
    distanceKm: 12.5,
    pickupConfirmed: false,
    deliveryConfirmed: false,
    createdAt: "2024-01-10T10:00:00Z",
    confirmedAt: null,
    pickedUpAt: null,
    deliveredAt: null,
  },
  {
    id: 2,
    userId: "user2",
    driverId: "driver2",
    userName: "فاطمة حسن",
    driverName: "خالد إبراهيم",
    pickupLatitude: 30.0131,
    pickupLongitude: 31.2089,
    pickupAddress: "المعادي، القاهرة",
    recipientLatitude: 30.0444,
    recipientLongitude: 31.2357,
    recipientAddress: "وسط البلد، القاهرة",
    recipientName: "علي محمود",
    recipientPhone: "01123456789",
    orderType: "ELECTRONICS",
    insuranceValue: 2000,
    deliveryCost: 75,
    pictureUrl: null,
    additionalNotes: "جهاز إلكتروني هش",
    collectionDate: "2024-01-16",
    collectionTime: "16:00",
    anyTime: true,
    allowInspection: true,
    receiverPaysShipping: true,
    status: "IN_PROGRESS",
    trackingNumber: "TRK002",
    distanceKm: 18.3,
    pickupConfirmed: true,
    deliveryConfirmed: false,
    createdAt: "2024-01-11T09:00:00Z",
    confirmedAt: "2024-01-11T10:00:00Z",
    pickedUpAt: "2024-01-12T14:00:00Z",
    deliveredAt: null,
  },
  {
    id: 3,
    userId: "user3",
    driverId: null,
    userName: "محمود سعيد",
    driverName: null,
    pickupLatitude: 30.0844,
    pickupLongitude: 31.2197,
    pickupAddress: "الزمالك، القاهرة",
    recipientLatitude: 30.0131,
    recipientLongitude: 31.2089,
    recipientAddress: "المعادي، القاهرة",
    recipientName: "نورا أحمد",
    recipientPhone: "01012345678",
    orderType: "FOOD",
    insuranceValue: 100,
    deliveryCost: 30,
    pictureUrl: null,
    additionalNotes: "طعام ساخن",
    collectionDate: "2024-01-17",
    collectionTime: "12:00",
    anyTime: false,
    allowInspection: false,
    receiverPaysShipping: false,
    status: "CREATED",
    trackingNumber: null,
    distanceKm: 8.7,
    pickupConfirmed: false,
    deliveryConfirmed: false,
    createdAt: "2024-01-12T11:00:00Z",
    confirmedAt: null,
    pickedUpAt: null,
    deliveredAt: null,
  },
  {
    id: 4,
    userId: "user1",
    driverId: "driver3",
    userName: "أحمد محمد",
    driverName: "يوسف أحمد",
    pickupLatitude: 30.0626,
    pickupLongitude: 31.2497,
    pickupAddress: "مدينة نصر، القاهرة",
    recipientLatitude: 30.0444,
    recipientLongitude: 31.2357,
    recipientAddress: "شارع التحرير، القاهرة",
    recipientName: "مريم علي",
    recipientPhone: "01234567891",
    orderType: "DOCUMENTS",
    insuranceValue: 200,
    deliveryCost: 40,
    pictureUrl: null,
    additionalNotes: "مستندات مهمة",
    collectionDate: "2024-01-14",
    collectionTime: "10:00",
    anyTime: false,
    allowInspection: false,
    receiverPaysShipping: false,
    status: "DELIVERED",
    trackingNumber: "TRK003",
    distanceKm: 15.2,
    pickupConfirmed: true,
    deliveryConfirmed: true,
    createdAt: "2024-01-09T08:00:00Z",
    confirmedAt: "2024-01-09T09:00:00Z",
    pickedUpAt: "2024-01-10T10:00:00Z",
    deliveredAt: "2024-01-10T15:00:00Z",
  },
]

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getOrders(): Promise<Order[]> {
  await delay(300)
  return [...fakeOrders]
}

export async function getOrdersByStatus(
  status: OrderStatus,
  userId: string
): Promise<Order[]> {
  await delay(300)
  
  let filtered = fakeOrders.filter(order => order.status === status)
  
  if (userId && userId !== "all") {
    filtered = filtered.filter(order => order.userId === userId)
  }
  
  return filtered
}

