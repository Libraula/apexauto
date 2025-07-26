"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign, Users, TrendingUp, Phone, Mail, CheckCircle, Star } from "lucide-react"

const investmentBreakdown = [
  { item: "Initial Franchise Fee", amount: "$45,000", description: "One-time franchise licensing fee" },
  { item: "Equipment Package", amount: "$25,000", description: "Professional detailing equipment and tools" },
  { item: "Initial Inventory", amount: "$8,000", description: "Premium cleaning products and supplies" },
  { item: "Training Program", amount: "$5,000", description: "Comprehensive business and technical training" },
  { item: "Marketing Launch", amount: "$7,000", description: "Grand opening marketing and promotional materials" },
]

const territories = [
  {
    name: "Metro North",
    population: "250,000+",
    status: "Available",
    potential: "High",
    description: "Growing suburban area with high disposable income",
  },
  {
    name: "Downtown District",
    population: "180,000+",
    status: "Reserved",
    potential: "Premium",
    description: "Business district with luxury vehicle concentration",
  },
  {
    name: "Coastal Region",
    population: "320,000+",
    status: "Available",
    potential: "High",
    description: "Affluent coastal communities with premium vehicle market",
  },
  {
    name: "Tech Corridor",
    population: "200,000+",
    status: "Available",
    potential: "Premium",
    description: "Technology hub with young professionals and luxury cars",
  },
]

const supportServices = [
  "Comprehensive Training Program",
  "Marketing & Advertising Support",
  "Operations Manual & Systems",
  "Ongoing Business Coaching",
  "Territory Protection",
  "Vendor Relationships",
  "Quality Assurance Programs",
  "Technology Platform Access",
]

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Franchise Opportunities</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto mb-8">
            Join the Apex Auto Detailers family and build a premium car detailing business with our proven system,
            comprehensive training, and ongoing support.
          </p>
          <Button size="lg" className="bg-red-primary hover:bg-red-secondary text-text-warm">
            Request Information
          </Button>
        </div>
      </section>

      {/* Investment Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Investment Overview</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Start your premium car detailing franchise with a comprehensive package designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-red-primary" />
                  Total Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-primary mb-4">$90,000</div>
                <p className="text-text-light/70 mb-6">
                  Complete franchise package including equipment, training, and launch support.
                </p>
                <div className="space-y-3">
                  {investmentBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-text-warm">{item.item}</div>
                        <div className="text-sm text-text-light/60">{item.description}</div>
                      </div>
                      <div className="font-semibold text-red-primary">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-red-primary" />
                  Revenue Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="text-2xl font-bold text-red-primary mb-2">$200K - $500K</div>
                    <div className="text-text-light/70">Annual Revenue Potential</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-primary mb-2">25% - 35%</div>
                    <div className="text-text-light/70">Average Profit Margin</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-primary mb-2">12 - 18</div>
                    <div className="text-text-light/70">Months to Break Even</div>
                  </div>
                  <div className="bg-red-primary/10 p-4 rounded-lg">
                    <div className="text-sm text-text-light/80">
                      * Revenue potential varies by location, market conditions, and individual performance.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Territories */}
      <section className="py-16 px-4 bg-black-deep/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Available Territories</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Secure your exclusive territory in high-potential markets across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {territories.map((territory, index) => (
              <Card
                key={index}
                className="bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-text-warm mb-2">{territory.name}</h3>
                      <div className="flex items-center gap-2 text-text-light/70 mb-2">
                        <Users className="w-4 h-4" />
                        <span>{territory.population}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={territory.status === "Available" ? "default" : "secondary"}
                        className={
                          territory.status === "Available"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        }
                      >
                        {territory.status}
                      </Badge>
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className={
                            territory.potential === "Premium"
                              ? "border-red-primary text-red-primary"
                              : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {territory.potential} Potential
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-light/70 mb-4">{territory.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
                    disabled={territory.status === "Reserved"}
                  >
                    {territory.status === "Available" ? "Inquire About Territory" : "Territory Reserved"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Training */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Comprehensive Support</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              We provide everything you need to succeed, from initial training to ongoing business support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportServices.map((service, index) => (
              <Card key={index} className="bg-black-deep/50 border-red-primary/20 text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-red-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-text-warm">{service}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Training Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">2-Week Intensive Training</div>
                      <div className="text-sm text-text-light/70">
                        Hands-on technical and business training at our facility
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">On-Site Launch Support</div>
                      <div className="text-sm text-text-light/70">
                        Expert assistance during your first month of operations
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">Ongoing Education</div>
                      <div className="text-sm text-text-light/70">
                        Regular training updates and new technique workshops
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Marketing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">Brand Marketing Materials</div>
                      <div className="text-sm text-text-light/70">
                        Professional marketing collateral and digital assets
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">Digital Marketing Platform</div>
                      <div className="text-sm text-text-light/70">
                        Website, social media templates, and online booking system
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-red-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-text-warm">Local Advertising Support</div>
                      <div className="text-sm text-text-light/70">
                        Guidance on local marketing strategies and campaigns
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-primary/20 to-red-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-text-light/80 max-w-2xl mx-auto mb-8">
            Take the first step towards owning your premium car detailing franchise. Contact us today for a detailed
            information package and territory availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-text-light">
              <Phone className="w-5 h-5 text-red-primary" />
              <span>+61436920067</span>
            </div>
            <div className="flex items-center gap-2 text-text-light">
              <Mail className="w-5 h-5 text-red-primary" />
              <span>franchise@apexautodetailers.com</span>
            </div>
          </div>
          <div className="mt-8">
            <Button size="lg" className="bg-red-primary hover:bg-red-secondary text-text-warm">
              Download Franchise Information
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
