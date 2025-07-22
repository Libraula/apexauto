import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Clock, Shield, Gift } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function SubscriptionsPage() {
  const plans = [
    {
      name: "Maintain Me",
      price: "$99",
      originalPrice: "$120",
      savings: "Save $21/month",
      description: "Perfect for light users who want consistent maintenance",
      features: [
        "1x Essential Detail per month",
        "Priority scheduling",
        "SMS reminders for bookings",
        "Flexible date selection",
        "Cancel anytime",
      ],
      popular: false,
      color: "from-apex-teal-blue to-apex-dark-orange",
    },
    {
      name: "Stay Fresh",
      price: "$159",
      originalPrice: "$200",
      savings: "Save $41/month",
      description: "Ideal for families and regular drivers",
      features: [
        "Choice: 1x Essential + 1x Premium Interior OR 2x Essential",
        "Priority scheduling",
        "Free premium scent every visit",
        "SMS reminders and updates",
        "Flexible service combinations",
      ],
      popular: true,
      color: "from-apex-bright-red to-apex-orange-yellow",
    },
    {
      name: "Executive Clean",
      price: "$199",
      originalPrice: "$290",
      savings: "Save $91/month",
      description: "Premium service for executives and car enthusiasts",
      features: [
        "2x Signature Details per month",
        "Priority booking window",
        "$20 off any add-on services",
        "Dedicated customer support",
        "Quarterly service review",
      ],
      popular: false,
      color: "from-apex-dark-orange to-apex-teal-blue",
    },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-apex-teal-blue/20 text-apex-teal-blue border-apex-teal-blue/30 mb-4">
              Save up to 30% with Monthly Plans
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-6">
              Keep Your Car Clean All Year
            </h1>
            <p className="text-xl text-apex-light-yellow/80 mb-8">
              Monthly subscription plans that save you money while keeping your car consistently clean. Priority
              scheduling and exclusive perks included.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300 ${plan.popular ? "ring-2 ring-apex-bright-red scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-apex-bright-red text-apex-light-yellow px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <Star className="w-8 h-8 text-apex-light-yellow" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-apex-light-yellow">{plan.name}</CardTitle>
                  <CardDescription className="text-apex-light-yellow/70 mt-2">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-apex-light-yellow">{plan.price}</span>
                      <span className="text-apex-light-yellow/70">/month</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-apex-light-yellow/50 line-through text-sm">
                        {plan.originalPrice}/month one-off
                      </span>
                    </div>
                    <Badge variant="outline" className="border-apex-orange-yellow text-apex-orange-yellow mt-2">
                      {plan.savings}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-apex-light-yellow/80">
                        <Check className="w-5 h-5 text-apex-orange-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/subscribe" className="block">
                    <Button
                      className={`w-full ${plan.popular ? "bg-apex-bright-red hover:bg-apex-bright-red/90" : "bg-apex-dark-orange hover:bg-apex-dark-orange/90"} text-apex-light-yellow font-semibold`}
                    >
                      Subscribe to {plan.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-apex-light-yellow mb-4">Why Subscribe to Apex?</h2>
            <p className="text-xl text-apex-light-yellow/80">
              More than just savings - enjoy exclusive subscriber benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Priority Scheduling",
                description: "Book your preferred time slots before one-off customers",
              },
              {
                icon: Shield,
                title: "Consistent Quality",
                description: "Same high standards every visit with detailed service records",
              },
              {
                icon: Star,
                title: "Exclusive Perks",
                description: "Free premium scents, discounted add-ons, and special offers",
              },
              {
                icon: Gift,
                title: "Annual Bonus",
                description: "After 12 months, receive 1 free Elite Detail as a loyalty reward",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue text-center hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6">
                  <benefit.icon className="w-12 h-12 text-apex-orange-yellow mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-apex-light-yellow mb-2">{benefit.title}</h3>
                  <p className="text-apex-light-yellow/70 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-apex-light-yellow mb-4">How Monthly Plans Work</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose Your Plan",
                description: "Select the subscription plan that fits your needs and budget",
              },
              {
                step: "2",
                title: "Book Your First Visit",
                description: "Schedule your first appointment immediately after subscribing",
              },
              {
                step: "3",
                title: "Enjoy Regular Service",
                description: "We'll remind you monthly to schedule your next visit",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-apex-bright-red text-apex-light-yellow rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-apex-light-yellow mb-2">{step.title}</h3>
                <p className="text-apex-light-yellow/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-apex-light-yellow mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
              },
              {
                question: "What happens if I miss a month?",
                answer:
                  "No problem! Your subscription credits don't expire. You can use them whenever it's convenient for you.",
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "You can change your plan at any time. Changes take effect on your next billing cycle.",
              },
              {
                question: "Do you offer family or multi-car discounts?",
                answer:
                  "Yes! Contact us for special pricing if you have multiple vehicles that need regular detailing.",
              },
              {
                question: "What's included in the annual loyalty bonus?",
                answer:
                  "After 12 consecutive months of subscription, you'll receive one free Elite Detail service (valued at $345+).",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-apex-light-yellow mb-2">{faq.question}</h3>
                  <p className="text-apex-light-yellow/70">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-apex-teal-blue/20 to-apex-dark-orange/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-apex-light-yellow mb-6">
            Ready to Save with Monthly Plans?
          </h2>
          <p className="text-xl text-apex-light-yellow/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied subscribers who keep their cars consistently clean while saving money
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe">
              <Button size="lg" className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow px-8">
                Start Your Subscription
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
              >
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
