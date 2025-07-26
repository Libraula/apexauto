"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Sparkles, Shield, Zap, Clock, CheckCircle, Star, Truck, Home, Building } from "lucide-react"

const serviceCategories = [
  {
    id: "exterior",
    name: "Exterior Services",
    icon: Car,
    description: "Complete exterior transformation and protection",
    services: [
      {
        name: "Premium Wash & Wax",
        price: "From $89",
        duration: "2-3 hours",
        description: "Hand wash, clay bar treatment, and premium wax application",
        features: ["Hand wash", "Clay bar treatment", "Premium wax", "Tire shine", "Window cleaning"],
        popular: false,
      },
      {
        name: "Paint Correction",
        price: "From $299",
        duration: "4-6 hours",
        description: "Multi-stage paint correction to remove swirl marks and scratches",
        features: [
          "Paint assessment",
          "Multi-stage polishing",
          "Swirl mark removal",
          "Scratch removal",
          "Paint protection",
        ],
        popular: true,
      },
      {
        name: "Ceramic Coating",
        price: "From $599",
        duration: "6-8 hours",
        description: "Long-lasting ceramic protection with 2-5 year warranty",
        features: [
          "Paint correction prep",
          "Ceramic coating application",
          "2-5 year warranty",
          "Hydrophobic protection",
          "UV protection",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "interior",
    name: "Interior Services",
    icon: Sparkles,
    description: "Deep cleaning and protection for your vehicle's interior",
    services: [
      {
        name: "Interior Detail",
        price: "From $149",
        duration: "2-3 hours",
        description: "Complete interior cleaning and conditioning",
        features: [
          "Vacuum all surfaces",
          "Leather conditioning",
          "Fabric protection",
          "Dashboard treatment",
          "Window cleaning",
        ],
        popular: false,
      },
      {
        name: "Deep Interior Clean",
        price: "From $249",
        duration: "3-4 hours",
        description: "Intensive deep cleaning for heavily soiled interiors",
        features: ["Steam cleaning", "Stain removal", "Odor elimination", "Deep vacuum", "Sanitization"],
        popular: true,
      },
      {
        name: "Leather Restoration",
        price: "From $199",
        duration: "2-3 hours",
        description: "Professional leather cleaning, conditioning, and repair",
        features: [
          "Leather cleaning",
          "Conditioning treatment",
          "Minor repair",
          "Color restoration",
          "Protection coating",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "protection",
    name: "Protection Services",
    icon: Shield,
    description: "Advanced protection solutions for your investment",
    services: [
      {
        name: "Paint Protection Film",
        price: "From $899",
        duration: "Full day",
        description: "Invisible protection film for high-impact areas",
        features: [
          "Self-healing film",
          "10-year warranty",
          "Custom cut",
          "Professional installation",
          "Maintenance kit",
        ],
        popular: false,
      },
      {
        name: "Window Tinting",
        price: "From $299",
        duration: "3-4 hours",
        description: "Premium window tinting for comfort and protection",
        features: [
          "UV protection",
          "Heat reduction",
          "Privacy enhancement",
          "Lifetime warranty",
          "Professional installation",
        ],
        popular: true,
      },
      {
        name: "Undercarriage Protection",
        price: "From $199",
        duration: "2-3 hours",
        description: "Protective coating for undercarriage components",
        features: [
          "Rust prevention",
          "Corrosion protection",
          "Salt damage prevention",
          "Pressure wash safe",
          "Annual reapplication",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "specialty",
    name: "Specialty Services",
    icon: Zap,
    description: "Specialized services for unique needs",
    services: [
      {
        name: "Headlight Restoration",
        price: "From $99",
        duration: "1-2 hours",
        description: "Restore clarity and brightness to foggy headlights",
        features: ["Oxidation removal", "Polishing", "UV protection", "Improved visibility", "Like-new appearance"],
        popular: false,
      },
      {
        name: "Engine Bay Detailing",
        price: "From $149",
        duration: "2-3 hours",
        description: "Professional engine bay cleaning and dressing",
        features: [
          "Degreasing",
          "Pressure washing",
          "Component protection",
          "Dressing application",
          "Inspection included",
        ],
        popular: false,
      },
      {
        name: "Odor Elimination",
        price: "From $199",
        duration: "4-6 hours",
        description: "Complete odor removal using ozone treatment",
        features: ["Ozone treatment", "Deep cleaning", "Sanitization", "Air freshening", "Guarantee included"],
        popular: true,
      },
    ],
  },
]

const addOnServices = [
  { name: "Express Wax", price: "$29", description: "Quick wax application for existing customers" },
  { name: "Tire Shine", price: "$19", description: "Premium tire dressing for lasting shine" },
  { name: "Air Freshener", price: "$15", description: "Long-lasting premium air freshener" },
  { name: "Rain-X Treatment", price: "$39", description: "Water repellent treatment for windows" },
  { name: "Fabric Protection", price: "$49", description: "Scotchgard protection for upholstery" },
  { name: "Pet Hair Removal", price: "$39", description: "Specialized pet hair removal service" },
]

const serviceLocations = [
  {
    type: "Mobile Service",
    icon: Truck,
    description: "We come to you - home, office, or anywhere convenient",
    features: [
      "Fully equipped mobile unit",
      "Water and power self-sufficient",
      "Same quality as shop service",
      "Convenient scheduling",
    ],
    surcharge: "$25 service call fee",
  },
  {
    type: "Shop Service",
    icon: Building,
    description: "Premium facility with controlled environment",
    features: ["Climate controlled", "Advanced equipment", "Comfortable waiting area", "Complimentary beverages"],
    surcharge: "No additional fees",
  },
  {
    type: "Home Service",
    icon: Home,
    description: "Premium at-home service with full setup",
    features: ["Complete mobile setup", "Professional equipment", "Driveway or garage service", "Flexible scheduling"],
    surcharge: "$35 premium service fee",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <Car className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Premium Car Detailing Services</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto">
            Transform your vehicle with our comprehensive range of professional detailing services. From basic
            maintenance to complete restoration, we deliver exceptional results every time.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="exterior" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-black-deep/50 border border-red-primary/20">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-red-primary data-[state=active]:text-text-warm"
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-warm mb-4">{category.name}</h2>
                  <p className="text-lg text-text-light/70 max-w-2xl mx-auto">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, index) => (
                    <Card
                      key={index}
                      className="bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 relative"
                    >
                      {service.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-red-primary hover:bg-red-secondary">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="text-text-warm flex items-center justify-between">
                          <span>{service.name}</span>
                          <span className="text-red-primary text-lg">{service.price}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-text-light/60">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-text-light/70 mb-4">{service.description}</p>
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-red-primary" />
                              <span className="text-sm text-text-light/80">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-red-primary hover:bg-red-secondary text-text-warm">
                          Book This Service
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-16 px-4 bg-black-deep/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Add-On Services</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Enhance your detailing service with these popular add-ons for the complete treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOnServices.map((addon, index) => (
              <Card
                key={index}
                className="bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-text-warm">{addon.name}</h3>
                    <span className="text-red-primary font-bold">{addon.price}</span>
                  </div>
                  <p className="text-text-light/70 text-sm mb-4">{addon.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
                  >
                    Add to Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Service Locations</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Choose the service option that works best for you. We offer flexible solutions to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceLocations.map((location, index) => (
              <Card key={index} className="bg-black-deep/50 border-red-primary/20 text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-primary/20 rounded-full mb-4 mx-auto">
                    <location.icon className="w-6 h-6 text-red-primary" />
                  </div>
                  <CardTitle className="text-text-warm">{location.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-light/70 mb-6">{location.description}</p>
                  <div className="space-y-3 mb-6">
                    {location.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-red-primary" />
                        <span className="text-text-light/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-red-primary font-medium mb-4">{location.surcharge}</div>
                  <Button
                    variant="outline"
                    className="w-full border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
                  >
                    Select This Option
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-primary/20 to-red-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-lg text-text-light/80 max-w-2xl mx-auto mb-8">
            Book your premium car detailing service today and experience the Apex difference. Professional results,
            guaranteed satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-primary hover:bg-red-secondary text-text-warm">
              Book Service Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
