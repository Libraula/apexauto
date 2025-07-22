"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import { getGalleryImages, uploadGalleryImage, type GalleryImage } from "@/lib/gallery-service"

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const { toast } = useToast()

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "",
    beforeImage: null as File | null,
    afterImage: null as File | null,
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "exterior", label: "Exterior Details" },
    { value: "interior", label: "Interior Details" },
    { value: "engine", label: "Engine Bay" },
    { value: "wheels", label: "Wheels & Tires" },
    { value: "paint", label: "Paint Correction" },
    { value: "ceramic", label: "Ceramic Coating" },
  ]

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter((img) => img.category === selectedCategory))
    }
  }, [images, selectedCategory])

  const loadImages = async () => {
    try {
      const result = await getGalleryImages()
      if (result.success && result.data) {
        setImages(result.data)
      }
    } catch (error) {
      toast({
        title: "Failed to Load Images",
        description: "Unable to load gallery images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (field: "beforeImage" | "afterImage", file: File | null) => {
    setUploadForm((prev) => ({ ...prev, [field]: file }))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.beforeImage || !uploadForm.afterImage) {
      toast({
        title: "Missing Images",
        description: "Please select both before and after images.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const result = await uploadGalleryImage({
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
        beforeImage: uploadForm.beforeImage,
        afterImage: uploadForm.afterImage,
      })

      if (result.success) {
        toast({
          title: "Images Uploaded!",
          description: "Your before/after images have been added to the gallery.",
        })
        setUploadForm({
          title: "",
          description: "",
          category: "",
          beforeImage: null,
          afterImage: null,
        })
        setShowUploadForm(false)
        loadImages()
      } else {
        toast({
          title: "Upload Failed",
          description: result.error || "Failed to upload images. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-apex-dark-blue">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-apex-light-yellow">Loading gallery...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4 lg:mb-6">
              Our Work Gallery
            </h1>
            <p className="text-lg sm:text-xl text-apex-light-yellow/80 mb-6 lg:mb-8">
              See the incredible transformations we achieve with our professional detailing services. Every car tells a
              story of excellence.
            </p>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your Results
            </Button>
          </div>
        </div>
      </section>

      {/* Upload Form */}
      {showUploadForm && (
        <section className="py-8 bg-apex-light-yellow/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-apex-light-yellow mb-6">Upload Before/After Images</h2>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-apex-light-yellow mb-2 block">Title *</Label>
                      <Input
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                        placeholder="e.g., BMW Interior Detail"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label className="text-apex-light-yellow mb-2 block">Category *</Label>
                      <Select
                        value={uploadForm.category}
                        onValueChange={(value) => setUploadForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                          {categories.slice(1).map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-apex-light-yellow">
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-apex-light-yellow mb-2 block">Description</Label>
                    <Input
                      className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                      placeholder="Brief description of the work done"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-apex-light-yellow mb-2 block">Before Image *</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow file:bg-apex-bright-red file:text-apex-light-yellow file:border-0 file:rounded file:px-3 file:py-1"
                        onChange={(e) => handleFileChange("beforeImage", e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Label className="text-apex-light-yellow mb-2 block">After Image *</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow file:bg-apex-bright-red file:text-apex-light-yellow file:border-0 file:rounded file:px-3 file:py-1"
                        onChange={(e) => handleFileChange("afterImage", e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                    >
                      {isUploading ? "Uploading..." : "Upload Images"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowUploadForm(false)}
                      className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Filters and View Controls */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-apex-light-yellow" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-apex-teal-blue/20 border-apex-teal-blue text-apex-light-yellow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-apex-light-yellow">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-apex-bright-red text-apex-light-yellow"
                    : "border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                }
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-apex-bright-red text-apex-light-yellow"
                    : "border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-apex-light-yellow/70 text-lg">No images found for the selected category.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}>
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={`bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300 ${
                    viewMode === "list" ? "max-w-4xl mx-auto" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className={viewMode === "list" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                      {/* Before Image */}
                      <div>
                        <div className="relative aspect-video mb-2">
                          <Image
                            src={image.beforeImageUrl || "/placeholder.svg?height=300&width=400"}
                            alt={`${image.title} - Before`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-apex-dark-orange text-apex-light-yellow">
                            Before
                          </Badge>
                        </div>
                      </div>

                      {/* After Image */}
                      <div>
                        <div className="relative aspect-video mb-2">
                          <Image
                            src={image.afterImageUrl || "/placeholder.svg?height=300&width=400"}
                            alt={`${image.title} - After`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-apex-bright-red text-apex-light-yellow">
                            After
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-apex-light-yellow">{image.title}</h3>
                        <Badge variant="outline" className="border-apex-teal-blue text-apex-light-yellow/80">
                          {categories.find((cat) => cat.value === image.category)?.label || image.category}
                        </Badge>
                      </div>
                      {image.description && <p className="text-apex-light-yellow/70 text-sm">{image.description}</p>}
                      <p className="text-apex-light-yellow/50 text-xs mt-2">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
