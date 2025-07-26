import { supabase } from "./supabase"

export interface GalleryImageFormData {
  title: string
  description?: string
  category: string
  beforeImage: File
  afterImage: File
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  category: string
  beforeImageUrl: string
  afterImageUrl: string
  createdAt: string
}

export async function uploadGalleryImage(data: GalleryImageFormData) {
  try {
    // Upload before image
    const beforeFileName = `before/${Date.now()}-${data.beforeImage.name}`
    const { data: beforeUploadData, error: beforeUploadError } = await supabase.storage
      .from("gallery-images")
      .upload(beforeFileName, data.beforeImage, {
        cacheControl: "3600",
        upsert: false,
      })

    if (beforeUploadError) {
      console.error("Error uploading before image:", beforeUploadError)
      return { success: false, error: beforeUploadError.message }
    }

    const { data: beforePublicUrlData } = supabase.storage.from("gallery-images").getPublicUrl(beforeUploadData.path)

    // Upload after image
    const afterFileName = `after/${Date.now()}-${data.afterImage.name}`
    const { data: afterUploadData, error: afterUploadError } = await supabase.storage
      .from("gallery-images")
      .upload(afterFileName, data.afterImage, {
        cacheControl: "3600",
        upsert: false,
      })

    if (afterUploadError) {
      console.error("Error uploading after image:", afterUploadError)
      // Clean up before image if after image fails
      await supabase.storage.from("gallery-images").remove([beforeUploadData.path])
      return { success: false, error: afterUploadError.message }
    }

    const { data: afterPublicUrlData } = supabase.storage.from("gallery-images").getPublicUrl(afterUploadData.path)

    // Insert image metadata into database
    const { data: image, error: dbError } = await supabase
      .from("gallery_images")
      .insert({
        title: data.title,
        description: data.description,
        category: data.category,
        before_image_url: beforePublicUrlData.publicUrl,
        after_image_url: afterPublicUrlData.publicUrl,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Error inserting image metadata:", dbError)
      // Clean up uploaded images if database insert fails
      await supabase.storage.from("gallery-images").remove([beforeUploadData.path, afterUploadData.path])
      return { success: false, error: dbError.message }
    }

    return { success: true, data: image }
  } catch (error: any) {
    console.error("Unexpected error in uploadGalleryImage:", error)
    return { success: false, error: error.message || "An unexpected error occurred." }
  }
}

export async function getGalleryImages(): Promise<{ success: boolean; data?: GalleryImage[]; error?: string }> {
  const { data, error } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

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
    createdAt: item.created_at,
  }))

  return { success: true, data: formattedData }
}
