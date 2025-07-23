import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TipsBlogSection } from "@/components/tips-blog-section"
import { Star, Shield, Clock, MapPin, Phone, Mail, Sparkles, Car, Droplets } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const services = [
    {
      title: "Exterior Detail",
      description: "Complete exterior wash, wax, and protection",
      price: "From $89",
      features: ["Hand wash", "Clay bar treatment", "Wax protection", "Tire shine"],
      icon: Car,
    },
    {
      title: "Interior Detail",
      description: "Deep clean and protection for your interior",
      price: "From $79",
      features: ["Vacuum & steam clean", "Leather conditioning", "Dashboard protection", "Odor elimination"],
      icon: Sparkles,
    },
    {
      title: "Full Detail",
      description: "Complete interior and exterior detailing",
      price: "From $149",
      features: ["Everything included", "Paint correction", "Ceramic coating", "Premium protection"],
      icon: Droplets,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Caloundra",
      rating: 5,
      text: "Absolutely amazing service! My car looks brand new. The team was professional and thorough.",
    },
    {
      name: "Mike Chen",
      location: "Noosa",
      rating: 5,
      text: "Best car detailing service on the Sunshine Coast. They come to you and do incredible work.",
    },
    {
      name: "Emma Wilson",
      location: "Maroochydore",
      rating: 5,
      text: "Outstanding attention to detail. My car has never looked better. Highly recommend!",
    },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-apex-dark-blue via-apex-teal-blue to-apex-dark-blue" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-apex-light-grey mb-6">
            Premium Mobile Car Detailing
          </h1>
          <p className="text-xl sm:text-2xl text-apex-light-grey/80 mb-8 max-w-3xl mx-auto">
            Professional car detailing services across the Sunshine Coast. We come to you with showroom-quality results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-apex-red hover:bg-apex-red/90 text-white text-lg px-8 py-6 shadow-lg shadow-apex-red/20 border-2 border-apex-red"
            >
              <Link href="/book">Book Your Detail</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-apex-gold text-apex-gold hover:bg-apex-gold hover:text-apex-dark-blue text-lg px-8 py-6 transition-all duration-300 shadow-lg shadow-apex-gold/20 bg-transparent"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-apex-teal-blue/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-4">
              Why Choose Apex Auto Detailers?
            </h2>
            <p className="text-xl text-apex-light-grey/70 max-w-2xl mx-auto">
              We deliver exceptional results with professional service you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-apex-teal-blue/30 border-apex-gold/20 text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-apex-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-apex-light-grey mb-3">Fully Insured</h3>
                <p className="text-apex-light-grey/70">
                  Complete peace of mind with comprehensive insurance coverage for all our services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-apex-teal-blue/30 border-apex-gold/20 text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-apex-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-apex-light-grey mb-3">Convenient Scheduling</h3>
                <p className="text-apex-light-grey/70">
                  Flexible booking times that work around your schedule. We come to you!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-apex-teal-blue/30 border-apex-gold/20 text-center">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-apex-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-apex-light-grey mb-3">Sunshine Coast Wide</h3>
                <p className="text-apex-light-grey/70">
                  Serving all areas from Caloundra to Noosa with premium mobile detailing services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-4">Our Premium Services</h2>
            <p className="text-xl text-apex-light-grey/70 max-w-2xl mx-auto">
              Professional detailing packages designed to keep your vehicle looking its absolute best.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-8 h-8 text-apex-gold" />
                    <Badge className="bg-apex-red text-white">{service.price}</Badge>
                  </div>
                  <CardTitle className="text-apex-light-grey">{service.title}</CardTitle>
                  <CardDescription className="text-apex-light-grey/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-apex-light-grey/80">
                        <Star className="w-4 h-4 text-apex-gold mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-apex-gold hover:bg-apex-gold/90 text-apex-dark-blue font-semibold shadow-lg shadow-apex-gold/20 border-2 border-apex-gold"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-apex-teal-blue/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-4">What Our Customers Say</h2>
            <p className="text-xl text-apex-light-grey/70">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-apex-teal-blue/30 border-apex-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-apex-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-apex-light-grey/80 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-apex-light-grey">{testimonial.name}</p>
                    <p className="text-apex-light-grey/60 text-sm">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl text-apex-light-grey/70 mb-8">
            Book your premium detailing service today and experience the Apex difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center text-apex-light-grey">
              <Phone className="w-5 h-5 text-apex-gold mr-3" />
              <span className="text-lg">(555) 123-4567</span>
            </div>
            <div className="flex items-center text-apex-light-grey">
              <Mail className="w-5 h-5 text-apex-gold mr-3" />
              <span className="text-lg">info@apexautodetailers.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-apex-red hover:bg-apex-red/90 text-white text-lg px-8 py-6 shadow-lg shadow-apex-red/20 border-2 border-apex-red"
            >
              <Link href="/book">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-apex-gold text-apex-gold hover:bg-apex-gold hover:text-apex-dark-blue text-lg px-8 py-6 transition-all duration-300 shadow-lg shadow-apex-gold/20 bg-transparent"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <TipsBlogSection />
      <Footer />
    </div>
  )
}
