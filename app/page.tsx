import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Clock, Award, Car, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black-rich">
      {/* Hero Section */}
      <section className="relative premium-gradient py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black-rich/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-primary/20 text-red-primary border-red-primary/30 px-4 py-2">
                  Premium Detailing Services
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-text-warm leading-tight">
                  Transform Your
                  <span className="text-red-primary block">Vehicle</span>
                </h1>
                <p className="text-xl text-text-light/80 max-w-lg">
                  Experience the pinnacle of automotive care with our premium detailing services. Every detail matters,
                  every finish is perfect.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-primary hover:bg-red-secondary text-text-warm font-semibold px-8 py-4 text-lg"
                >
                  <Link href="/book">Book Service</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black-rich px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-accent-gold/20 rounded-3xl blur-3xl"></div>
              <Image
                src="/detail1.jpg?height=600&width=800"
                alt="Premium car detailing"
                width={800}
                height={600}
                className="relative z-10 rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">Premium Services</h2>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Discover our comprehensive range of professional detailing services
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="h-8 w-8" />,
                title: "Exterior Detailing",
                description: "Complete exterior transformation with premium products",
                price: "From $150",
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Interior Detailing",
                description: "Deep cleaning and protection for your vehicle's interior",
                price: "From $120",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Paint Protection",
                description: "Advanced ceramic coating and paint protection film",
                price: "From $800",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="premium-card border-red-primary/20 hover:border-red-primary/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-red-primary/20 rounded-xl flex items-center justify-center text-red-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-text-warm text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-text-light/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-gold font-semibold text-lg">{service.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-primary text-red-primary hover:bg-red-primary hover:text-text-warm bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black-rich">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-8">Why Choose Apex?</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Award className="h-6 w-6" />,
                    title: "Premium Quality",
                    description: "We use only the finest products and techniques for exceptional results",
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Time Efficient",
                    description: "Professional service delivered on time, every time",
                  },
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Satisfaction Guaranteed",
                    description: "100% satisfaction guarantee on all our services",
                  },
                  {
                    icon: <Star className="h-6 w-6" />,
                    title: "Expert Team",
                    description: "Certified professionals with years of experience",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/20 rounded-lg flex items-center justify-center text-red-primary flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-warm mb-2">{feature.title}</h3>
                      <p className="text-text-light/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-primary/20 to-accent-gold/20 rounded-3xl blur-3xl"></div>
              <Image
                src="/detail2.jpg?height=500&width=600"
                alt="Professional detailing team"
                width={600}
                height={500}
                className="relative z-10 rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">What Our Clients Say</h2>
            <p className="text-xl text-text-light/70">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Johnson",
                role: "BMW Owner",
                content:
                  "Absolutely incredible service! My car looks better than when I first bought it. The attention to detail is unmatched.",
                rating: 5,
              },
              {
                name: "Sarah Williams",
                role: "Mercedes Owner",
                content:
                  "Professional, reliable, and the results speak for themselves. I wouldn't trust my car to anyone else.",
                rating: 5,
              },
              {
                name: "David Chen",
                role: "Audi Owner",
                content: "The ceramic coating service was worth every penny. My car still looks pristine months later.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="premium-card border-red-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-text-light/80 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-text-warm">{testimonial.name}</p>
                    <p className="text-sm text-text-light/60">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-red-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl text-text-light/90 mb-8 max-w-2xl mx-auto">
            Experience the difference that premium detailing makes. Book your service today and see why we're the
            preferred choice for discerning car owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-text-warm text-black-rich hover:bg-text-light font-semibold px-8 py-4 text-lg"
            >
              <Link href="/book">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-text-warm text-text-warm hover:bg-text-warm hover:text-black-rich px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
