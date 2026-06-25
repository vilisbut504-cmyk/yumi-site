export type OrderSource = 'checkout' | 'lead_form' | 'treat_picker'

export type DeliveryMethod = 'courier_spb' | 'pickup'
export type PaymentMethod = 'cash_on_delivery' | 'bank_transfer_on_delivery'
export type ProductUnit = 'weight' | 'piece'

export interface OrderCustomer {
  name: string
  phone: string
  email?: string
  city?: string
  address?: string
  comment?: string
}

export interface OrderDelivery {
  method: DeliveryMethod
  address?: string
  preferredTime?: string
}

export interface OrderPayment {
  online: false
  method: PaymentMethod
  status: 'pending'
}

export interface OrderItem {
  slug: string
  name: string
  quantity: number
  unit: ProductUnit
  weight: '100 г' | '1 шт' | string
  price: number
  price100g?: number
  pricePerKg?: number
}

export interface OrderTotals {
  subtotal: number
  delivery?: number
  total: number
}

export interface OrderUtm {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

export interface OrderPage {
  url: string
  referrer?: string
}

export interface OrderPayload {
  source: OrderSource
  customer: OrderCustomer
  delivery: OrderDelivery
  payment: OrderPayment
  items: OrderItem[]
  totals: OrderTotals
  utm: OrderUtm
  page: OrderPage
}

export interface OrderApiResponse {
  success: boolean
  mode: 'demo' | 'server'
  leadId?: number
  contactId?: number
  error?: string
}
