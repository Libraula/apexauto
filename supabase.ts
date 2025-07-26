import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.",
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("bookings").select("count", { count: "exact", head: true })
    if (error) {
      console.error("Supabase connection test failed:", error)
      return { success: false, error: error.message }
    }
    console.log("Supabase connection successful")
    return { success: true }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return { success: false, error: "Connection failed" }
  }
}
