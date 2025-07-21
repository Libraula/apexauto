"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = [
    { id: "all", name: "All Work", count: 24 },
    { id: "interior", name: "Interior", count: 8 },
    { id: "exterior", name: "Exterior", count: 10 },
    { id: "before-after", name: "Before & After", count: 12 },
    { id: "premium", name: "Premium Details", count: 6 },
  ]

  const galleryItems = [
    {
      id: 1,
      title: "BMW Interior Transformation",
      category: "interior",
      type: "before-after",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      description: "Complete interior detail with leather conditioning and stain removal",
    },
    {
      id: 2,
      title: "Mercedes Exterior Polish",
      category: "exterior",
      type: "single",
      image: "/placeholder.svg?height=400&width=600",
      description: "Elite detail with machine polish and ceramic coating",
    },
    {
      id: 3,
      title: "Family SUV Deep Clean",
      category: "interior",
      type: "before-after",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      description: "Premium interior package with pet hair removal and fabric protection",
    },
    {
      id: 4,
      title: "Audi Showroom Preparation",
      category: "premium",
      type: "single",
      image: "/placeholder.svg?height=400&width=600",
      description: "Complete showroom package for pre-sale preparation",
    },
    {
      id: 5,
      title: "Ute Work Vehicle Detail",
      category: "exterior",
      type: "before-after",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      description: "Heavy soil condition exterior detail with pressure washing",
    },
    {
      id: 6,
      title: "Luxury Sedan Interior",
      category: "premium",
      type: "single",
      image: "/placeholder.svg?height=400&width=600",
      description: "Elite interior detail with premium leather conditioning",
    },
    {
      id: 7,
      title: "Hatchback Paint Correction",
      category: "exterior",
      type: "before-after",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      description: "Paint correction and ceramic coating application",
    },
    {
      id: 8,
      title: "Van Commercial Detail",
      category: "exterior",
      type: "single",
      image: "/placeholder.svg?height=400&width=600",
      description: "Commercial vehicle exterior detail and protection",
    },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">Our Work Gallery</h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 lg:mb-8">
              See the incredible transformations we achieve with professional detailing. From everyday maintenance to
              showroom perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Book Your Detail</Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 lg:py-12 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                } text-sm lg:text-base`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="bg-slate-800/30 border-slate-700 overflow-hidden hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.type === "before-after" ? (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 relative">
                          <Image
                            src={item.beforeImage! || "/placeholder.svg"}
                            alt={`${item.title} - Before`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-red-600 text-white text-xs">Before</Badge>
                          </div>
                        </div>
                        <div className="w-1/2 relative">
                          <Image
                            src={item.afterImage! || "/placeholder.svg"}
                            alt={`${item.title} - After`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-600 text-white text-xs">After</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image! || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold text-sm lg:text-base mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs lg:text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3]">
                {filteredItems[selectedImage].type === "before-after" ? (
                  <div className="flex h-full">
                    <div className="w-1/2 relative">
                      <Image
                        src={filteredItems[selectedImage].beforeImage! || "/placeholder.svg"}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">Before</Badge>
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <Image
                        src={filteredItems[selectedImage].afterImage! || "/placeholder.svg"}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">After</Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={filteredItems[selectedImage].image! || "/placeholder.svg"}
                    alt={filteredItems[selectedImage].title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{filteredItems[selectedImage].title}</h3>
                <p className="text-slate-300">{filteredItems[selectedImage].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-900/20 to-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience the same incredible results for your vehicle. Book your professional detailing service today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Book Your Detail Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
