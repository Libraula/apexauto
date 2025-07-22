import { supabase } from "./supabase"

export interface ContactSubmission {
  id: string
  createdAt: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  inquiryType: "general" | "booking" | "franchise" | "complaint" | "compliment" | "other"
  status: "new" | "in_progress" | "resolved" | "closed"
  respondedAt?: string
  responseNotes?: string
}

export interface ContactData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  inquiryType?: ContactSubmission["inquiryType"]
}

export async function submitContactForm(
  contactData: ContactData,
): Promise<{ success: boolean; submission?: ContactSubmission; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message,
          inquiry_type: contactData.inquiryType || "general",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error submitting contact form:", error)
      return { success: false, error: error.message }
    }

    const submission: ContactSubmission = {
      id: data.id,
      createdAt: data.created_at,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      inquiryType: data.inquiry_type,
      status: data.status,
      respondedAt: data.responded_at,
      responseNotes: data.response_notes,
    }

    return { success: true, submission }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit contact form" }
  }
}

export async function getContactSubmissions(): Promise<{
  success: boolean
  submissions?: ContactSubmission[]
  error?: string
}> {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact submissions:", error)
      return { success: false, error: error.message }
    }

    const submissions: ContactSubmission[] = data.map((submission) => ({
      id: submission.id,
      createdAt: submission.created_at,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      subject: submission.subject,
      message: submission.message,
      inquiryType: submission.inquiry_type,
      status: submission.status,
      respondedAt: submission.responded_at,
      responseNotes: submission.response_notes,
    }))

    return { success: true, submissions }
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return { success: false, error: "Failed to fetch contact submissions" }
  }
}
