import { supabase } from "./supabase"

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleType: string
  vehicleYear: string
  vehicleMake: string
  vehicleModel: string
  serviceType: string
  serviceLocation: string
  selectedAddOns: string[]
  address?: string
  preferredDate: string
  preferredTime: string
  specialRequests?: string
  totalPrice: number
}

export interface Booking {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleType: string
  vehicleYear: string
  vehicleMake: string
  vehicleModel: string
  serviceType: string
  serviceLocation: string
  selectedAddOns: string[]
  serviceAddress?: string
  preferredDate: string
  preferredTime: string
  specialRequests?: string
  totalPrice: number
  status: string
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export async function createBooking(bookingData: BookingFormData) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          first_name: bookingData.firstName,
          last_name: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          vehicle_type: bookingData.vehicleType,
          vehicle_year: bookingData.vehicleYear,
          vehicle_make: bookingData.vehicleMake,
          vehicle_model: bookingData.vehicleModel,
          service_type: bookingData.serviceType,
          service_location: bookingData.serviceLocation,
          selected_add_ons: bookingData.selectedAddOns,
          service_address: bookingData.address,
          preferred_date: bookingData.preferredDate,
          preferred_time: bookingData.preferredTime,
          special_requests: bookingData.specialRequests,
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
    firstName: item.first_name,
    lastName: item.last_name,
    email: item.email,
    phone: item.phone,
    vehicleType: item.vehicle_type,
    vehicleYear: item.vehicle_year,
    vehicleMake: item.vehicle_make,
    vehicleModel: item.vehicle_model,
    serviceType: item.service_type,
    serviceLocation: item.service_location,
    selectedAddOns: item.selected_add_ons || [],
    serviceAddress: item.service_address,
    preferredDate: item.preferred_date,
    preferredTime: item.preferred_time,
    specialRequests: item.special_requests,
    totalPrice: item.total_price,
    status: item.status,
    adminNotes: item.admin_notes,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))

  return { success: true, data: formattedData }
}

export async function updateBookingStatus(bookingId: string, status: string, adminNotes?: string) {
  try {
    const updateData: any = { status }
    if (adminNotes !== undefined) {
      updateData.admin_notes = adminNotes
    }

    const { data, error } = await supabase.from("bookings").update(updateData).eq("id", bookingId).select()

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

export async function deleteBooking(bookingId: string) {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", bookingId)

    if (error) {
      console.error("Error deleting booking:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Unexpected error in deleteBooking:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
