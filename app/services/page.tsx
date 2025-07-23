import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Car, Sparkles, Droplets, Shield, Zap, Gem } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Basic Exterior Detail",
      price: "$89",
      duration: "2-3 hours",
      description: "Essential exterior cleaning and protection for your vehicle",
      features: [
        "Hand wash with premium soap",
        "Wheel and tire cleaning",
        "Window cleaning (exterior)",
        "Quick wax application",
        "Tire shine treatment",
        "Door jamb cleaning",
      ],
      icon: Car,
      popular: false,
    },
    {
      title: "Premium Interior Detail",
      price: "$79",
      duration: "2-3 hours",
      description: "Deep interior cleaning and conditioning service",
      features: [
        "Complete vacuum (seats, carpets, trunk)",
        "Steam cleaning of surfaces",
        "Leather conditioning",
        "Dashboard and console protection",
        "Window cleaning (interior)",
        "Air freshener treatment",
      ],
      icon: Sparkles,
      popular: false,
    },
    {
      title: "Full Detail Package",
      price: "$149",
      duration: "4-5 hours",
      description: "Complete interior and exterior detailing service",
      features: [
        "Everything from Basic & Premium",
        "Clay bar treatment",
        "Paint correction (minor scratches)",
        "Premium wax protection",
        "Engine bay cleaning",
        "Headlight restoration",
      ],
      icon: Droplets,
      popular: true,
    },
    {
      title: "Paint Correction",
      price: "$199",
      duration: "5-6 hours",
      description: "Professional paint correction and restoration",
      features: [
        "Multi-stage paint correction",
        "Swirl mark removal",
        "Scratch removal (moderate)",
        "Paint depth measurement",
        "High-grade polish application",
        "Paint protection sealant",
      ],
      icon: Shield,
      popular: false,
    },
    {
      title: "Ceramic Coating",
      price: "$299",
      duration: "6-8 hours",
      description: "Long-lasting ceramic protection for your paint",
      features: [
        "Paint correction preparation",
        "Professional ceramic coating",
        "2-year protection guarantee",
        "Hydrophobic properties",
        "UV protection",
        "Enhanced gloss and depth",
      ],
      icon: Gem,
      popular: false,
    },
    {
      title: "Express Detail",
      price: "$59",
      duration: "1-2 hours",
      description: "Quick refresh for busy schedules",
      features: [
        "Exterior wash and dry",
        "Interior vacuum",
        "Window cleaning",
        "Dashboard wipe down",
        "Tire shine",
        "Quick interior spray",
      ],
      icon: Zap,
      popular: false,
    },
  ]

  const addOns = [
    { name: "Engine Bay Detail", price: "$39" },
    { name: "Headlight Restoration", price: "$49" },
    { name: "Pet Hair Removal", price: "$29" },
    { name: "Odor Elimination", price: "$39" },
    { name: "Fabric Protection", price: "$59" },
    { name: "Leather Protection", price: "$49" },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-apex-dark-blue via-apex-teal-blue to-apex-dark-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-grey mb-4 lg:mb-6">
            Professional Detailing Services
          </h1>
          <p className="text-lg sm:text-xl text-apex-light-grey/80 mb-6 lg:mb-8">
            Premium mobile car detailing services designed to keep your vehicle looking its absolute best. All services
            performed at your location with professional-grade equipment.
          </p>
          <Button asChild size="lg" className="bg-apex-red hover:bg-apex-red/90 text-white">
            <Link href="/book">Book Your Service</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300 relative ${
                  service.popular ? "ring-2 ring-apex-gold" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-apex-gold text-apex-dark-blue font-semibold">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-8 h-8 text-apex-gold" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-apex-light-grey">{service.price}</div>
                      <div className="text-sm text-apex-light-grey/60">{service.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-apex-light-grey text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-apex-light-grey/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-apex-light-grey/80">
                        <Check className="w-4 h-4 text-apex-gold mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-apex-red hover:bg-apex-red/90 text-white">
                    <Link href="/book">Book This Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 lg:py-24 bg-apex-teal-blue/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-4">Additional Services</h2>
            <p className="text-xl text-apex-light-grey/70">
              Enhance your detailing package with these premium add-on services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-apex-teal-blue/30 border-apex-gold/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-apex-light-grey mb-2">{addon.name}</h3>
                  <p className="text-2xl font-bold text-apex-gold">{addon.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-6">Service Areas</h2>
          <p className="text-xl text-apex-light-grey/70 mb-8">
            We provide mobile detailing services throughout the Sunshine Coast region.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <h3 className="font-semibold text-apex-light-grey mb-2">Northern Beaches</h3>
              <p className="text-apex-light-grey/70">Noosa, Sunshine Beach, Peregian, Coolum</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-apex-light-grey mb-2">Central Coast</h3>
              <p className="text-apex-light-grey/70">Maroochydore, Mooloolaba, Buderim, Nambour</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-apex-light-grey mb-2">Southern Coast</h3>
              <p className="text-apex-light-grey/70">Caloundra, Kawana, Pelican Waters</p>
            </div>
          </div>

          <div className="bg-apex-teal-blue/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-apex-light-grey mb-4">Ready to Book?</h3>
            <p className="text-apex-light-grey/70 mb-6">
              Get your vehicle detailed by professionals. We come to you with all equipment and supplies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-apex-red hover:bg-apex-red/90 text-white">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-apex-gold text-apex-gold hover:bg-apex-gold/10 bg-transparent"
              >
                <Link href="/contact">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
