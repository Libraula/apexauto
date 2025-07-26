"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Shield, Car, Sparkles, Zap, Award, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "custom-detail",
      title: "Custom Detail",
      price: "From $95",
      duration: "1-2 hours",
      description: "Perfect for regular upkeep and maintenance",
      icon: Car,
      features: [
        "Exterior hand wash",
        "Wheel & tire clean + shine",
        "Windows cleaned",
        "Interior wipe-down",
        "Light vacuum (mats & seats)",
      ],
      perfect: "Perfect for regular upkeep",
      popular: true,
    },
    {
      id: "interior-detail",
      title: "Interior Detail",
      price: "From $250",
      duration: "3-4 hours",
      description: "Showroom-level interior finish",
      icon: Sparkles,
      features: [
        "Deep vacuum (seats, carpets, boot)",
        "Seats & carpet shampooed (if required)",
        "Leather cleaned & conditioned",
        "Dashboard, console, vents cleaned",
        "Streak-free interior glass",
        "Premium scent / deodoriser spray",
      ],
      perfect: "Showroom-level interior finish",
      popular: false,
    },
    {
      id: "full-detail",
      title: "Full Detail",
      price: "From $345",
      duration: "4-6 hours",
      description: "Best for full restoration or events",
      icon: Award,
      features: [
        "Complete interior detail (see above)",
        "Exterior hand wash + clay bar",
        "Polishing & wax/sealant protection",
        "Wheels, trims, badges detailed",
      ],
      perfect: "Best for full restoration or events",
      popular: false,
    },
    {
      id: "pre-sale-detail",
      title: "Pre-Sale Detail",
      price: "From $395",
      duration: "5-7 hours",
      description: "Get top dollar when selling your car",
      icon: Zap,
      features: ["Full detail package", "Engine bay clean", "Paint enhancement", "Odour neutraliser"],
      perfect: "Get top dollar when selling your car",
      popular: false,
    },
  ]

  const addOns = [
    { name: "Engine Bay Cleaning", price: "$49", description: "Deep cleaning and protection" },
    { name: "Pet Hair Removal", price: "$39", description: "Specialized removal techniques" },
    { name: "Odour Elimination", price: "$59", description: "Professional ozone treatment" },
    { name: "Scratch Repair", price: "$79", description: "Minor scratch correction" },
    { name: "Headlight Restoration", price: "$89", description: "Restore clarity and brightness" },
    { name: "Paint Protection", price: "$149", description: "Ceramic coating application" },
  ]

  return (
    <div className="min-h-screen bg-black-rich">
      <Navigation />

      {/* Hero Section */}
      <section className="premium-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Truck className="h-8 w-8 text-red-primary" />
            <Badge className="bg-red-primary/20 text-red-primary border-red-primary/30 px-4 py-2">
              Mobile Car Detailing Services
            </Badge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-warm mb-6">
            Apex Auto Detailers
            <span className="text-red-primary block">Mobile Car Detailing</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <MapPin className="h-6 w-6 text-accent-gold" />
            <p className="text-xl text-text-light/80">We come to you – Sunshine Coast & surrounds</p>
          </div>
          <p className="text-lg text-text-light/70 max-w-3xl mx-auto mb-8">
            Professional mobile car detailing services brought directly to your location. Experience premium quality
            without leaving your home or office.
          </p>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-accent-gold" />
              <span className="text-text-light/70">Fully Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-accent-gold fill-current" />
              <span className="text-text-light/70">5-Star Rated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent-gold" />
              <span className="text-text-light/70">Flexible Scheduling</span>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-red-primary hover:bg-red-secondary text-text-warm font-semibold px-8 py-4"
          >
            <Link href="/book">Book Service</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-24 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">Our Services</h2>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Professional mobile car detailing services tailored to your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={`premium-card border-red-primary/20 hover:border-red-primary/40 transition-all duration-500 overflow-hidden group ${
                  service.popular ? "ring-2 ring-red-primary/50" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-red-primary hover:bg-red-secondary z-10">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=${service.title}`}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-rich/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-primary/90 text-text-warm font-semibold backdrop-blur-sm">
                      {service.price}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-red-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <service.icon className="w-6 h-6 text-red-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-accent-gold/90 text-black-rich font-semibold backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.duration}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-text-warm mb-3">{service.title}</h3>
                  <p className="text-text-light/70 mb-6 leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-text-warm mb-4">What's Included:</h4>
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-red-primary flex-shrink-0 mt-0.5" />
                          <span className="text-text-light/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-red-primary/10 rounded-lg border border-red-primary/30">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-red-primary" />
                      <span className="text-red-primary font-medium">{service.perfect}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      className="bg-red-primary hover:bg-red-secondary text-text-warm font-semibold flex-1"
                    >
                      <Link href="/book">Book This Service</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black-rich bg-transparent"
                    >
                      <Link href="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-20 lg:py-24 bg-black-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-6">Add-On Services</h2>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Enhance any service with these popular premium add-ons for the complete detailing experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <Card
                key={index}
                className="premium-card border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-warm mb-2">{addon.name}</h3>
                      <p className="text-text-light/70 text-sm">{addon.description}</p>
                    </div>
                    <Badge className="bg-accent-gold/20 text-accent-gold border-accent-gold/30 font-bold">
                      {addon.price}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-red-primary/50 text-red-primary hover:bg-red-primary hover:text-text-warm bg-transparent group-hover:border-red-primary transition-colors"
                  >
                    Add to Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Service Benefits */}
      <section className="py-20 lg:py-24 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-6">Why Choose Mobile Detailing?</h2>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Experience the convenience of professional car detailing at your location
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "We Come to You",
                description: "No need to travel - we bring our professional equipment to your location",
                icon: Truck,
              },
              {
                title: "Save Time",
                description: "Continue with your day while we detail your car at home or work",
                icon: Clock,
              },
              {
                title: "Professional Results",
                description: "Same quality as traditional detailing shops with added convenience",
                icon: Award,
              },
              {
                title: "Sunshine Coast Coverage",
                description: "Servicing Sunshine Coast and surrounding areas with reliable scheduling",
                icon: MapPin,
              },
            ].map((benefit, index) => (
              <Card key={index} className="premium-card border-red-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-warm mb-2">{benefit.title}</h3>
                  <p className="text-text-light/70">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 premium-red-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-6">Ready to Book Your Mobile Detail?</h2>
          <p className="text-xl text-text-light/90 mb-8 max-w-3xl mx-auto">
            Choose from our premium mobile detailing services and experience the difference that professional care
            makes. We bring the showroom to you across the Sunshine Coast and surrounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-text-warm text-black-rich hover:bg-text-light font-semibold px-8 py-4"
            >
              <Link href="/book">Book Service Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-text-warm text-text-warm hover:bg-text-warm hover:text-black-rich px-8 py-4 bg-transparent"
            >
              <Link href="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
