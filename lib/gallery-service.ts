import { supabase } from "./supabase"

export interface GalleryImage {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description?: string
  imageUrl: string
  thumbnailUrl?: string
  category:
    | "before_after"
    | "exterior"
    | "interior"
    | "engine_bay"
    | "wheels"
    | "paint_correction"
    | "ceramic_coating"
    | "other"
  serviceType?: string
  fileSize?: number
  fileType?: string
  width?: number
  height?: number
  isFeatured: boolean
  displayOrder: number
  isActive: boolean
  altText?: string
  tags?: string[]
  isBeforeAfter: boolean
  beforeImageUrl?: string
  afterImageUrl?: string
}

export interface GalleryImageData {
  title: string
  description?: string
  imageUrl: string
  thumbnailUrl?: string
  category: GalleryImage["category"]
  serviceType?: string
  fileSize?: number
  fileType?: string
  width?: number
  height?: number
  isFeatured?: boolean
  displayOrder?: number
  altText?: string
  tags?: string[]
  isBeforeAfter?: boolean
  beforeImageUrl?: string
  afterImageUrl?: string
}

export async function getGalleryImages(
  category?: string,
): Promise<{ success: boolean; images?: GalleryImage[]; error?: string }> {
  try {
    let query = supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching gallery images:", error)
      return { success: false, error: error.message }
    }

    const images: GalleryImage[] = data.map((image) => ({
      id: image.id,
      createdAt: image.created_at,
      updatedAt: image.updated_at,
      title: image.title,
      description: image.description,
      imageUrl: image.image_url,
      thumbnailUrl: image.thumbnail_url,
      category: image.category,
      serviceType: image.service_type,
      fileSize: image.file_size,
      fileType: image.file_type,
      width: image.width,
      height: image.height,
      isFeatured: image.is_featured,
      displayOrder: image.display_order,
      isActive: image.is_active,
      altText: image.alt_text,
      tags: image.tags,
      isBeforeAfter: image.is_before_after,
      beforeImageUrl: image.before_image_url,
      afterImageUrl: image.after_image_url,
    }))

    return { success: true, images }
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return { success: false, error: "Failed to fetch gallery images" }
  }
}

export async function getFeaturedImages(): Promise<{ success: boolean; images?: GalleryImage[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("display_order", { ascending: true })
      .limit(6)

    if (error) {
      console.error("Error fetching featured images:", error)
      return { success: false, error: error.message }
    }

    const images: GalleryImage[] = data.map((image) => ({
      id: image.id,
      createdAt: image.created_at,
      updatedAt: image.updated_at,
      title: image.title,
      description: image.description,
      imageUrl: image.image_url,
      thumbnailUrl: image.thumbnail_url,
      category: image.category,
      serviceType: image.service_type,
      fileSize: image.file_size,
      fileType: image.file_type,
      width: image.width,
      height: image.height,
      isFeatured: image.is_featured,
      displayOrder: image.display_order,
      isActive: image.is_active,
      altText: image.alt_text,
      tags: image.tags,
      isBeforeAfter: image.is_before_after,
      beforeImageUrl: image.before_image_url,
      afterImageUrl: image.after_image_url,
    }))

    return { success: true, images }
  } catch (error) {
    console.error("Error fetching featured images:", error)
    return { success: false, error: "Failed to fetch featured images" }
  }
}

export async function addGalleryImage(
  imageData: GalleryImageData,
): Promise<{ success: boolean; image?: GalleryImage; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .insert([
        {
          title: imageData.title,
          description: imageData.description,
          image_url: imageData.imageUrl,
          thumbnail_url: imageData.thumbnailUrl,
          category: imageData.category,
          service_type: imageData.serviceType,
          file_size: imageData.fileSize,
          file_type: imageData.fileType,
          width: imageData.width,
          height: imageData.height,
          is_featured: imageData.isFeatured || false,
          display_order: imageData.displayOrder || 0,
          alt_text: imageData.altText,
          tags: imageData.tags,
          is_before_after: imageData.isBeforeAfter || false,
          before_image_url: imageData.beforeImageUrl,
          after_image_url: imageData.afterImageUrl,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error adding gallery image:", error)
      return { success: false, error: error.message }
    }

    const image: GalleryImage = {
      id: data.id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      thumbnailUrl: data.thumbnail_url,
      category: data.category,
      serviceType: data.service_type,
      fileSize: data.file_size,
      fileType: data.file_type,
      width: data.width,
      height: data.height,
      isFeatured: data.is_featured,
      displayOrder: data.display_order,
      isActive: data.is_active,
      altText: data.alt_text,
      tags: data.tags,
      isBeforeAfter: data.is_before_after,
      beforeImageUrl: data.before_image_url,
      afterImageUrl: data.after_image_url,
    }

    return { success: true, image }
  } catch (error) {
    console.error("Error adding gallery image:", error)
    return { success: false, error: "Failed to add gallery image" }
  }
}

export async function uploadImageToStorage(
  file: File,
  bucket = "images",
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return { success: false, error: uploadError.message }
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return { success: true, url: data.publicUrl }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

export async function deleteGalleryImage(imageId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("gallery_images").delete().eq("id", imageId)

    if (error) {
      console.error("Error deleting gallery image:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return { success: false, error: "Failed to delete gallery image" }
  }
}
