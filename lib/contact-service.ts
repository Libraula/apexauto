import { supabase } from "./supabase"

export interface ContactFormData {
  name: string
  email: string
  phone: string
  serviceInterest?: string
  message: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  serviceInterest?: string
  message: string
  status: string
  createdAt: string
}

export async function createContactSubmission(contactData: ContactFormData) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          service_interest: contactData.serviceInterest,
          message: contactData.message,
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Error creating contact submission:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in createContactSubmission:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function getContactSubmissions(): Promise<{
  success: boolean
  data?: ContactSubmission[]
  error?: string
}> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact submissions:", error)
    return { success: false, error: error.message }
  }

  const formattedData: ContactSubmission[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    serviceInterest: item.service_interest,
    message: item.message,
    status: item.status,
    createdAt: item.created_at,
  }))

  return { success: true, data: formattedData }
}

export async function updateContactStatus(contactId: string, status: string) {
  try {
    const { data, error } = await supabase.from("contact_submissions").update({ status }).eq("id", contactId).select()

    if (error) {
      console.error("Error updating contact status:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in updateContactStatus:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
