import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Sparkles, Car, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TipsBlogSection } from "@/components/tips-blog-section"

export default function HomePage() {
  const services = [
    {
      name: "Essential Detail",
      price: "From $95",
      description: "Perfect for busy lifestyles - a quick maintenance clean",
      features: ["Exterior wash", "Interior vacuum", "Window cleaning"],
      popular: false,
    },
    {
      name: "Signature Detail",
      price: "From $290",
      description: "Our most popular package combining interior and exterior",
      features: ["Deep interior clean", "Complete exterior wash", "Tyre shine"],
      popular: true,
    },
    {
      name: "Showroom Package",
      price: "From $395",
      description: "Photo-ready perfection for special occasions",
      features: ["Paint enhancement", "Engine bay clean", "Premium finish"],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Caloundra",
      rating: 5,
      text: "Absolutely incredible service! My car looks better than when I first bought it. The team was professional and the results speak for themselves.",
    },
    {
      name: "James R.",
      location: "Noosa",
      rating: 5,
      text: "I've been using Apex for 6 months now with their monthly plan. Consistently excellent work and great value for money.",
    },
    {
      name: "Michelle K.",
      location: "Maroochydore",
      rating: 5,
      text: "The convenience of mobile service is amazing. They came to my workplace and my car was spotless when I finished work.",
    },
  ]

  const stats = [
    { icon: Car, number: "2,500+", label: "Cars Detailed" },
    { icon: Users, number: "1,200+", label: "Happy Customers" },
    { icon: Award, number: "4.9/5", label: "Average Rating" },
    { icon: MapPin, number: "50km", label: "Service Radius" },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-apex-teal-blue/20 text-apex-teal-blue border-apex-teal-blue/30 mb-4">
                Premium Mobile Detailing
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-apex-light-yellow mb-6">
                Professional Car Detailing at Your Location
              </h1>
              <p className="text-xl text-apex-light-yellow/80 mb-8">
                Transform your vehicle with our premium mobile detailing services. We bring professional-grade equipment
                and expertise directly to you across the Sunshine Coast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/book">
                  <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                    Book Your Detail
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-apex-light-yellow/80">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-apex-orange-yellow" />
                  <span>Sunshine Coast Wide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-apex-orange-yellow" />
                  <span>7 Days a Week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-apex-orange-yellow" />
                  <span>Fully Insured</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Apex Auto Detailing Service"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-apex-bright-red text-apex-light-yellow p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">4.9/5 Rating</span>
                </div>
                <p className="text-sm opacity-90">1,200+ Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-apex-bright-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-apex-bright-red" />
                </div>
                <div className="text-3xl font-bold text-apex-light-yellow mb-2">{stat.number}</div>
                <div className="text-apex-light-yellow/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">Our Services</h2>
            <p className="text-xl text-apex-light-yellow/80 max-w-3xl mx-auto">
              From quick maintenance to showroom perfection, we have the right package for every need and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300 ${service.popular ? "ring-2 ring-apex-bright-red scale-105" : ""}`}
              >
                {service.popular && (
                  <div className="bg-apex-bright-red text-apex-light-yellow text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-apex-bright-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-apex-bright-red" />
                  </div>
                  <CardTitle className="text-apex-light-yellow text-xl">{service.name}</CardTitle>
                  <div className="text-2xl font-bold text-apex-orange-yellow">{service.price}</div>
                  <CardDescription className="text-apex-light-yellow/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-apex-light-yellow/80">
                        <div className="w-2 h-2 bg-apex-orange-yellow rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book">
                    <Button className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
              >
                View All Services & Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">Why Choose Apex?</h2>
            <p className="text-xl text-apex-light-yellow/80">The difference is in the details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Mobile Convenience",
                description: "We come to you - home, work, or anywhere on the Sunshine Coast",
              },
              {
                icon: Award,
                title: "Professional Results",
                description: "Trained technicians using premium products and equipment",
              },
              {
                icon: Shield,
                title: "Fully Insured",
                description: "Complete peace of mind with comprehensive insurance coverage",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "7 days a week service that fits your busy lifestyle",
              },
              {
                icon: Star,
                title: "Satisfaction Guarantee",
                description: "Not happy? We'll return to make it right at no extra cost",
              },
              {
                icon: Users,
                title: "Trusted by 1,200+",
                description: "Join our growing family of satisfied customers",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue text-center hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6">
                  <feature.icon className="w-12 h-12 text-apex-orange-yellow mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-apex-light-yellow mb-2">{feature.title}</h3>
                  <p className="text-apex-light-yellow/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-apex-light-yellow/80">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-apex-orange-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-apex-light-yellow/80 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-apex-bright-red/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-apex-bright-red font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-apex-light-yellow font-semibold">{testimonial.name}</div>
                      <div className="text-apex-light-yellow/70 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Plans CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-apex-teal-blue/20 to-apex-dark-orange/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-apex-orange-yellow/20 text-apex-orange-yellow border-apex-orange-yellow/30 mb-4">
                Save up to 30%
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
                Keep Your Car Clean All Year
              </h2>
              <p className="text-xl text-apex-light-yellow/80 mb-8">
                Our monthly subscription plans offer incredible value with priority scheduling, exclusive perks, and
                significant savings on regular detailing services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/subscriptions">
                  <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                    View Monthly Plans
                  </Button>
                </Link>
                <Link href="/book">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                  >
                    Book One-Time Service
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Monthly Subscription Plans"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tips Blog Section */}
      <TipsBlogSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
            Ready to Transform Your Car?
          </h2>
          <p className="text-xl text-apex-light-yellow/80 mb-8 max-w-2xl mx-auto">
            Experience the Apex difference with professional mobile detailing that comes to you. Book your service today
            and see why we're the Sunshine Coast's trusted choice.
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
                Get a Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
