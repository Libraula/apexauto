"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Camera, Grid, List, Calendar } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  title: string
  category: string
  beforeImage: string
  afterImage: string
  description: string
  createdAt: string
}

const mockImages: GalleryImage[] = [
  {
    id: "1",
    title: "Luxury Sedan Full Detail",
    category: "Exterior",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    description: "Complete exterior transformation with paint correction and ceramic coating",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "SUV Interior Deep Clean",
    category: "Interior",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    description: "Deep interior cleaning with leather conditioning and fabric protection",
    createdAt: "2025-01-12",
  },
  {
    id: "3",
    title: "Sports Car Paint Correction",
    category: "Paint Protection",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    description: "Multi-stage paint correction removing swirl marks and scratches",
    createdAt: "2025-01-10",
  },
  {
    id: "4",
    title: "Classic Car Restoration Detail",
    category: "Full Service",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    description: "Complete restoration detailing bringing classic beauty back to life",
    createdAt: "2025-01-08",
  },
]

const categories = ["All", "Exterior", "Interior", "Paint Protection", "Full Service"]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Simulate API call
    const fetchImages = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setImages(mockImages)
      setFilteredImages(mockImages)
      setLoading(false)
    }

    fetchImages()
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter((image) => image.category === selectedCategory))
    }
  }, [selectedCategory, images])

  const handleImageLoad = (imageId: string, type: "before" | "after") => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [`${imageId}-${type}`]: false,
    }))
  }

  const handleImageLoadStart = (imageId: string, type: "before" | "after") => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [`${imageId}-${type}`]: true,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <Camera className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Our Work Gallery</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto">
            Witness the transformation. Browse through our portfolio of premium car detailing work and see the
            difference our expertise makes.
          </p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 px-4 border-b border-red-primary/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] bg-black-deep border-red-primary/30 text-text-light">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black-deep border-red-primary/30">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-text-light hover:bg-red-primary/20">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-text-light/60">
                {filteredImages.length} {filteredImages.length === 1 ? "result" : "results"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-red-primary hover:bg-red-secondary"
                    : "border-red-primary/30 text-text-light hover:bg-red-primary/20"
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
                    ? "bg-red-primary hover:bg-red-secondary"
                    : "border-red-primary/30 text-text-light hover:bg-red-primary/20"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-black-deep/50 border-red-primary/20">
                  <CardContent className="p-6">
                    <div className="flex gap-4 mb-4">
                      <Skeleton className="h-48 flex-1 bg-neutral-warm/20" />
                      <Skeleton className="h-48 flex-1 bg-neutral-warm/20" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2 bg-neutral-warm/20" />
                    <Skeleton className="h-4 w-full mb-2 bg-neutral-warm/20" />
                    <Skeleton className="h-4 w-1/2 bg-neutral-warm/20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-red-primary/50 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-text-warm mb-2">No images found</h3>
              <p className="text-text-light/60">
                No images match the selected category. Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-medium text-text-light/60">Before</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          {imageLoadingStates[`${image.id}-before`] && (
                            <Skeleton className="absolute inset-0 bg-neutral-warm/20" />
                          )}
                          <Image
                            src={image.beforeImage || "/placeholder.svg"}
                            alt={`${image.title} - Before`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onLoadStart={() => handleImageLoadStart(image.id, "before")}
                            onLoad={() => handleImageLoad(image.id, "before")}
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-medium text-text-light/60">After</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          {imageLoadingStates[`${image.id}-after`] && (
                            <Skeleton className="absolute inset-0 bg-neutral-warm/20" />
                          )}
                          <Image
                            src={image.afterImage || "/placeholder.svg"}
                            alt={`${image.title} - After`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onLoadStart={() => handleImageLoadStart(image.id, "after")}
                            onLoad={() => handleImageLoad(image.id, "after")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-text-warm">{image.title}</h3>
                        <Badge variant="secondary" className="bg-red-primary/20 text-red-primary border-red-primary/30">
                          {image.category}
                        </Badge>
                      </div>
                      <p className="text-text-light/70">{image.description}</p>
                      <div className="flex items-center text-sm text-text-light/50">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(image.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
