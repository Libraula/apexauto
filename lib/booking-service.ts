import { supabase } from "./supabase"

export interface BookingFormData {
  name: string
  email: string
  phone: string
  address: string
  suburb: string
  postcode: string
  serviceType: string
  vehicleType: string
  vehicleCondition: string
  preferredDate?: string
  preferredTime?: string
  addOns?: string[]
  specialInstructions?: string
  totalPrice: number
}

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  address: string
  suburb: string
  postcode: string
  serviceType: string
  vehicleType: string
  vehicleCondition: string
  preferredDate?: string
  preferredTime?: string
  addOns?: string[]
  specialInstructions?: string
  totalPrice: number
  status: string
  createdAt: string
}

export async function createBooking(bookingData: BookingFormData) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          address: bookingData.address,
          suburb: bookingData.suburb,
          postcode: bookingData.postcode,
          service_type: bookingData.serviceType,
          vehicle_type: bookingData.vehicleType,
          vehicle_condition: bookingData.vehicleCondition,
          preferred_date: bookingData.preferredDate,
          preferred_time: bookingData.preferredTime,
          add_ons: bookingData.addOns,
          special_instructions: bookingData.specialInstructions,
          total_price: bookingData.totalPrice,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in createBooking:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function getBookings(): Promise<{ success: boolean; data?: Booking[]; error?: string }> {
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
    return { success: false, error: error.message }
  }

  const formattedData: Booking[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    address: item.address,
    suburb: item.suburb,
    postcode: item.postcode,
    serviceType: item.service_type,
    vehicleType: item.vehicle_type,
    vehicleCondition: item.vehicle_condition,
    preferredDate: item.preferred_date,
    preferredTime: item.preferred_time,
    addOns: item.add_ons,
    specialInstructions: item.special_instructions,
    totalPrice: item.total_price,
    status: item.status,
    createdAt: item.created_at,
  }))

  return { success: true, data: formattedData }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const { data, error } = await supabase.from("bookings").update({ status }).eq("id", bookingId).select()

    if (error) {
      console.error("Error updating booking status:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in updateBookingStatus:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
