"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { createBooking, type BookingFormData } from "@/lib/booking-service"

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [vehicleType, setVehicleType] = useState("")
  const [condition, setCondition] = useState("")
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    postcode: "",
    preferredDate: "",
    preferredTime: "",
    specialInstructions: "",
  })

  const services = [
    { id: "essential", name: "Essential Detail", price: 95, description: "Quick maintenance clean" },
    { id: "premium", name: "Premium Interior", price: 250, description: "Deep interior reset" },
    { id: "signature", name: "Signature Detail", price: 290, description: "Most popular full service", popular: true },
    { id: "elite", name: "Elite Detail", price: 345, description: "Enhanced shine with machine polish" },
    { id: "showroom", name: "Showroom Package", price: 395, description: "Photo-ready perfection" },
  ]

  const addOns = [
    { id: "pet-hair", name: "Pet Hair Removal", price: 25 },
    { id: "odour", name: "Odour Neutraliser Treatment", price: 35 },
    { id: "fabric-protection", name: "Fabric/Upholstery Protection", price: 45 },
    { id: "premium-scent", name: "Premium Air Freshener Upgrade", price: 20 },
    { id: "headlight", name: "Headlight Restoration", price: 60 },
    { id: "steam", name: "Steam Sanitation", price: 50 },
  ]

  const vehicleTypes = [
    { id: "sedan", name: "Sedan/Hatchback", surcharge: 0 },
    { id: "suv", name: "SUV", surcharge: 15 },
    { id: "large", name: "7-seater/Ute/Van", surcharge: 25 },
  ]

  const conditions = [
    { id: "light", name: "Light soil", surcharge: 0 },
    { id: "medium", name: "Medium soil", surcharge: 20 },
    { id: "heavy", name: "Heavy soil", surcharge: 40 },
  ]

  const calculateTotal = () => {
    const service = services.find((s) => s.id === selectedService)
    const vehicle = vehicleTypes.find((v) => v.id === vehicleType)
    const conditionSurcharge = conditions.find((c) => c.id === condition)
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    const basePrice = service?.price || 0
    const vehicleSurcharge = vehicle?.surcharge || 0
    const conditionFee = conditionSurcharge?.surcharge || 0

    return basePrice + vehicleSurcharge + conditionFee + addOnTotal
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitBooking = async () => {
    setIsSubmitting(true)

    try {
      const bookingData: BookingFormData = {
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        serviceType: selectedService,
        vehicleType,
        vehicleCondition: condition,
        addOns: selectedAddOns,
        totalPrice: calculateTotal(),
        preferredDate: customerDetails.preferredDate || undefined,
        preferredTime: customerDetails.preferredTime || undefined,
        address: customerDetails.address,
        suburb: customerDetails.suburb,
        postcode: customerDetails.postcode,
        specialInstructions: customerDetails.specialInstructions || undefined,
      }

      const result = await createBooking(bookingData)

      if (result.success) {
        toast({
          title: "Booking Confirmed!",
          description: "We'll contact you within 2 hours to confirm your appointment details.",
        })
        setStep(4)
      } else {
        toast({
          title: "Booking Failed",
          description: result.error || "Please try again or contact us directly.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      {/* Navigation */}
      <Navigation />

      {/* Booking Form */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-apex-light-yellow mb-4">
              Book Your Detailing Service
            </h1>
            <p className="text-xl text-apex-light-yellow/80">Get your car professionally detailed at your location</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNum
                        ? "bg-apex-bright-red text-apex-light-yellow"
                        : "bg-apex-teal-blue/30 text-apex-light-yellow/70"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div
                      className={`w-12 h-0.5 ${step > stepNum ? "bg-apex-bright-red" : "bg-apex-teal-blue/30"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
                <CardContent className="p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-apex-light-yellow mb-4">Choose Your Service</h2>
                        <div className="space-y-4">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedService === service.id
                                  ? "border-apex-bright-red bg-apex-bright-red/10"
                                  : "border-apex-teal-blue hover:border-apex-orange-yellow"
                              }`}
                              onClick={() => setSelectedService(service.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="text-lg font-semibold text-apex-light-yellow">{service.name}</h3>
                                    {service.popular && (
                                      <Badge className="bg-apex-bright-red text-apex-light-yellow text-xs">
                                        Popular
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-apex-light-yellow/70 text-sm">{service.description}</p>
                                </div>
                                <div className="text-lg font-bold text-apex-orange-yellow">From ${service.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!selectedService}
                        className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                      >
                        Continue to Vehicle Details
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-apex-light-yellow mb-4">Vehicle Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-apex-light-yellow mb-2 block">Vehicle Type</Label>
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                              <SelectTrigger className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                              <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                                {vehicleTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id} className="text-apex-light-yellow">
                                    {type.name} {type.surcharge > 0 && `(+$${type.surcharge})`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-apex-light-yellow mb-2 block">Vehicle Condition</Label>
                            <Select value={condition} onValueChange={setCondition}>
                              <SelectTrigger className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                                <SelectValue placeholder="Select condition level" />
                              </SelectTrigger>
                              <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                                {conditions.map((cond) => (
                                  <SelectItem key={cond.id} value={cond.id} className="text-apex-light-yellow">
                                    {cond.name} {cond.surcharge > 0 && `(+$${cond.surcharge})`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-apex-light-yellow mb-4">Add-on Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {addOns.map((addOn) => (
                            <div key={addOn.id} className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedAddOns.includes(addOn.id)}
                                onChange={() => toggleAddOn(addOn.id)}
                                className="cursor-pointer accent-apex-bright-red"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-apex-light-yellow">{addOn.name}</h4>
                                <p className="text-apex-light-yellow/70 text-xs">{`+$${addOn.price}`}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(3)}
                        disabled={!vehicleType || !condition}
                        className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                      >
                        Continue to Contact Details
                      </Button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-apex-light-yellow mb-4">Contact & Location Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-apex-light-yellow mb-2 block">
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              required
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                              placeholder="Your full name"
                              value={customerDetails.name}
                              onChange={(e) => handleCustomerDetailsChange("name", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-apex-light-yellow mb-2 block">
                              Phone Number *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                              placeholder="0412 345 678"
                              value={customerDetails.phone}
                              onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <Label htmlFor="email" className="text-apex-light-yellow mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                            placeholder="your.email@example.com"
                            value={customerDetails.email}
                            onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
                          />
                        </div>

                        <div className="mt-4">
                          <Label htmlFor="address" className="text-apex-light-yellow mb-2 block">
                            Service Address *
                          </Label>
                          <Input
                            id="address"
                            type="text"
                            required
                            className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                            placeholder="123 Main Street"
                            value={customerDetails.address}
                            onChange={(e) => handleCustomerDetailsChange("address", e.target.value)}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                          <div>
                            <Label htmlFor="suburb" className="text-apex-light-yellow mb-2 block">
                              Suburb *
                            </Label>
                            <Input
                              id="suburb"
                              type="text"
                              required
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                              placeholder="Caloundra"
                              value={customerDetails.suburb}
                              onChange={(e) => handleCustomerDetailsChange("suburb", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="postcode" className="text-apex-light-yellow mb-2 block">
                              Postcode *
                            </Label>
                            <Input
                              id="postcode"
                              type="text"
                              required
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                              placeholder="4551"
                              value={customerDetails.postcode}
                              onChange={(e) => handleCustomerDetailsChange("postcode", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                          <div>
                            <Label htmlFor="preferredDate" className="text-apex-light-yellow mb-2 block">
                              Preferred Date
                            </Label>
                            <Input
                              id="preferredDate"
                              type="date"
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow"
                              value={customerDetails.preferredDate}
                              onChange={(e) => handleCustomerDetailsChange("preferredDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="preferredTime" className="text-apex-light-yellow mb-2 block">
                              Preferred Time
                            </Label>
                            <Input
                              id="preferredTime"
                              type="time"
                              className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow"
                              value={customerDetails.preferredTime}
                              onChange={(e) => handleCustomerDetailsChange("preferredTime", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <Label htmlFor="specialInstructions" className="text-apex-light-yellow mb-2 block">
                            Special Instructions
                          </Label>
                          <Textarea
                            id="specialInstructions"
                            rows={3}
                            className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50 resize-none"
                            placeholder="Any special requirements, access instructions, or notes..."
                            value={customerDetails.specialInstructions}
                            onChange={(e) => handleCustomerDetailsChange("specialInstructions", e.target.value)}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSubmitBooking}
                        disabled={
                          !customerDetails.name ||
                          !customerDetails.email ||
                          !customerDetails.phone ||
                          !customerDetails.address ||
                          !customerDetails.suburb ||
                          !customerDetails.postcode ||
                          isSubmitting
                        }
                        className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                      >
                        {isSubmitting ? "Submitting Booking..." : "Confirm Booking"}
                      </Button>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6 text-center">
                      <div>
                        <h2 className="text-2xl font-bold text-apex-light-yellow mb-4">Booking Confirmed!</h2>
                        <p className="text-apex-light-yellow/80 mb-4">
                          Thank you for choosing Apex Auto Detailers. We'll contact you within 2 hours to confirm your
                          appointment details.
                        </p>
                        <p className="text-apex-light-yellow/70 text-sm">
                          You'll receive an SMS confirmation with our arrival time and any final details.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          asChild
                          className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                        >
                          <Link href="/">Back to Home</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
                        >
                          <Link href="/services">View All Services</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-apex-teal-blue/20 border-apex-teal-blue sticky top-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-apex-light-yellow mb-4">Booking Summary</h2>

                  {selectedService && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-apex-light-yellow/80">Service:</span>
                        <span className="text-apex-light-yellow font-semibold">
                          {services.find((s) => s.id === selectedService)?.name}
                        </span>
                      </div>

                      {vehicleType && (
                        <div className="flex justify-between items-center">
                          <span className="text-apex-light-yellow/80">Vehicle:</span>
                          <span className="text-apex-light-yellow">
                            {vehicleTypes.find((v) => v.id === vehicleType)?.name}
                          </span>
                        </div>
                      )}

                      {condition && (
                        <div className="flex justify-between items-center">
                          <span className="text-apex-light-yellow/80">Condition:</span>
                          <span className="text-apex-light-yellow">
                            {conditions.find((c) => c.id === condition)?.name}
                          </span>
                        </div>
                      )}

                      {selectedAddOns.length > 0 && (
                        <div>
                          <span className="text-apex-light-yellow/80 block mb-2">Add-ons:</span>
                          <ul className="space-y-1">
                            {selectedAddOns.map((addOnId) => (
                              <li key={addOnId} className="text-apex-light-yellow text-sm">
                                • {addOns.find((a) => a.id === addOnId)?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="border-t border-apex-teal-blue pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-apex-light-yellow">Total:</span>
                          <span className="text-2xl font-bold text-apex-orange-yellow">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!selectedService && (
                    <p className="text-apex-light-yellow/70 text-sm">Please select a service to see pricing details.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
