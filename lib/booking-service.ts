import { supabase } from "./supabase"

export interface BookingData {
  // Customer Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Service Details
  serviceType: string
  packageName: string
  estimatedPrice?: number

  // Vehicle Information
  vehicleMake: string
  vehicleModel: string
  vehicleYear?: number
  vehicleColor?: string
  licensePlate?: string

  // Location & Scheduling
  serviceAddress: string
  suburb: string
  postcode: string
  preferredDate: string
  preferredTime: string
  alternativeDate?: string
  alternativeTime?: string

  // Additional Information
  specialRequirements?: string
  vehicleCondition?: string
  accessInstructions?: string
}

export interface Booking extends BookingData {
  id: string
  createdAt: string
  updatedAt: string
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
  paymentMethod?: string
  adminNotes?: string
  estimatedDuration?: number
  basePrice?: number
  additionalCharges?: number
  discountAmount?: number
  totalPrice?: number
}

export async function createBooking(
  bookingData: BookingData,
): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          first_name: bookingData.firstName,
          last_name: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          service_type: bookingData.serviceType,
          package_name: bookingData.packageName,
          estimated_price: bookingData.estimatedPrice,
          vehicle_make: bookingData.vehicleMake,
          vehicle_model: bookingData.vehicleModel,
          vehicle_year: bookingData.vehicleYear,
          vehicle_color: bookingData.vehicleColor,
          license_plate: bookingData.licensePlate,
          service_address: bookingData.serviceAddress,
          suburb: bookingData.suburb,
          postcode: bookingData.postcode,
          preferred_date: bookingData.preferredDate,
          preferred_time: bookingData.preferredTime,
          alternative_date: bookingData.alternativeDate,
          alternative_time: bookingData.alternativeTime,
          special_requirements: bookingData.specialRequirements,
          vehicle_condition: bookingData.vehicleCondition,
          access_instructions: bookingData.accessInstructions,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      booking: {
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        serviceType: data.service_type,
        packageName: data.package_name,
        estimatedPrice: data.estimated_price,
        vehicleMake: data.vehicle_make,
        vehicleModel: data.vehicle_model,
        vehicleYear: data.vehicle_year,
        vehicleColor: data.vehicle_color,
        licensePlate: data.license_plate,
        serviceAddress: data.service_address,
        suburb: data.suburb,
        postcode: data.postcode,
        preferredDate: data.preferred_date,
        preferredTime: data.preferred_time,
        alternativeDate: data.alternative_date,
        alternativeTime: data.alternative_time,
        specialRequirements: data.special_requirements,
        vehicleCondition: data.vehicle_condition,
        accessInstructions: data.access_instructions,
        status: data.status,
        paymentStatus: data.payment_status,
        paymentMethod: data.payment_method,
        adminNotes: data.admin_notes,
        estimatedDuration: data.estimated_duration,
        basePrice: data.base_price,
        additionalCharges: data.additional_charges,
        discountAmount: data.discount_amount,
        totalPrice: data.total_price,
      },
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, error: "Failed to create booking" }
  }
}

export async function getBookings(): Promise<{ success: boolean; bookings?: Booking[]; error?: string }> {
  try {
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookings:", error)
      return { success: false, error: error.message }
    }

    const bookings: Booking[] = data.map((booking) => ({
      id: booking.id,
      createdAt: booking.created_at,
      updatedAt: booking.updated_at,
      firstName: booking.first_name,
      lastName: booking.last_name,
      email: booking.email,
      phone: booking.phone,
      serviceType: booking.service_type,
      packageName: booking.package_name,
      estimatedPrice: booking.estimated_price,
      vehicleMake: booking.vehicle_make,
      vehicleModel: booking.vehicle_model,
      vehicleYear: booking.vehicle_year,
      vehicleColor: booking.vehicle_color,
      licensePlate: booking.license_plate,
      serviceAddress: booking.service_address,
      suburb: booking.suburb,
      postcode: booking.postcode,
      preferredDate: booking.preferred_date,
      preferredTime: booking.preferred_time,
      alternativeDate: booking.alternative_date,
      alternativeTime: booking.alternative_time,
      specialRequirements: booking.special_requirements,
      vehicleCondition: booking.vehicle_condition,
      accessInstructions: booking.access_instructions,
      status: booking.status,
      paymentStatus: booking.payment_status,
      paymentMethod: booking.payment_method,
      adminNotes: booking.admin_notes,
      estimatedDuration: booking.estimated_duration,
      basePrice: booking.base_price,
      additionalCharges: booking.additional_charges,
      discountAmount: booking.discount_amount,
      totalPrice: booking.total_price,
    }))

    return { success: true, bookings }
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return { success: false, error: "Failed to fetch bookings" }
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"],
  adminNotes?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = { status }
    if (adminNotes) {
      updateData.admin_notes = adminNotes
    }

    const { error } = await supabase.from("bookings").update(updateData).eq("id", bookingId)

    if (error) {
      console.error("Error updating booking status:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating booking status:", error)
    return { success: false, error: "Failed to update booking status" }
  }
}
