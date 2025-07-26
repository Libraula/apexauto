"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, MapPin, Car, DollarSign, CheckCircle, Truck, Sparkles, Award, Zap } from "lucide-react"

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: "",
    vehicleType: "",
    addOns: [] as string[],
    date: "",
    time: "",
    location: "",
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const services = [
    {
      id: "custom-detail",
      name: "Custom Detail",
      price: 95,
      duration: "1-2 hours",
      icon: Car,
      features: [
        "Exterior hand wash",
        "Wheel & tire clean + shine",
        "Windows cleaned",
        "Interior wipe-down",
        "Light vacuum (mats & seats)",
      ],
      perfect: "Perfect for regular upkeep",
    },
    {
      id: "interior-detail",
      name: "Interior Detail",
      price: 250,
      duration: "3-4 hours",
      icon: Sparkles,
      features: [
        "Deep vacuum (seats, carpets, boot)",
        "Seats & carpet shampooed (if required)",
        "Leather cleaned & conditioned",
        "Dashboard, console, vents cleaned",
        "Streak-free interior glass",
        "Premium scent / deodoriser spray",
      ],
      perfect: "Showroom-level interior finish",
    },
    {
      id: "full-detail",
      name: "Full Detail",
      price: 345,
      duration: "4-6 hours",
      icon: Award,
      features: [
        "Complete interior detail (see above)",
        "Exterior hand wash + clay bar",
        "Polishing & wax/sealant protection",
        "Wheels, trims, badges detailed",
      ],
      perfect: "Best for full restoration or events",
    },
    {
      id: "pre-sale-detail",
      name: "Pre-Sale Detail",
      price: 395,
      duration: "5-7 hours",
      icon: Zap,
      features: ["Full detail package", "Engine bay clean", "Paint enhancement", "Odour neutraliser"],
      perfect: "Get top dollar when selling your car",
    },
  ]

  const vehicleTypes = [
    { id: "sedan", name: "Sedan", multiplier: 1 },
    { id: "hatchback", name: "Hatchback", multiplier: 1 },
    { id: "suv", name: "SUV", multiplier: 1.2 },
    { id: "ute", name: "Ute/Truck", multiplier: 1.3 },
    { id: "van", name: "Van", multiplier: 1.4 },
    { id: "luxury", name: "Luxury Vehicle", multiplier: 1.5 },
  ]

  const addOns = [
    { id: "engine", name: "Engine Bay Cleaning", price: 49 },
    { id: "pet-hair", name: "Pet Hair Removal", price: 39 },
    { id: "odor", name: "Odour Elimination", price: 59 },
    { id: "scratch", name: "Scratch Repair", price: 79 },
    { id: "headlight", name: "Headlight Restoration", price: 89 },
    { id: "protection", name: "Paint Protection", price: 149 },
  ]

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ]

  const calculateTotal = () => {
    const selectedService = services.find((s) => s.id === bookingData.service)
    const selectedVehicle = vehicleTypes.find((v) => v.id === bookingData.vehicleType)
    const selectedAddOns = addOns.filter((a) => bookingData.addOns.includes(a.id))

    if (!selectedService || !selectedVehicle) return 0

    const basePrice = selectedService.price * selectedVehicle.multiplier
    const addOnPrice = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)

    return Math.round(basePrice + addOnPrice)
  }

  const handleServiceSelect = (serviceId: string) => {
    setBookingData({ ...bookingData, service: serviceId })
  }

  const handleVehicleSelect = (vehicleId: string) => {
    setBookingData({ ...bookingData, vehicleType: vehicleId })
  }

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = bookingData.addOns.includes(addOnId)
      ? bookingData.addOns.filter((id) => id !== addOnId)
      : [...bookingData.addOns, addOnId]

    setBookingData({ ...bookingData, addOns: newAddOns })
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("customer.")) {
      const customerField = field.replace("customer.", "")
      setBookingData({
        ...bookingData,
        customerInfo: {
          ...bookingData.customerInfo,
          [customerField]: value,
        },
      })
    } else {
      setBookingData({ ...bookingData, [field]: value })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate booking submission
    setTimeout(() => {
      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been confirmed. We'll send you a confirmation email shortly.",
      })
      setIsSubmitting(false)
      setStep(4) // Success step
    }, 2000)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-black-rich">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 premium-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Truck className="h-8 w-8 text-red-primary" />
            <Badge className="bg-red-primary/20 text-red-primary border-red-primary/30 px-4 py-2">
              Mobile Service Booking
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-warm mb-4 lg:mb-6">
            Book Your Mobile Detail
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-accent-gold" />
            <p className="text-lg text-text-light/80">We come to you – Sunshine Coast & surrounds</p>
          </div>
          <p className="text-lg sm:text-xl text-text-light/80 mb-6 lg:mb-8">
            Schedule your mobile car detailing service in just a few simple steps. We'll come to you at your preferred
            time and location across the Sunshine Coast.
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? "bg-red-primary text-text-warm"
                      : "bg-black-deep text-text-light/70 border border-red-primary/30"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${step > stepNumber ? "bg-red-primary" : "bg-red-primary/30"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-text-light/70">
              Step {step} of 3: {step === 1 ? "Select Service" : step === 2 ? "Choose Date & Time" : "Customer Details"}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {step === 1 && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Service Selection */}
              <div className="lg:col-span-2">
                <Card className="premium-card border-red-primary/20 mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-text-warm flex items-center">
                      <Car className="w-5 h-5 mr-2" />
                      Select Your Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                            bookingData.service === service.id
                              ? "border-red-primary bg-red-primary/10"
                              : "border-red-primary/30 hover:border-red-primary/50"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-primary/20 rounded-lg flex items-center justify-center">
                                <service.icon className="w-5 h-5 text-red-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-text-warm text-lg">{service.name}</h3>
                                <p className="text-text-light/70 text-sm">Duration: {service.duration}</p>
                              </div>
                            </div>
                            <Badge className="bg-red-primary text-text-warm">From ${service.price}</Badge>
                          </div>

                          <div className="mb-4">
                            <div className="space-y-2">
                              {service.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-red-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-text-light/80 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 bg-red-primary/10 rounded-lg border border-red-primary/30">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-red-primary" />
                              <span className="text-red-primary font-medium text-sm">{service.perfect}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Type */}
                <Card className="premium-card border-red-primary/20 mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-text-warm">Vehicle Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {vehicleTypes.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          onClick={() => handleVehicleSelect(vehicle.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            bookingData.vehicleType === vehicle.id
                              ? "border-red-primary bg-red-primary/10"
                              : "border-red-primary/30 hover:border-red-primary/50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-text-warm">{vehicle.name}</span>
                            {vehicle.multiplier > 1 && (
                              <Badge variant="outline" className="border-accent-gold text-accent-gold">
                                +{Math.round((vehicle.multiplier - 1) * 100)}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Add-ons */}
                <Card className="premium-card border-red-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-text-warm">Add-On Services (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {addOns.map((addon) => (
                        <div key={addon.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={addon.id}
                            checked={bookingData.addOns.includes(addon.id)}
                            onCheckedChange={() => handleAddOnToggle(addon.id)}
                            className="border-red-primary/30 data-[state=checked]:bg-red-primary data-[state=checked]:border-red-primary"
                          />
                          <Label htmlFor={addon.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="text-text-warm">{addon.name}</span>
                              <span className="text-accent-gold font-semibold">${addon.price}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="premium-card border-red-primary/20 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-text-warm flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookingData.service && bookingData.vehicleType ? (
                      <div className="space-y-4">
                        <div className="border-b border-red-primary/30 pb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-text-warm">
                              {services.find((s) => s.id === bookingData.service)?.name}
                            </span>
                            <span className="text-text-warm">
                              ${services.find((s) => s.id === bookingData.service)?.price}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-text-light/70">
                              {vehicleTypes.find((v) => v.id === bookingData.vehicleType)?.name}
                            </span>
                            {vehicleTypes.find((v) => v.id === bookingData.vehicleType)?.multiplier !== 1 && (
                              <span className="text-accent-gold">
                                +
                                {Math.round(
                                  ((vehicleTypes.find((v) => v.id === bookingData.vehicleType)?.multiplier || 1) - 1) *
                                    100,
                                )}
                                %
                              </span>
                            )}
                          </div>
                        </div>

                        {bookingData.addOns.length > 0 && (
                          <div className="border-b border-red-primary/30 pb-4">
                            <h4 className="text-text-warm font-medium mb-2">Add-ons:</h4>
                            {bookingData.addOns.map((addonId) => {
                              const addon = addOns.find((a) => a.id === addonId)
                              return addon ? (
                                <div key={addonId} className="flex justify-between items-center text-sm mb-1">
                                  <span className="text-text-light/70">{addon.name}</span>
                                  <span className="text-text-warm">${addon.price}</span>
                                </div>
                              ) : null
                            })}
                          </div>
                        )}

                        <div className="flex justify-between items-center text-lg font-bold">
                          <span className="text-text-warm">Total:</span>
                          <span className="text-accent-gold">${calculateTotal()}</span>
                        </div>

                        <Button
                          onClick={nextStep}
                          disabled={!bookingData.service || !bookingData.vehicleType}
                          className="w-full bg-red-primary hover:bg-red-secondary text-text-warm font-semibold"
                        >
                          Continue to Date & Time
                        </Button>
                      </div>
                    ) : (
                      <p className="text-text-light/70 text-center">Select a service and vehicle type to see pricing</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="premium-card border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-text-warm flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="date" className="text-text-warm">
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-black-deep border-red-primary/30 text-text-warm focus:border-red-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-text-warm">
                      Preferred Time
                    </Label>
                    <Select value={bookingData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger className="bg-black-deep border-red-primary/30 text-text-warm focus:border-red-primary">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-deep border-red-primary/30">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-text-warm">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-text-warm">
                      Service Location (Sunshine Coast & surrounds)
                    </Label>
                    <Textarea
                      id="location"
                      value={bookingData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter your full address where you'd like the service performed..."
                      className="bg-black-deep border-red-primary/30 text-text-warm resize-none focus:border-red-primary"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!bookingData.date || !bookingData.time || !bookingData.location}
                      className="flex-1 bg-red-primary hover:bg-red-secondary text-text-warm font-semibold"
                    >
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-text-warm flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Mobile Service Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <h4 className="font-semibold text-text-warm mb-2">What to Expect:</h4>
                    <ul className="text-sm text-text-light/80 space-y-1">
                      <li>• We'll arrive at your specified location</li>
                      <li>• All equipment and supplies included</li>
                      <li>• Professional, uniformed technicians</li>
                      <li>• Satisfaction guarantee</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-primary/10 rounded-lg border border-red-primary/30">
                    <h4 className="font-semibold text-text-warm mb-2">Preparation Tips:</h4>
                    <ul className="text-sm text-text-light/80 space-y-1">
                      <li>• Remove personal items from vehicle</li>
                      <li>• Ensure access to water and power</li>
                      <li>• Clear parking area if possible</li>
                      <li>• Have keys ready for our arrival</li>
                    </ul>
                  </div>

                  {bookingData.date && bookingData.time && (
                    <div className="p-4 bg-red-primary/10 rounded-lg border border-red-primary/30">
                      <h4 className="font-semibold text-text-warm mb-2">Your Appointment:</h4>
                      <div className="text-sm text-text-light/80 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(bookingData.date).toLocaleDateString("en-AU", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {bookingData.time}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="premium-card border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-text-warm">Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customer-name" className="text-text-warm">
                        Full Name *
                      </Label>
                      <Input
                        id="customer-name"
                        value={bookingData.customerInfo.name}
                        onChange={(e) => handleInputChange("customer.name", e.target.value)}
                        className="bg-black-deep border-red-primary/30 text-text-warm focus:border-red-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-phone" className="text-text-warm">
                        Phone Number *
                      </Label>
                      <Input
                        id="customer-phone"
                        type="tel"
                        value={bookingData.customerInfo.phone}
                        onChange={(e) => handleInputChange("customer.phone", e.target.value)}
                        className="bg-black-deep border-red-primary/30 text-text-warm focus:border-red-primary"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-email" className="text-text-warm">
                      Email Address *
                    </Label>
                    <Input
                      id="customer-email"
                      type="email"
                      value={bookingData.customerInfo.email}
                      onChange={(e) => handleInputChange("customer.email", e.target.value)}
                      className="bg-black-deep border-red-primary/30 text-text-warm focus:border-red-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer-address" className="text-text-warm">
                      Billing Address
                    </Label>
                    <Textarea
                      id="customer-address"
                      value={bookingData.customerInfo.address}
                      onChange={(e) => handleInputChange("customer.address", e.target.value)}
                      className="bg-black-deep border-red-primary/30 text-text-warm resize-none focus:border-red-primary"
                      placeholder="Your billing address (if different from service location)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer-notes" className="text-text-warm">
                      Special Instructions
                    </Label>
                    <Textarea
                      id="customer-notes"
                      value={bookingData.customerInfo.notes}
                      onChange={(e) => handleInputChange("customer.notes", e.target.value)}
                      className="bg-black-deep border-red-primary/30 text-text-warm resize-none focus:border-red-primary"
                      placeholder="Any special instructions or requests..."
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 border-red-primary/30 text-red-primary hover:bg-red-primary/20 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        !bookingData.customerInfo.name ||
                        !bookingData.customerInfo.email ||
                        !bookingData.customerInfo.phone ||
                        isSubmitting
                      }
                      className="flex-1 bg-red-primary hover:bg-red-secondary text-text-warm font-semibold"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Final Summary */}
              <Card className="premium-card border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-text-warm">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-red-primary/30 pb-4">
                    <h4 className="font-semibold text-text-warm mb-2">Service Details:</h4>
                    <div className="text-sm text-text-light/80 space-y-1">
                      <div>{services.find((s) => s.id === bookingData.service)?.name}</div>
                      <div>{vehicleTypes.find((v) => v.id === bookingData.vehicleType)?.name}</div>
                      {bookingData.addOns.length > 0 && (
                        <div>
                          Add-ons: {bookingData.addOns.map((id) => addOns.find((a) => a.id === id)?.name).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-b border-red-primary/30 pb-4">
                    <h4 className="font-semibold text-text-warm mb-2">Appointment:</h4>
                    <div className="text-sm text-text-light/80 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {bookingData.date &&
                          new Date(bookingData.date).toLocaleDateString("en-AU", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {bookingData.time}
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{bookingData.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-text-warm">Total:</span>
                    <span className="text-accent-gold">${calculateTotal()}</span>
                  </div>

                  <div className="p-4 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <p className="text-text-light/80 text-sm text-center">
                      Payment will be collected on completion of service. We accept cash, card, and bank transfer.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-2xl mx-auto text-center">
              <Card className="premium-card border-red-primary/20">
                <CardContent className="p-12">
                  <div className="w-16 h-16 bg-red-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-red-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-warm mb-4">Booking Confirmed!</h2>
                  <p className="text-text-light/80 mb-6">
                    Thank you for choosing Apex Auto Detailers. Your mobile detailing booking has been confirmed and
                    you'll receive a confirmation email shortly with all the details.
                  </p>
                  <div className="space-y-4">
                    <Button asChild className="bg-red-primary hover:bg-red-secondary text-text-warm font-semibold px-8">
                      <Link href="/">Return Home</Link>
                    </Button>
                    <div className="text-sm text-text-light/70">
                      Questions? Call us at <strong>+61436920067</strong>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
