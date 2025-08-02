import { supabase } from "./supabase"

export interface HomeContent {
  id: string
  contentType: "hero_image" | "service_image" | "testimonial_image" | "about_image"
  title?: string
  description?: string
  imageUrl?: string
  altText?: string
  isActive: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface HomeContentFormData {
  contentType: "hero_image" | "service_image" | "testimonial_image" | "about_image"
  title?: string
  description?: string
  image?: File
  altText?: string
  isActive?: boolean
  displayOrder?: number
}

export async function getHomeContent(): Promise<{ success: boolean; data?: HomeContent[]; error?: string }> {
  const { data, error } = await supabase
    .from("home_content")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching home content:", error)
    return { success: false, error: error.message }
  }

  const formattedData: HomeContent[] = data.map((item) => ({
    id: item.id,
    contentType: item.content_type,
    title: item.title,
    description: item.description,
    imageUrl: item.image_url,
    altText: item.alt_text,
    isActive: item.is_active,
    displayOrder: item.display_order,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))

  return { success: true, data: formattedData }
}

export async function uploadHomeContent(data: HomeContentFormData) {
  try {
    let imageUrl = undefined

    // Upload image if provided
    if (data.image) {
      const fileName = `home/${data.contentType}/${Date.now()}-${data.image.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, data.image, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return { success: false, error: uploadError.message }
      }

      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(uploadData.path)
      imageUrl = publicUrlData.publicUrl
    }

    // Insert content into database
    const { data: content, error: dbError } = await supabase
      .from("home_content")
      .insert({
        content_type: data.contentType,
        title: data.title,
        description: data.description,
        image_url: imageUrl,
        alt_text: data.altText,
        is_active: data.isActive !== undefined ? data.isActive : true,
        display_order: data.displayOrder || 0,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Error inserting home content:", dbError)
      // Clean up uploaded image if database insert fails
      if (imageUrl) {
        const fileName = imageUrl.split("/").pop()
        if (fileName) {
          await supabase.storage.from("images").remove([`home/${data.contentType}/${fileName}`])
        }
      }
      return { success: false, error: dbError.message }
    }

    return { success: true, data: content }
  } catch (error: any) {
    console.error("Unexpected error in uploadHomeContent:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function updateHomeContent(contentId: string, updates: Partial<HomeContent>) {
  try {
    const updateData: any = {}

    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.altText !== undefined) updateData.alt_text = updates.altText
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive
    if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder

    const { data, error } = await supabase.from("home_content").update(updateData).eq("id", contentId).select()

    if (error) {
      console.error("Error updating home content:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in updateHomeContent:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function deleteHomeContent(contentId: string) {
  try {
    // First get the content data to get the image URL
    const { data: contentData, error: fetchError } = await supabase
      .from("home_content")
      .select("image_url, content_type")
      .eq("id", contentId)
      .single()

    if (fetchError) {
      console.error("Error fetching content data:", fetchError)
      return { success: false, error: fetchError.message }
    }

    // Delete from database first
    const { error: dbError } = await supabase.from("home_content").delete().eq("id", contentId)

    if (dbError) {
      console.error("Error deleting from database:", dbError)
      return { success: false, error: dbError.message }
    }

    // Delete image from storage if it exists
    if (contentData.image_url) {
      const fileName = contentData.image_url.split("/").pop()
      if (fileName) {
        await supabase.storage.from("images").remove([`home/${contentData.content_type}/${fileName}`])
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Unexpected error in deleteHomeContent:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
