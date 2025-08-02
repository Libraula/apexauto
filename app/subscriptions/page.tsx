"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle, Star, Shield, Zap, Gift, Phone } from "lucide-react"

const subscriptionPlans = [
  {
    name: "Essential Care",
    monthlyPrice: 89,
    yearlyPrice: 890,
    savings: 178,
    popular: false,
    description: "Perfect for regular maintenance and basic protection",
    features: [
      "Monthly exterior wash & wax",
      "Interior vacuum & wipe down",
      "Tire shine & wheel cleaning",
      "Window cleaning (interior & exterior)",
      "Priority booking",
      "10% discount on additional services",
    ],
    includes: {
      visits: "1 per month",
      duration: "2-3 hours per visit",
      warranty: "Service guarantee",
      support: "Standard support",
    },
  },
  {
    name: "Premium Protection",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    savings: 298,
    popular: true,
    description: "Comprehensive care with advanced protection features",
    features: [
      "Bi-weekly premium detailing",
      "Quarterly paint protection treatment",
      "Deep interior cleaning monthly",
      "Leather conditioning & protection",
      "Engine bay cleaning (quarterly)",
      "Priority emergency service",
      "15% discount on additional services",
      "Free minor scratch repair",
    ],
    includes: {
      visits: "2 per month",
      duration: "3-4 hours per visit",
      warranty: "Extended service warranty",
      support: "Priority support",
    },
  },
  {
    name: "Luxury Elite",
    monthlyPrice: 249,
    yearlyPrice: 2490,
    savings: 498,
    popular: false,
    description: "Ultimate care package for luxury and exotic vehicles",
    features: [
      "Weekly premium detailing service",
      "Monthly ceramic coating maintenance",
      "Paint correction (as needed)",
      "Premium leather restoration",
      "Concierge pickup & delivery",
      "24/7 emergency detailing",
      "20% discount on additional services",
      "Complimentary annual paint protection film",
      "White glove interior treatment",
    ],
    includes: {
      visits: "4 per month",
      duration: "4-6 hours per visit",
      warranty: "Comprehensive warranty",
      support: "VIP concierge support",
    },
  },
]

const addOnServices = [
  {
    name: "Ceramic Coating Refresh",
    price: "$99/month",
    description: "Monthly ceramic coating maintenance and enhancement",
  },
  {
    name: "Paint Protection Film Care",
    price: "$79/month",
    description: "Specialized care for paint protection film surfaces",
  },
  {
    name: "Concierge Service",
    price: "$149/month",
    description: "Pickup and delivery service for ultimate convenience",
  },
  {
    name: "Emergency Response",
    price: "$59/month",
    description: "24/7 emergency detailing service availability",
  },
]

const benefits = [
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book appointments that fit your schedule with priority access",
  },
  {
    icon: Shield,
    title: "Service Guarantee",
    description: "100% satisfaction guarantee on all subscription services",
  },
  {
    icon: Zap,
    title: "Priority Service",
    description: "Skip the wait with priority booking and faster service",
  },
  {
    icon: Gift,
    title: "Exclusive Discounts",
    description: "Save on additional services and premium upgrades",
  },
]

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <Calendar className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Subscription Plans</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto mb-8">
            Keep your vehicle in pristine condition year-round with our convenient subscription plans. Regular care,
            priority service, and exclusive benefits.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-text-light">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-red-primary"
            />
            <Label htmlFor="billing-toggle" className="text-text-light">
              Yearly
            </Label>
            <Badge className="bg-red-primary hover:bg-red-secondary ml-2">Save up to 20%</Badge>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 relative ${plan.popular ? "ring-2 ring-red-primary/50" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-red-primary hover:bg-red-secondary">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-text-warm mb-2">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-red-primary">
                      ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                      <span className="text-lg text-text-light/60">/month</span>
                    </div>
                    {isYearly && <div className="text-sm text-green-400">Save ${plan.savings} per year</div>}
                  </div>
                  <p className="text-text-light/70 mt-4">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-text-light/60">Visits</div>
                        <div className="text-text-warm font-medium">{plan.includes.visits}</div>
                      </div>
                      <div>
                        <div className="text-text-light/60">Duration</div>
                        <div className="text-text-warm font-medium">{plan.includes.duration}</div>
                      </div>
                      <div>
                        <div className="text-text-light/60">Warranty</div>
                        <div className="text-text-warm font-medium">{plan.includes.warranty}</div>
                      </div>
                      <div>
                        <div className="text-text-light/60">Support</div>
                        <div className="text-text-warm font-medium">{plan.includes.support}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-text-light/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${plan.popular ? "bg-red-primary hover:bg-red-secondary" : "bg-black-rich border border-red-primary/30 hover:bg-red-primary/20"} text-text-warm`}
                  >
                    {plan.popular ? "Start Free Trial" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-black-deep/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Subscription Benefits</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Enjoy exclusive perks and priority service with any subscription plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-black-deep/50 border-red-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-primary/20 rounded-full mb-4">
                    <benefit.icon className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-warm mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-light/70">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Premium Add-Ons</h2>
            <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
              Enhance your subscription with these specialized services for the ultimate care experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black-deep/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-warm mb-2">Can I pause or cancel my subscription?</h3>
                <p className="text-text-light/70">
                  Yes, you can pause your subscription for up to 3 months or cancel anytime with 30 days notice. No
                  cancellation fees apply.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-warm mb-2">
                  What if I need to reschedule an appointment?
                </h3>
                <p className="text-text-light/70">
                  Subscribers get priority rebooking with 24-hour notice. We'll work with your schedule to find the best
                  alternative time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-warm mb-2">Are there any additional fees?</h3>
                <p className="text-text-light/70">
                  No hidden fees. Your subscription includes all listed services. Additional services are available at
                  discounted subscriber rates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-warm mb-2">Do you offer a free trial?</h3>
                <p className="text-text-light/70">
                  Yes! New subscribers get their first service free to experience our premium quality before committing
                  to a plan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-primary/20 to-red-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-6">Ready to Start Your Subscription?</h2>
          <p className="text-lg text-text-light/80 max-w-2xl mx-auto mb-8">
            Join hundreds of satisfied customers who trust us with their vehicle care. Start with a free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button size="lg" className="bg-red-primary hover:bg-red-secondary text-text-warm">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
            >
              Compare Plans
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-text-light/70">
            <Phone className="w-4 h-4" />
            <span>Questions? Call us at +61436920067</span>
          </div>
        </div>
      </section>
    </div>
  )
}
