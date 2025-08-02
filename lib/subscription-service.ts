import { supabase } from "./supabase"

export interface SubscriptionPlan {
  id: string
  name: string
  description?: string
  monthlyPrice: number
  yearlyPrice: number
  savings: number
  features: string[]
  visitsPerMonth: string
  durationPerVisit: string
  warranty: string
  supportLevel: string
  isPopular: boolean
  isActive: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface CustomerSubscription {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  planId: string
  billingType: "monthly" | "yearly"
  status: "active" | "paused" | "cancelled" | "expired"
  startDate: string
  nextBillingDate: string
  serviceAddress?: string
  specialInstructions?: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionFormData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  planId: string
  billingType: "monthly" | "yearly"
  serviceAddress?: string
  specialInstructions?: string
}

export async function getSubscriptionPlans(): Promise<{ success: boolean; data?: SubscriptionPlan[]; error?: string }> {
  const { data, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching subscription plans:", error)
    return { success: false, error: error.message }
  }

  const formattedData: SubscriptionPlan[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    monthlyPrice: item.monthly_price,
    yearlyPrice: item.yearly_price,
    savings: item.savings,
    features: item.features || [],
    visitsPerMonth: item.visits_per_month,
    durationPerVisit: item.duration_per_visit,
    warranty: item.warranty,
    supportLevel: item.support_level,
    isPopular: item.is_popular,
    isActive: item.is_active,
    displayOrder: item.display_order,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))

  return { success: true, data: formattedData }
}

export async function createSubscription(subscriptionData: SubscriptionFormData) {
  try {
    const startDate = new Date()
    const nextBillingDate = new Date()

    if (subscriptionData.billingType === "monthly") {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
    } else {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
    }

    const { data, error } = await supabase
      .from("customer_subscriptions")
      .insert([
        {
          customer_name: subscriptionData.customerName,
          customer_email: subscriptionData.customerEmail,
          customer_phone: subscriptionData.customerPhone,
          plan_id: subscriptionData.planId,
          billing_type: subscriptionData.billingType,
          start_date: startDate.toISOString().split("T")[0],
          next_billing_date: nextBillingDate.toISOString().split("T")[0],
          service_address: subscriptionData.serviceAddress,
          special_instructions: subscriptionData.specialInstructions,
          status: "active",
        },
      ])
      .select()

    if (error) {
      console.error("Error creating subscription:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in createSubscription:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function getCustomerSubscriptions(): Promise<{
  success: boolean
  data?: CustomerSubscription[]
  error?: string
}> {
  const { data, error } = await supabase
    .from("customer_subscriptions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching customer subscriptions:", error)
    return { success: false, error: error.message }
  }

  const formattedData: CustomerSubscription[] = data.map((item) => ({
    id: item.id,
    customerName: item.customer_name,
    customerEmail: item.customer_email,
    customerPhone: item.customer_phone,
    planId: item.plan_id,
    billingType: item.billing_type,
    status: item.status,
    startDate: item.start_date,
    nextBillingDate: item.next_billing_date,
    serviceAddress: item.service_address,
    specialInstructions: item.special_instructions,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))

  return { success: true, data: formattedData }
}

export async function updateSubscriptionStatus(subscriptionId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("customer_subscriptions")
      .update({ status })
      .eq("id", subscriptionId)
      .select()

    if (error) {
      console.error("Error updating subscription status:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in updateSubscriptionStatus:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
