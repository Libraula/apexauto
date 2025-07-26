import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Sparkles,
  Car,
  Zap,
  Phone,
  Calendar,
  Award,
  Users,
  MapPin,
  ThumbsUp,
} from "lucide-react"

export default function HomePage() {
  const services = [
    {
      title: "Custom Detail",
      price: "From $95",
      duration: "1-2 hours",
      icon: Car,
      description: "Perfect for regular upkeep",
      features: [
        "Exterior hand wash",
        "Wheel & tire clean + shine",
        "Windows cleaned",
        "Interior wipe-down",
        "Light vacuum (mats & seats)",
      ],
    },
    {
      title: "Interior Detail",
      price: "From $250",
      duration: "2-3 hours",
      icon: Sparkles,
      description: "Showroom-level interior finish",
      features: [
        "Deep vacuum (seats, carpets, boot)",
        "Seats & carpet shampooed (if required)",
        "Leather cleaned & conditioned",
        "Dashboard, console, vents cleaned",
        "Streak-free interior glass",
        "Premium scent / deodoriser spray",
      ],
    },
    {
      title: "Full Detail",
      price: "From $345",
      duration: "3-4 hours",
      icon: Award,
      description: "Best for full restoration or events",
      features: [
        "Complete interior detail (see above)",
        "Exterior hand wash + clay bar",
        "Polishing & wax/sealant protection",
        "Wheels, trims, badges detailed",
      ],
    },
    {
      title: "Pre-Sale Detail",
      price: "From $395",
      duration: "4-5 hours",
      icon: ThumbsUp,
      description: "Get top dollar when selling your car",
      features: ["Full detail package", "Engine bay clean", "Paint enhancement", "Odour neutraliser"],
    },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Mobile Service",
      description: "We come to your home, office, or anywhere convenient for you",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book appointments that fit your busy lifestyle",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete peace of mind with comprehensive insurance coverage",
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Consistently rated 5 stars by our satisfied customers",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Trained professionals with years of detailing experience",
    },
    {
      icon: Zap,
      title: "Premium Products",
      description: "Only the finest products and equipment for your vehicle",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely amazing service! They came to my office and my car looked brand new when they finished. Highly recommend!",
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Best car detailing service on the Sunshine Coast. Professional, reliable, and the results speak for themselves.",
    },
    {
      name: "Emma Wilson",
      rating: 5,
      text: "The convenience of mobile service is unbeatable. Great attention to detail and fair pricing.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black-rich via-black-deep to-black-primary py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Truck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-red-primary mr-3 sm:mr-4" />
              <Badge
                variant="outline"
                className="border-red-primary text-red-primary text-xs sm:text-sm px-2 sm:px-3 py-1"
              >
                Mobile Car Detailing Services
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-warm mb-4 sm:mb-6 leading-tight">
              <span className="text-red-primary">Apex Auto Detailers</span>
              <br className="hidden sm:block" />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"> Premium Mobile Detailing</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-text-light/80 mb-2 sm:mb-3">
              We come to you – Sunshine Coast & surrounds
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 text-sm sm:text-base">
              <div className="flex items-center text-text-light/70">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary mr-2" />
                Fully Insured
              </div>
              <div className="flex items-center text-text-light/70">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary mr-2" />
                5-Star Rated
              </div>
              <div className="flex items-center text-text-light/70">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary mr-2" />
                Flexible Scheduling
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-red-primary hover:bg-red-secondary text-text-warm text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <Link href="/book">Book Service Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-red-primary text-red-primary hover:bg-red-primary hover:text-text-warm text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-transparent"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black-deep">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-warm mb-3 sm:mb-4">
              Our Mobile Detailing Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-light/70 max-w-2xl mx-auto">
              Professional car detailing services that come to you. Choose the perfect package for your vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className="premium-card border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 group"
                >
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-red-primary/10 rounded-full w-fit">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-red-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-text-warm group-hover:text-red-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-text-light/70">
                      <span className="text-xl sm:text-2xl font-bold text-red-primary">{service.price}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{service.duration}</span>
                    </div>
                    <CardDescription className="text-text-light/60 text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-text-light/80">
                          <CheckCircle className="h-4 w-4 text-red-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black-primary">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-warm mb-3 sm:mb-4">
              Why Choose Apex Auto Detailers?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-light/70 max-w-2xl mx-auto">
              Experience the difference with our premium mobile car detailing service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto mb-3 sm:mb-4 p-4 sm:p-6 bg-red-primary/10 rounded-full w-fit group-hover:bg-red-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-red-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-warm mb-2 sm:mb-3">{benefit.title}</h3>
                  <p className="text-sm sm:text-base text-text-light/70 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black-deep">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-warm mb-3 sm:mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-light/70 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="premium-card border-red-primary/20">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-accent-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-text-light/80 mb-3 sm:mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-text-warm">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-primary to-red-secondary">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-warm mb-3 sm:mb-4">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-text-warm/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book your mobile car detailing service today and experience the Apex difference
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-text-warm text-red-primary hover:bg-text-warm/90 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              <Link href="/book">Book Service Now</Link>
            </Button>
            <div className="flex items-center text-text-warm">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-base sm:text-lg font-semibold">+61436920067</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-text-warm/80">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Sunshine Coast & Surrounds
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Flexible Scheduling
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Mobile Service
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
