"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { getGalleryImages, type GalleryImage } from "@/lib/gallery-service"
import { useToast } from "@/hooks/use-toast"

export default function GalleryPage() {
  const { toast } = useToast()
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBefore, setShowBefore] = useState(true)

  const categories = ["all", "Exterior", "Interior", "Paint Protection", "Full Service"]

  useEffect(() => {
    loadGalleryImages()
  }, [])

  const loadGalleryImages = async () => {
    setLoading(true)
    try {
      const result = await getGalleryImages()
      if (result.success && result.data) {
        setGalleryImages(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load gallery images",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading gallery:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading the gallery",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === selectedCategory)

  const featuredImages = galleryImages.filter((image) => image.isFeatured)

  const openImageDialog = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    setShowBefore(true)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const currentImages = selectedCategory === "all" ? galleryImages : filteredImages
    let newIndex = currentImageIndex

    if (direction === "prev") {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1
    } else {
      newIndex = currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0
    }

    setCurrentImageIndex(newIndex)
    setSelectedImage(currentImages[newIndex])
    setShowBefore(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-primary mx-auto mb-4"></div>
          <p className="text-text-light">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-warm mb-4">Our Work Gallery</h1>
          <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
            See the incredible transformations we've achieved for our clients. Every detail matters.
          </p>
        </div>

        {/* Featured Images Section */}
        {featuredImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text-warm mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredImages.slice(0, 6).map((image, index) => (
                <Card
                  key={image.id}
                  className="bg-black-deep/50 border-red-primary/20 cursor-pointer hover:border-red-primary/40 transition-all group"
                  onClick={() => openImageDialog(image, index)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="grid grid-cols-2 h-48">
                        <div className="relative">
                          <img
                            src={image.beforeImageUrl || "/placeholder.svg?height=200&width=300"}
                            alt={`${image.title} - Before`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary" className="text-xs">
                              Before
                            </Badge>
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src={image.afterImageUrl || "/placeholder.svg?height=200&width=300"}
                            alt={`${image.title} - After`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="default" className="text-xs bg-red-primary">
                              After
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-text-warm mb-1">{image.title}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {image.category}
                      </Badge>
                      {image.description && (
                        <p className="text-sm text-text-light/70 line-clamp-2">{image.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-black-deep/50 border border-red-primary/20">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-red-primary capitalize">
                {category === "all" ? "All Work" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-light/60 text-lg">No images found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image, index) => (
                    <Card
                      key={image.id}
                      className="bg-black-deep/50 border-red-primary/20 cursor-pointer hover:border-red-primary/40 transition-all group"
                      onClick={() => openImageDialog(image, index)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <div className="grid grid-cols-2 h-40">
                            <div className="relative">
                              <img
                                src={image.beforeImageUrl || "/placeholder.svg?height=160&width=200"}
                                alt={`${image.title} - Before`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-1 left-1">
                                <Badge variant="secondary" className="text-xs">
                                  Before
                                </Badge>
                              </div>
                            </div>
                            <div className="relative">
                              <img
                                src={image.afterImageUrl || "/placeholder.svg?height=160&width=200"}
                                alt={`${image.title} - After`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-1 right-1">
                                <Badge variant="default" className="text-xs bg-red-primary">
                                  After
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {image.isFeatured && (
                            <div className="absolute top-2 right-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-text-warm text-sm mb-1 line-clamp-1">{image.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {image.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Image Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl bg-black-deep border-red-primary/20">
            <DialogHeader>
              <DialogTitle className="text-text-warm flex items-center justify-between">
                <span>{selectedImage?.title}</span>
                {selectedImage?.isFeatured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
              </DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    variant={showBefore ? "default" : "outline"}
                    onClick={() => setShowBefore(true)}
                    className={showBefore ? "bg-red-primary" : ""}
                  >
                    Before
                  </Button>
                  <Button
                    variant={!showBefore ? "default" : "outline"}
                    onClick={() => setShowBefore(false)}
                    className={!showBefore ? "bg-red-primary" : ""}
                  >
                    After
                  </Button>
                </div>

                <div className="relative">
                  <img
                    src={showBefore ? selectedImage.beforeImageUrl : selectedImage.afterImageUrl}
                    alt={`${selectedImage.title} - ${showBefore ? "Before" : "After"}`}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black-deep/80 border-red-primary/30"
                    onClick={() => navigateImage("prev")}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black-deep/80 border-red-primary/30"
                    onClick={() => navigateImage("next")}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant="outline">{selectedImage.category}</Badge>
                  <span className="text-sm text-text-light/60">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </span>
                </div>

                {selectedImage.description && <p className="text-text-light/80">{selectedImage.description}</p>}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
