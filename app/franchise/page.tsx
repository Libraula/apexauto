import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, TrendingUp, Users, MapPin, DollarSign, Award, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function FranchisePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Business Model",
      description: "Join a successful, growing business with established systems and processes",
    },
    {
      icon: Users,
      title: "Comprehensive Training",
      description: "Complete training program covering technical skills, business operations, and customer service",
    },
    {
      icon: MapPin,
      title: "Territory Protection",
      description: "Exclusive territory rights ensuring no competition from other Apex franchisees",
    },
    {
      icon: DollarSign,
      title: "Strong ROI Potential",
      description: "High-margin business with recurring revenue opportunities through subscription services",
    },
    {
      icon: Award,
      title: "Brand Recognition",
      description: "Leverage our established brand reputation and marketing materials",
    },
    {
      icon: Briefcase,
      title: "Ongoing Support",
      description: "Continuous business support, marketing assistance, and operational guidance",
    },
  ]

  const investmentBreakdown = [
    { item: "Franchise Fee", amount: "$45,000", description: "One-time franchise rights and territory license" },
    { item: "Equipment Package", amount: "$15,000", description: "Professional detailing equipment and tools" },
    { item: "Vehicle Setup", amount: "$8,000", description: "Vehicle wrapping, storage solutions, and branding" },
    { item: "Initial Marketing", amount: "$5,000", description: "Launch marketing campaign and materials" },
    { item: "Training & Setup", amount: "$3,000", description: "Comprehensive training program and business setup" },
    { item: "Working Capital", amount: "$10,000", description: "Recommended working capital for first 3 months" },
  ]

  const requirements = [
    "Minimum liquid capital of $50,000",
    "Total investment capacity of $86,000",
    "Commitment to full-time business operation",
    "Valid driver's license and clean driving record",
    "Strong customer service orientation",
    "Willingness to follow proven business systems",
    "Ability to complete physical work (or hire employees)",
    "Commitment to brand standards and values",
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
                Franchise Opportunity
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
                Own Your Own Apex Auto Detailing Franchise
              </h1>
              <p className="text-xl text-apex-light-yellow/80 mb-8">
                Join Australia's fastest-growing mobile auto detailing franchise. Build a profitable business with our
                proven systems, comprehensive training, and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                    Request Information
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                >
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Apex Auto Detailing Franchise Van"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Apex Franchise */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">
              Why Choose Apex Franchise?
            </h2>
            <p className="text-xl text-apex-light-yellow/80 max-w-3xl mx-auto">
              We've built a successful business model that you can replicate in your territory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-apex-bright-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-apex-bright-red" />
                  </div>
                  <CardTitle className="text-apex-light-yellow text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-apex-light-yellow/70 text-center">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Information */}
      <section className="py-16 lg:py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">
              Investment Breakdown
            </h2>
            <p className="text-xl text-apex-light-yellow/80">
              Total investment from $86,000 - everything you need to start your successful franchise
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {investmentBreakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start border-b border-apex-teal-blue/30 pb-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-apex-light-yellow">{item.item}</h3>
                        <p className="text-apex-light-yellow/70 text-sm mt-1">{item.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-apex-orange-yellow ml-4">{item.amount}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-apex-bright-red">
                    <span className="text-xl font-bold text-apex-light-yellow">Total Investment</span>
                    <span className="text-3xl font-bold text-apex-orange-yellow">$86,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
                Franchise Requirements
              </h2>
              <p className="text-xl text-apex-light-yellow/80 mb-8">
                We're looking for motivated individuals who are ready to build a successful business
              </p>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-apex-orange-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-apex-light-yellow/80">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardHeader>
                <CardTitle className="text-apex-light-yellow text-2xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-apex-light-yellow/70">
                  Take the first step towards owning your own successful auto detailing business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-apex-light-yellow">Submit your inquiry</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-apex-light-yellow">Initial phone consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-apex-light-yellow">Review franchise disclosure document</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <span className="text-apex-light-yellow">Meet with our team</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <span className="text-apex-light-yellow">Sign agreement and begin training</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                    Start Your Franchise Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 lg:py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">
              Franchisee Success Stories
            </h2>
            <p className="text-xl text-apex-light-yellow/80">Hear from our successful franchise owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-full flex items-center justify-center">
                      <span className="text-apex-bright-red font-bold">MJ</span>
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold">Mike Johnson</h3>
                      <p className="text-apex-light-yellow/70 text-sm">Gold Coast Territory</p>
                    </div>
                  </div>
                  <p className="text-apex-light-yellow/80 italic">
                    "Within 6 months, I was booked solid and had to hire my first employee. The training and support
                    from Apex made all the difference. I'm now earning more than I ever did in my corporate job."
                  </p>
                </div>
                <div className="flex justify-between text-sm text-apex-light-yellow/70">
                  <span>Franchise Owner since 2022</span>
                  <span>2 employees, 150+ regular customers</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-full flex items-center justify-center">
                      <span className="text-apex-bright-red font-bold">ST</span>
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold">Sarah Thompson</h3>
                      <p className="text-apex-light-yellow/70 text-sm">Brisbane North Territory</p>
                    </div>
                  </div>
                  <p className="text-apex-light-yellow/80 italic">
                    "The subscription model is brilliant - I have predictable monthly income and customers love the
                    convenience. Apex's systems and support made it easy to scale from day one."
                  </p>
                </div>
                <div className="flex justify-between text-sm text-apex-light-yellow/70">
                  <span>Franchise Owner since 2023</span>
                  <span>80+ subscription customers</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-apex-teal-blue/20 to-apex-dark-orange/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
            Ready to Own Your Future?
          </h2>
          <p className="text-xl text-apex-light-yellow/80 mb-8 max-w-2xl mx-auto">
            Join the Apex family and build a profitable business with our proven franchise model
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow px-8">
                Request Franchise Information
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
