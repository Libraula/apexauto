import { supabase } from "./supabase"

export interface GalleryImageFormData {
  title: string
  description?: string
  category: string
  beforeImage: File
  afterImage: File
  isFeatured?: boolean
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  category: string
  beforeImageUrl: string
  afterImageUrl: string
  isFeatured: boolean
  displayOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export async function uploadGalleryImage(data: GalleryImageFormData) {
  try {
    // Upload before image
    const beforeFileName = `gallery/before/${Date.now()}-${data.beforeImage.name}`
    const { data: beforeUploadData, error: beforeUploadError } = await supabase.storage
      .from("images")
      .upload(beforeFileName, data.beforeImage, {
        cacheControl: "3600",
        upsert: false,
      })

    if (beforeUploadError) {
      console.error("Error uploading before image:", beforeUploadError)
      return { success: false, error: beforeUploadError.message }
    }

    const { data: beforePublicUrlData } = supabase.storage.from("images").getPublicUrl(beforeUploadData.path)

    // Upload after image
    const afterFileName = `gallery/after/${Date.now()}-${data.afterImage.name}`
    const { data: afterUploadData, error: afterUploadError } = await supabase.storage
      .from("images")
      .upload(afterFileName, data.afterImage, {
        cacheControl: "3600",
        upsert: false,
      })

    if (afterUploadError) {
      console.error("Error uploading after image:", afterUploadError)
      // Clean up before image if after image fails
      await supabase.storage.from("images").remove([beforeUploadData.path])
      return { success: false, error: afterUploadError.message }
    }

    const { data: afterPublicUrlData } = supabase.storage.from("images").getPublicUrl(afterUploadData.path)

    // Insert image metadata into database
    const { data: image, error: dbError } = await supabase
      .from("gallery_images")
      .insert({
        title: data.title,
        description: data.description,
        category: data.category,
        before_image_url: beforePublicUrlData.publicUrl,
        after_image_url: afterPublicUrlData.publicUrl,
        is_featured: data.isFeatured || false,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Error inserting image metadata:", dbError)
      // Clean up uploaded images if database insert fails
      await supabase.storage.from("images").remove([beforeUploadData.path, afterUploadData.path])
      return { success: false, error: dbError.message }
    }

    return { success: true, data: image }
  } catch (error: any) {
    console.error("Unexpected error in uploadGalleryImage:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function getGalleryImages(): Promise<{ success: boolean; data?: GalleryImage[]; error?: string }> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching gallery images:", error)
    return { success: false, error: error.message }
  }

  const formattedData: GalleryImage[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    beforeImageUrl: item.before_image_url,
    afterImageUrl: item.after_image_url,
    isFeatured: item.is_featured,
    displayOrder: item.display_order,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))

  return { success: true, data: formattedData }
}

export async function updateGalleryImage(imageId: string, updates: Partial<GalleryImage>) {
  try {
    const updateData: any = {}

    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.category !== undefined) updateData.category = updates.category
    if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured
    if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive

    const { data, error } = await supabase.from("gallery_images").update(updateData).eq("id", imageId).select()

    if (error) {
      console.error("Error updating gallery image:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error: any) {
    console.error("Unexpected error in updateGalleryImage:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function deleteGalleryImage(imageId: string) {
  try {
    // First get the image data to get the file paths
    const { data: imageData, error: fetchError } = await supabase
      .from("gallery_images")
      .select("before_image_url, after_image_url")
      .eq("id", imageId)
      .single()

    if (fetchError) {
      console.error("Error fetching image data:", fetchError)
      return { success: false, error: fetchError.message }
    }

    // Delete from database first
    const { error: dbError } = await supabase.from("gallery_images").delete().eq("id", imageId)

    if (dbError) {
      console.error("Error deleting from database:", dbError)
      return { success: false, error: dbError.message }
    }

    // Extract file paths from URLs and delete from storage
    if (imageData.before_image_url && imageData.after_image_url) {
      const beforePath = imageData.before_image_url.split("/").pop()
      const afterPath = imageData.after_image_url.split("/").pop()

      if (beforePath && afterPath) {
        await supabase.storage.from("images").remove([`gallery/before/${beforePath}`, `gallery/after/${afterPath}`])
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Unexpected error in deleteGalleryImage:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}
