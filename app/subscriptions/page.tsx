"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CheckCircle, Star, Crown, Zap, Calendar, Gift, MapPin, Truck } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Essential",
    icon: <Zap className="h-8 w-8" />,
    price: "$89",
    period: "month",
    description: "Perfect for regular maintenance with our Custom Detail service",
    popular: false,
    features: [
      "Monthly Custom Detail service",
      "Exterior hand wash",
      "Wheel & tire clean + shine",
      "Windows cleaned",
      "Interior wipe-down",
      "Light vacuum (mats & seats)",
      "Priority booking",
      "10% discount on add-ons",
    ],
    savings: "Save $30/month",
  },
  {
    name: "Premium",
    icon: <Star className="h-8 w-8" />,
    price: "$199",
    period: "month",
    description: "Comprehensive care with Interior Detail included",
    popular: true,
    features: [
      "Bi-weekly Custom Detail service",
      "Monthly Interior Detail service",
      "Deep vacuum & shampooing",
      "Leather cleaned & conditioned",
      "Premium scent treatment",
      "Priority booking & scheduling",
      "15% discount on add-ons",
      "Free pickup & delivery",
    ],
    savings: "Save $80/month",
  },
  {
    name: "Elite",
    icon: <Crown className="h-8 w-8" />,
    price: "$299",
    period: "month",
    description: "Ultimate care package with Full Detail service",
    popular: false,
    features: [
      "Weekly Custom Detail service",
      "Monthly Full Detail service",
      "Paint polishing & protection",
      "Complete interior restoration",
      "Engine bay cleaning (quarterly)",
      "Concierge pickup & delivery",
      "24/7 priority support",
      "20% discount on all services",
      "Complimentary car care products",
      "Annual Pre-Sale Detail included",
    ],
    savings: "Save $150/month",
  },
]

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-black-rich">
      <Navigation />

      {/* Hero Section */}
      <section className="premium-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Truck className="h-8 w-8 text-red-primary" />
            <Badge className="bg-red-primary/20 text-red-primary border-red-primary/30 px-4 py-2">
              Mobile Subscription Plans
            </Badge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-warm mb-6">
            Maintain Your Vehicle's
            <span className="text-red-primary block">Perfect Condition</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-accent-gold" />
            <p className="text-lg text-text-light/80">We come to you – Sunshine Coast & surrounds</p>
          </div>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto mb-8">
            Choose from our flexible mobile subscription plans designed to keep your vehicle looking pristine
            year-round. Save money while ensuring consistent, professional care at your location.
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

      {/* Pricing Plans */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`premium-card relative ${
                  plan.popular ? "border-red-primary/60 ring-2 ring-red-primary/30 scale-105" : "border-red-primary/20"
                } hover:border-red-primary/40 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-primary text-text-warm px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-red-primary/20 rounded-xl flex items-center justify-center text-red-primary mx-auto mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-text-warm">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-accent-gold">
                        {isYearly ? `$${Math.floor(Number.parseInt(plan.price.replace("$", "")) * 0.8)}` : plan.price}
                      </span>
                      <span className="text-text-light/60 ml-1">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-red-primary font-medium">{plan.savings}</p>
                  </div>
                  <p className="text-text-light/70 mt-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-red-primary flex-shrink-0 mt-0.5" />
                        <span className="text-text-light/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-red-primary hover:bg-red-secondary text-text-warm"
                        : "bg-transparent border border-red-primary text-red-primary hover:bg-red-primary hover:text-text-warm"
                    }`}
                  >
                    <Link href="/book">Choose {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">Why Choose a Mobile Subscription?</h2>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Experience the benefits of consistent, professional mobile car care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Significant Savings",
                description: "Save up to 40% compared to individual mobile services",
                icon: Gift,
              },
              {
                title: "We Come to You",
                description: "Professional service at your home or office location",
                icon: Truck,
              },
              {
                title: "Consistent Care",
                description: "Regular maintenance keeps your car in perfect condition",
                icon: Star,
              },
              {
                title: "Flexible Plans",
                description: "Pause, modify, or cancel your subscription anytime",
                icon: Calendar,
              },
            ].map((benefit, index) => (
              <Card key={index} className="premium-card border-red-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-warm mb-2">{benefit.title}</h3>
                  <p className="text-text-light/70">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">Service Areas</h2>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MapPin className="h-6 w-6 text-red-primary" />
              <p className="text-xl text-text-light/70">We come to you – Sunshine Coast & surrounds</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="premium-card border-red-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-text-warm mb-4">Primary Service Areas:</h3>
                    <ul className="space-y-2 text-text-light/80">
                      <li>• Sunshine Coast</li>
                      <li>• Noosa</li>
                      <li>• Maroochydore</li>
                      <li>• Caloundra</li>
                      <li>• Nambour</li>
                      <li>• Buderim</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-warm mb-4">Extended Areas:</h3>
                    <ul className="space-y-2 text-text-light/80">
                      <li>• Glass House Mountains</li>
                      <li>• Beerwah</li>
                      <li>• Landsborough</li>
                      <li>• Maleny</li>
                      <li>• Montville</li>
                      <li>• Cooroy</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-primary/10 rounded-lg border border-red-primary/30">
                  <p className="text-text-light/80 text-center">
                    Don't see your area? Contact us to check if we can service your location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I pause my subscription?",
                answer:
                  "Yes, you can pause your subscription for up to 3 months at any time. Perfect for vacations or extended travel.",
              },
              {
                question: "What if I need to reschedule?",
                answer:
                  "Subscribers get priority rebooking. You can reschedule up to 24 hours before your appointment with no penalty.",
              },
              {
                question: "Are there any long-term contracts?",
                answer:
                  "No long-term contracts required. You can modify or cancel your subscription with 30 days notice.",
              },
              {
                question: "What happens if my car needs extra work?",
                answer: "Subscribers receive discounted rates on all additional services not included in their plan.",
              },
              {
                question: "Do you bring your own water and power?",
                answer: "Yes, our mobile units are fully self-contained with water tanks and power systems.",
              },
            ].map((faq, index) => (
              <Card key={index} className="premium-card border-red-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-warm mb-2">{faq.question}</h3>
                  <p className="text-text-light/70">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-red-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-warm mb-6">Start Your Mobile Subscription Today</h2>
          <p className="text-xl text-text-light/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us with their vehicle's care. Choose your plan and experience
            the convenience of mobile subscription detailing across the Sunshine Coast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-text-warm text-black-rich hover:bg-text-light font-semibold px-8 py-4"
            >
              <Link href="/book">Choose Your Plan</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-text-warm text-text-warm hover:bg-text-warm hover:text-black-rich px-8 py-4 bg-transparent"
            >
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
