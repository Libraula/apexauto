import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Sparkles, Users, TrendingUp, Gift } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TipsBlogSection } from "@/components/tips-blog-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                  Mobile Detailing • Sunshine Coast
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  We Don't Just Clean Cars...{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    We Care
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Mobile car detailing across the Sunshine Coast. We bring everything with us – products, equipment, and
                  even power & water. Professional showroom-quality results, guaranteed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8">
                    Book Your Detail
                  </Button>
                </Link>
                <Link href="/subscriptions">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    View Monthly Plans
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Sunshine Coast Wide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Fully Insured</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-8">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Professional car detailing service"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Professional Detailing Packages</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From quick maintenance to showroom preparation, we have the perfect package for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Essential Detail",
                price: "From $95",
                description: "Quick maintenance clean for busy lifestyles",
                features: [
                  "Exterior wash & dry",
                  "Wheels cleaned",
                  "Light interior vacuum",
                  "Window cleaning",
                  "Fresh scent application",
                ],
                popular: false,
              },
              {
                name: "Premium Interior",
                price: "From $250",
                description: "Deep interior reset and restoration",
                features: [
                  "Full vacuum including boot",
                  "Trim & vent cleaning",
                  "Spot cleaning & shampooing",
                  "Leather conditioning",
                  "Odour control",
                ],
                popular: false,
              },
              {
                name: "Signature Detail",
                price: "From $290",
                description: "Our most popular full-service package",
                features: [
                  "Premium Interior services",
                  "Complete exterior wash",
                  "Tyre shine & dressing",
                  "Interior glass cleaning",
                  "Professional finish",
                ],
                popular: true,
              },
              {
                name: "Elite Detail",
                price: "From $345",
                description: "Enhanced shine with machine polish",
                features: [
                  "All Signature services",
                  "Machine polish or wax",
                  "Trim restoration",
                  "Intensive stain removal",
                  "Premium protection",
                ],
                popular: false,
              },
              {
                name: "Showroom Package",
                price: "From $395",
                description: "Perfect for pre-sale or photo shoots",
                features: [
                  "Paint enhancement",
                  "Interior perfection",
                  "Engine bay cleaning",
                  "Full presentation prep",
                  "Photo-ready finish",
                ],
                popular: false,
              },
            ].map((pkg, index) => (
              <Card
                key={index}
                className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 ${pkg.popular ? "ring-2 ring-blue-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl">{pkg.name}</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">{pkg.description}</CardDescription>
                    </div>
                    {pkg.popular && <Badge className="bg-blue-600 text-white">Most Popular</Badge>}
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book">
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">Book This Package</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Specialized Services</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Professional solutions for specific automotive needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Paint Protection",
                description: "Advanced ceramic, nano, and glass coatings for long-lasting paint protection",
                features: ["PTFE Protection", "Ceramic Coatings", "Nano Technology", "Glass Protection"],
                icon: Shield,
                price: "From $150",
              },
              {
                name: "Bacteria & Odour Removal",
                description: "Professional ozone treatment to eliminate bacteria, viruses, and stubborn odours",
                features: ["Fresh Air Ozone Machine", "Bacteria Elimination", "Virus Treatment", "Deep Sanitization"],
                icon: Sparkles,
                price: "From $80",
              },
              {
                name: "Paint Correction",
                description: "Restore dull paintwork and remove minor imperfections for amazing results",
                features: ["Swirl Mark Removal", "Scratch Correction", "Paint Enhancement", "Professional Polish"],
                icon: Star,
                price: "From $200",
              },
              {
                name: "Headlight Restoration",
                description: "Restore clarity to cloudy headlights - safety and aesthetic improvement",
                features: ["UV Protection", "Clarity Restoration", "Safety Enhancement", "Professional Grade"],
                icon: Users,
                price: "From $60",
              },
              {
                name: "Engine Bay Cleaning",
                description: "Professional engine bay detailing with careful attention to electrical components",
                features: ["Safe Cleaning Methods", "Degreasing", "Protection Application", "Professional Assessment"],
                icon: MapPin,
                price: "From $100",
              },
              {
                name: "Custom Solutions",
                description: "We can tailor something to suit exactly what it is that you need",
                features: ["Personalized Service", "Unique Requirements", "Flexible Packages", "Expert Consultation"],
                icon: TrendingUp,
                price: "Quote on Request",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <service.icon className="w-8 h-8 text-blue-500" />
                    <div>
                      <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                      <div className="text-blue-400 font-semibold">{service.price}</div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Apex - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Apex Auto Detailers?</h2>
            <p className="text-xl text-slate-300">
              Over 15 years of combined experience delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: MapPin,
                title: "Complete Self-Sufficiency",
                description: "We bring everything – products, equipment, power & water. No queues, no waiting around.",
              },
              {
                icon: Users,
                title: "Expert Professionals",
                description:
                  "Trained detailers with 15+ years combined experience and ongoing professional development",
              },
              {
                icon: Shield,
                title: "Fully Insured & Guaranteed",
                description: "Complete peace of mind with comprehensive insurance and quality guarantee on all work",
              },
              {
                icon: Clock,
                title: "Fixed Appointment Times",
                description: "Reliable scheduling with SMS updates. We arrive on time, every time.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/30 border-slate-700 text-center hover:bg-slate-800/50 transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6">
                  <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">Gift Vouchers</div>
                <p className="text-slate-300">Available for all services - perfect for friends and family</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">Custom Quotes</div>
                <p className="text-slate-300">Heavy soiling & paint condition may incur additional charges</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">Show Quality</div>
                <p className="text-slate-300">Results that win competitions and sell cars faster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Customer Testimonials */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-slate-300">Real stories from satisfied customers across the Sunshine Coast</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Caloundra",
                service: "Elite Detail",
                rating: 5,
                title: "Show Quality Results",
                testimonial:
                  "After Apex detailed my 4WD, I entered it in a local car show and won 'Best 4x4 of the Show'! The paint correction and ceramic coating made it look better than when I first bought it. Dan's attention to detail is incredible.",
                highlight: "Won car show competition",
              },
              {
                name: "Michael R.",
                location: "Noosa",
                service: "Premium Interior + Odour Removal",
                rating: 5,
                title: "Eliminated Stubborn Pet Odours",
                testimonial:
                  "My family dog had left a lingering smell in my car that I couldn't get rid of. The ozone treatment completely eliminated it - the interior looks and smells brand new. Professional service from start to finish.",
                highlight: "Complete odour elimination",
              },
              {
                name: "Jennifer L.",
                location: "Maroochydore",
                service: "Showroom Package",
                rating: 5,
                title: "Sold Car in 2 Days",
                testimonial:
                  "I was struggling to sell my Hilux until I had it detailed by Apex. The showroom package made it look incredible - it sold within two days of listing! The investment in detailing paid for itself many times over.",
                highlight: "Quick sale success",
              },
              {
                name: "David K.",
                location: "Buderim",
                service: "Custom Restoration",
                rating: 5,
                title: "Above and Beyond Service",
                testimonial:
                  "My car was left in shambles after a break-in. The team went the extra mile to restore it completely - removing all traces of the incident. They worked tirelessly and the result was amazing. Truly professional service.",
                highlight: "Exceptional restoration work",
              },
              {
                name: "Lisa T.",
                location: "Kawana",
                service: "Signature Detail",
                rating: 5,
                title: "Reliable and Professional",
                testimonial:
                  "Dan arrived exactly on time, was well-presented and professional throughout. The quality of work was outstanding - my car looked showroom condition. I'm now a monthly subscriber and couldn't be happier.",
                highlight: "Consistent quality service",
              },
              {
                name: "Robert H.",
                location: "Mooloolaba",
                service: "Bacteria & Odour Treatment",
                rating: 5,
                title: "Health and Safety Focus",
                testimonial:
                  "After a family illness, I needed my car properly sanitized. The ozone treatment eliminated bacteria and viruses, giving me peace of mind. The team explained the process thoroughly and delivered exceptional results.",
                highlight: "Professional sanitization",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <Badge className="ml-3 bg-blue-600/20 text-blue-400 border-blue-600/30">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{testimonial.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">"{testimonial.testimonial}"</p>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-white font-semibold">{testimonial.name}</span>
                      <span className="text-slate-400 ml-2">{testimonial.location}</span>
                    </div>
                    <span className="text-blue-400">{testimonial.service}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6">Join hundreds of satisfied customers across the Sunshine Coast</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Read More Reviews</Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                Leave a Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Callout */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardContent className="p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Keep Your Car Clean All Year</h2>
                  <p className="text-xl text-slate-300 mb-6">
                    Monthly subscription plans starting from $99. Save up to 30% compared to one-off bookings and enjoy
                    priority scheduling.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/subscriptions">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Plans & Save
                      </Button>
                    </Link>
                    <div className="flex items-center text-slate-400">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>Priority booking for subscribers</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">$99</div>
                    <div className="text-sm text-slate-400">Maintain Me</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">$159</div>
                    <div className="text-sm text-slate-400">Stay Fresh</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">$199</div>
                    <div className="text-sm text-slate-400">Executive</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <TipsBlogSection />

      {/* Franchise Callout - Updated */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-r from-slate-800/50 to-blue-900/20 border-slate-700">
              <CardContent className="p-8 lg:p-12 text-center">
                <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Start Detailing. Start Earning.</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Want to earn extra income? Start an Apex Detailing Unit with our complete starter kit and training
                  program.
                </p>
                <div className="flex flex-col gap-4 items-center">
                  <Link href="/franchise">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Learn About Franchising
                    </Button>
                  </Link>
                  <div className="text-slate-400 text-sm">
                    <span className="font-semibold">Example:</span> 10 cars/week @ $150 avg = $1,500 gross
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/20 to-slate-800/50 border-slate-700">
              <CardContent className="p-8 lg:p-12 text-center">
                <Gift className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Perfect Gift Ideas</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Give the gift of a pristine car with our professional detailing gift vouchers. Available for all
                  services.
                </p>
                <div className="flex flex-col gap-4 items-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      Purchase Gift Vouchers
                    </Button>
                  </Link>
                  <div className="text-slate-400 text-sm">Perfect for birthdays, holidays, or special occasions</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
