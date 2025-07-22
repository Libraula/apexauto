import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  const services = [
    {
      name: "Essential Detail",
      price: "From $95",
      duration: "1-2 hours",
      description: "Perfect for busy lifestyles - a quick maintenance clean that keeps your car looking fresh",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Complete exterior wash and dry",
        "Wheels and rims cleaned",
        "Light interior vacuum",
        "Dashboard and console wipe-down",
        "All windows cleaned inside and out",
        "Fresh scent application",
      ],
      addOns: ["Pet Hair Removal", "Premium Air Freshener"],
      popular: false,
    },
    {
      name: "Premium Interior",
      price: "From $250",
      duration: "2-3 hours",
      description: "Deep interior reset that tackles everything from pet hair to stubborn stains",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Full vacuum including boot/trunk",
        "All trims and vents cleaned",
        "Spot cleaning and light shampooing",
        "Leather conditioning (if applicable)",
        "Interior glass cleaning",
        "Odour control treatment",
      ],
      addOns: ["Fabric Protection", "Odour Neutraliser Treatment"],
      popular: false,
    },
    {
      name: "Signature Detail",
      price: "From $290",
      duration: "3-4 hours",
      description: "Our most popular package - combines deep interior cleaning with exterior wash",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "All Premium Interior services",
        "Complete exterior wash and dry",
        "Tyre shine and dressing",
        "Wheel wells cleaned",
        "Door jambs cleaned",
        "Professional finishing touches",
      ],
      addOns: ["Pet Hair Removal", "Fabric Protection", "Premium Air Freshener"],
      popular: true,
    },
    {
      name: "Elite Detail",
      price: "From $345",
      duration: "4-5 hours",
      description: "Enhanced shine with machine polish - perfect for special occasions",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "All Signature Detail services",
        "Machine polish or wax application",
        "Trim restoration and protection",
        "Intensive stain removal",
        "Paint enhancement",
        "Premium protection coating",
      ],
      addOns: ["Headlight Restoration", "Engine Bay Clean", "Ceramic Top-Up"],
      popular: false,
    },
    {
      name: "Showroom Package",
      price: "From $395",
      duration: "5-6 hours",
      description: "Photo-ready perfection - ideal for pre-sale preparation or special events",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Complete paint enhancement",
        "Interior perfection detailing",
        "Engine bay cleaning and dressing",
        "All chrome and trim polished",
        "Photo-ready presentation",
        "Quality guarantee certificate",
      ],
      addOns: ["Steam Sanitation", "Ceramic Coating", "Paint Protection Film"],
      popular: false,
    },
  ]

  const addOnServices = [
    { name: "Pet Hair Removal", price: "$25", description: "Specialized tools and techniques for stubborn pet hair" },
    { name: "Odour Neutraliser Treatment", price: "$35", description: "Professional-grade odour elimination" },
    { name: "Fabric/Upholstery Protection", price: "$45", description: "Protective coating for seats and carpets" },
    { name: "Premium Air Freshener Upgrade", price: "$20", description: "Long-lasting premium scents" },
    { name: "Headlight Restoration", price: "$60", description: "Restore clarity to cloudy headlights" },
    { name: "Steam Sanitation", price: "$50", description: "Deep sanitization using steam technology" },
    { name: "Ceramic Top-Up", price: "$80", description: "Refresh existing ceramic coating" },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
              Professional Detailing Services
            </h1>
            <p className="text-xl text-apex-light-yellow/80 mb-8">
              From quick maintenance to showroom perfection, we have the right package for every need and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                  Book Your Service
                </Button>
              </Link>
              <Link href="/subscriptions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                >
                  View Monthly Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`bg-apex-teal-blue/20 border-apex-teal-blue overflow-hidden ${service.popular ? "ring-2 ring-apex-bright-red" : ""}`}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    {service.popular && (
                      <Badge className="absolute top-4 left-4 bg-apex-bright-red text-apex-light-yellow">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-apex-light-yellow mb-2">{service.name}</h3>
                        <p className="text-apex-light-yellow/70 mb-4">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-apex-orange-yellow">{service.price}</div>
                        <div className="flex items-center text-apex-light-yellow/70 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-apex-light-yellow font-semibold mb-3">What's Included:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-apex-light-yellow/80 text-sm">
                            <Check className="w-4 h-4 text-apex-orange-yellow mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {service.addOns.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-apex-light-yellow font-semibold mb-3">Popular Add-ons:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.addOns.map((addOn, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-apex-teal-blue text-apex-light-yellow/80"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {addOn}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link href="/book">
                      <Button className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow font-semibold">
                        Book {service.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-16 lg:py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">Add-on Services</h2>
            <p className="text-xl text-apex-light-yellow/80">
              Enhance your detailing package with these specialized services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {addOnServices.map((addOn, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-apex-light-yellow text-lg">{addOn.name}</CardTitle>
                    <div className="text-lg font-bold text-apex-orange-yellow">{addOn.price}</div>
                  </div>
                  <CardDescription className="text-apex-light-yellow/70">{addOn.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-apex-light-yellow mb-6">Pricing Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-apex-light-yellow mb-4">Vehicle Size Adjustments</h3>
                  <ul className="space-y-2 text-apex-light-yellow/80">
                    <li className="flex justify-between">
                      <span>Sedan/Hatchback</span>
                      <span>Base price</span>
                    </li>
                    <li className="flex justify-between">
                      <span>SUV</span>
                      <span>+$15</span>
                    </li>
                    <li className="flex justify-between">
                      <span>7-seater/Ute/Van</span>
                      <span>+$25</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-apex-light-yellow mb-4">Condition Surcharges</h3>
                  <ul className="space-y-2 text-apex-light-yellow/80">
                    <li className="flex justify-between">
                      <span>Light soil</span>
                      <span>No charge</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Medium soil</span>
                      <span>+$20</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Heavy soil</span>
                      <span>+$40</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-apex-teal-blue/20 to-apex-dark-orange/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
            Ready to Transform Your Car?
          </h2>
          <p className="text-xl text-apex-light-yellow/80 mb-8 max-w-2xl mx-auto">
            Book your professional detailing service today and experience the Apex difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow px-8">
                Book Your Detail Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
              >
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
