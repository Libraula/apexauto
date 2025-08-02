"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Star, Calendar, Shield, Headphones, DollarSign } from "lucide-react"
import {
  getSubscriptionPlans,
  createSubscription,
  type SubscriptionPlan,
  type SubscriptionFormData,
} from "@/lib/subscription-service"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [billingType, setBillingType] = useState<"monthly" | "yearly">("monthly")
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceAddress: "",
    specialInstructions: "",
  })

  useEffect(() => {
    loadSubscriptionPlans()
  }, [])

  const loadSubscriptionPlans = async () => {
    setLoading(true)
    try {
      const result = await getSubscriptionPlans()
      if (result.success && result.data) {
        setSubscriptionPlans(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading subscription plans:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading subscription plans",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) return

    if (!formData.customerName || !formData.customerEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const subscriptionData: SubscriptionFormData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone || undefined,
        planId: selectedPlan.id,
        billingType: billingType,
        serviceAddress: formData.serviceAddress || undefined,
        specialInstructions: formData.specialInstructions || undefined,
      }

      const result = await createSubscription(subscriptionData)

      if (result.success) {
        toast({
          title: "Subscription Created!",
          description: "Welcome to Apex Auto Detailers! We'll contact you soon to schedule your first service.",
        })

        // Reset form and close dialog
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          serviceAddress: "",
          specialInstructions: "",
        })
        setSelectedPlan(null)

        // Redirect to success page or home
        router.push("/?subscription=success")
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "There was an error creating your subscription. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Subscription creation error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPrice = (plan: SubscriptionPlan) => {
    return billingType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan: SubscriptionPlan) => {
    if (billingType === "yearly") {
      return plan.savings
    }
    return 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-primary mx-auto mb-4"></div>
          <p className="text-text-light">Loading subscription plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-warm mb-4">Subscription Plans</h1>
          <p className="text-xl text-text-light/70 max-w-2xl mx-auto mb-8">
            Keep your vehicle in pristine condition year-round with our convenient subscription plans.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <RadioGroup
              value={billingType}
              onValueChange={(value) => setBillingType(value as "monthly" | "yearly")}
              className="flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="text-text-light cursor-pointer">
                  Monthly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="text-text-light cursor-pointer">
                  Yearly{" "}
                  <Badge variant="secondary" className="ml-2 bg-green-600">
                    Save up to $498
                  </Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-black-deep/50 border-2 transition-all hover:border-red-primary/60 ${
                plan.isPopular ? "border-red-primary/40 scale-105" : "border-red-primary/20"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-primary text-white px-4 py-1 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-text-warm mb-2">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-red-primary">${getPrice(plan)}</span>
                    <span className="text-text-light/60 ml-2">/{billingType === "monthly" ? "month" : "year"}</span>
                  </div>
                  {getSavings(plan) > 0 && (
                    <div className="text-green-500 font-medium">Save ${getSavings(plan)} per year</div>
                  )}
                </div>
                {plan.description && <p className="text-text-light/70 text-sm mt-2">{plan.description}</p>}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Service Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-text-light">
                    <Calendar className="w-4 h-4 text-red-primary mr-2" />
                    <span>{plan.visitsPerMonth}</span>
                  </div>
                  <div className="flex items-center text-text-light">
                    <Shield className="w-4 h-4 text-red-primary mr-2" />
                    <span>{plan.warranty}</span>
                  </div>
                  <div className="flex items-center text-text-light col-span-2">
                    <Headphones className="w-4 h-4 text-red-primary mr-2" />
                    <span>{plan.supportLevel}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-text-warm">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-text-light">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Duration */}
                <div className="bg-black-rich/50 p-3 rounded-lg">
                  <div className="text-sm text-text-light/70 mb-1">Service Duration</div>
                  <div className="text-text-warm font-medium">{plan.durationPerVisit}</div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-red-primary hover:bg-red-secondary"
                          : "bg-transparent border border-red-primary/30 text-text-light hover:border-red-primary/60 hover:bg-red-primary/10"
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      Choose {plan.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black-deep border-red-primary/20 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-text-warm">Subscribe to {selectedPlan?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedPlan && (
                      <div className="space-y-4">
                        <div className="bg-black-rich/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-text-light">Plan:</span>
                            <span className="text-text-warm font-medium">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-text-light">Billing:</span>
                            <span className="text-text-warm font-medium capitalize">{billingType}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-light">Price:</span>
                            <span className="text-red-primary font-bold text-lg">
                              ${getPrice(selectedPlan)}/{billingType === "monthly" ? "mo" : "yr"}
                            </span>
                          </div>
                          {getSavings(selectedPlan) > 0 && (
                            <div className="text-green-500 text-sm mt-1">
                              You save ${getSavings(selectedPlan)} per year!
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="customerName" className="text-text-light">
                                Full Name *
                              </Label>
                              <Input
                                id="customerName"
                                value={formData.customerName}
                                onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                                className="bg-black-rich border-red-primary/30 text-text-light"
                                placeholder="Enter your name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="customerEmail" className="text-text-light">
                                Email *
                              </Label>
                              <Input
                                id="customerEmail"
                                type="email"
                                value={formData.customerEmail}
                                onChange={(e) => setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
                                className="bg-black-rich border-red-primary/30 text-text-light"
                                placeholder="Enter your email"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="customerPhone" className="text-text-light">
                              Phone Number
                            </Label>
                            <Input
                              id="customerPhone"
                              type="tel"
                              value={formData.customerPhone}
                              onChange={(e) => setFormData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                              className="bg-black-rich border-red-primary/30 text-text-light"
                              placeholder="Enter your phone number"
                            />
                          </div>

                          <div>
                            <Label htmlFor="serviceAddress" className="text-text-light">
                              Service Address
                            </Label>
                            <Input
                              id="serviceAddress"
                              value={formData.serviceAddress}
                              onChange={(e) => setFormData((prev) => ({ ...prev, serviceAddress: e.target.value }))}
                              className="bg-black-rich border-red-primary/30 text-text-light"
                              placeholder="Where should we service your vehicle?"
                            />
                          </div>

                          <div>
                            <Label htmlFor="specialInstructions" className="text-text-light">
                              Special Instructions
                            </Label>
                            <Textarea
                              id="specialInstructions"
                              value={formData.specialInstructions}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))
                              }
                              className="bg-black-rich border-red-primary/30 text-text-light"
                              placeholder="Any special requests or notes..."
                              rows={3}
                            />
                          </div>
                        </div>

                        <Button
                          onClick={handleSubscribe}
                          disabled={isSubmitting}
                          className="w-full bg-red-primary hover:bg-red-secondary"
                        >
                          {isSubmitting ? "Creating Subscription..." : "Subscribe Now"}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-black-deep/50 border-red-primary/20">
            <CardHeader>
              <CardTitle className="text-text-warm text-center">Why Choose Our Subscription Plans?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="font-semibold text-text-warm mb-2">Save Money</h3>
                  <p className="text-text-light/70 text-sm">
                    Subscription plans offer significant savings compared to individual services.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="font-semibold text-text-warm mb-2">Convenience</h3>
                  <p className="text-text-light/70 text-sm">
                    Automatic scheduling ensures your vehicle is always maintained without the hassle.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="font-semibold text-text-warm mb-2">Priority Service</h3>
                  <p className="text-text-light/70 text-sm">
                    Subscribers get priority booking and exclusive access to premium services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
