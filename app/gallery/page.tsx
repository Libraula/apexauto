"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import { getGalleryImages, type GalleryImage } from "@/lib/gallery-service"

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-apex-dark-blue">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-apex-light-grey">Loading gallery...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-apex-dark-blue via-apex-teal-blue to-apex-dark-blue">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-grey mb-4 lg:mb-6">
            Our Work Gallery
          </h1>
          <p className="text-lg sm:text-xl text-apex-light-grey/80 mb-6 lg:mb-8">
            See the incredible transformations we achieve with our professional detailing services. Every car tells a
            story of excellence.
          </p>
        </div>
      </section>

      {/* Filters and View Controls */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-apex-light-grey" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-apex-teal-blue/20 border-apex-teal-blue text-apex-light-grey">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-apex-light-grey">
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
                    ? "bg-apex-red text-apex-light-grey"
                    : "border-apex-teal-blue text-apex-light-grey hover:bg-apex-teal-blue/20 bg-transparent"
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
                    ? "bg-apex-red text-apex-light-grey"
                    : "border-apex-teal-blue text-apex-light-grey hover:bg-apex-teal-blue/20 bg-transparent"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-apex-light-grey/70 text-lg">No images found for the selected category.</p>
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
                            src={
                              image.beforeImageUrl || "/placeholder.svg?height=300&width=400&query=car before detail"
                            }
                            alt={`${image.title} - Before`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-apex-orange text-apex-light-grey">Before</Badge>
                        </div>
                      </div>

                      {/* After Image */}
                      <div>
                        <div className="relative aspect-video mb-2">
                          <Image
                            src={image.afterImageUrl || "/placeholder.svg?height=300&width=400&query=car after detail"}
                            alt={`${image.title} - After`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-apex-red text-apex-light-grey">After</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-apex-light-grey">{image.title}</h3>
                        <Badge variant="outline" className="border-apex-teal-blue text-apex-light-grey/80">
                          {categories.find((cat) => cat.value === image.category)?.label || image.category}
                        </Badge>
                      </div>
                      {image.description && <p className="text-apex-light-grey/70 text-sm">{image.description}</p>}
                      <p className="text-apex-light-grey/50 text-xs mt-2">
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
