"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Clock, Car, CreditCard, CheckCircle, Phone, Mail, User } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

const services = [
  { id: "basic-wash", name: "Basic Wash & Wax", price: 89, duration: "2-3 hours" },
  { id: "premium-detail", name: "Premium Detail", price: 149, duration: "3-4 hours" },
  { id: "full-service", name: "Full Service Detail", price: 249, duration: "4-6 hours" },
  { id: "paint-correction", name: "Paint Correction", price: 299, duration: "4-6 hours" },
  { id: "ceramic-coating", name: "Ceramic Coating", price: 599, duration: "6-8 hours" },
  { id: "interior-deep", name: "Deep Interior Clean", price: 199, duration: "3-4 hours" },
]

const addOns = [
  { id: "tire-shine", name: "Tire Shine", price: 19 },
  { id: "rain-x", name: "Rain-X Treatment", price: 39 },
  { id: "fabric-protection", name: "Fabric Protection", price: 49 },
  { id: "pet-hair", name: "Pet Hair Removal", price: 39 },
  { id: "engine-bay", name: "Engine Bay Cleaning", price: 149 },
]

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const vehicleTypes = ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Wagon", "Van", "Luxury", "Exotic"]

export default function BookPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [serviceLocation, setServiceLocation] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    address: "",
    specialRequests: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const calculateTotal = () => {
    const servicePrice = services.find((s) => s.id === selectedService)?.price || 0
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    const locationFee = serviceLocation === "mobile" ? 25 : serviceLocation === "home" ? 35 : 0
    return servicePrice + addOnPrice + locationFee
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Booking Confirmed!",
      description: "We'll send you a confirmation email shortly.",
    })

    setIsSubmitting(false)
    setCurrentStep(5) // Success step
  }

  const selectedServiceDetails = services.find((s) => s.id === selectedService)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <CalendarIcon className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Book Your Service</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto">
            Schedule your premium car detailing service in just a few simple steps. Choose your service, pick a time,
            and we'll take care of the rest.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? "bg-red-primary text-text-warm"
                        : "bg-black-deep border border-red-primary/30 text-text-light/60"
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-0.5 ${currentStep > step ? "bg-red-primary" : "bg-red-primary/30"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {currentStep === 1 && (
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <Car className="w-6 h-6 text-red-primary" />
                  Select Your Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedService === service.id
                          ? "border-red-primary bg-red-primary/10"
                          : "border-red-primary/30 hover:border-red-primary/50"
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-text-warm">{service.name}</h3>
                        <span className="text-red-primary font-bold">${service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-light/60">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-warm mb-4">Add-On Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addOns.map((addOn) => (
                      <div key={addOn.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={addOn.id}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                          className="border-red-primary/30 data-[state=checked]:bg-red-primary"
                        />
                        <Label htmlFor={addOn.id} className="flex-1 text-text-light cursor-pointer">
                          {addOn.name} (+${addOn.price})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-text-light mb-3 block">Service Location</Label>
                  <Select value={serviceLocation} onValueChange={setServiceLocation}>
                    <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                      <SelectValue placeholder="Choose service location" />
                    </SelectTrigger>
                    <SelectContent className="bg-black-deep border-red-primary/30">
                      <SelectItem value="shop">Shop Service (No extra fee)</SelectItem>
                      <SelectItem value="mobile">Mobile Service (+$25)</SelectItem>
                      <SelectItem value="home">Premium Home Service (+$35)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedService || !serviceLocation}
                  className="w-full bg-red-primary hover:bg-red-secondary text-text-warm"
                >
                  Continue to Date & Time
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-red-primary" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-text-light mb-3 block">Choose Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border border-red-primary/30 bg-black-rich"
                    />
                  </div>

                  <div>
                    <Label className="text-text-light mb-3 block">Choose Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className={
                            selectedTime === time
                              ? "bg-red-primary hover:bg-red-secondary"
                              : "border-red-primary/30 text-text-light hover:bg-red-primary/20"
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-red-primary/30 text-red-primary hover:bg-red-primary/20"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-red-primary hover:bg-red-secondary text-text-warm"
                  >
                    Continue to Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <User className="w-6 h-6 text-red-primary" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName" className="text-text-light">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-text-light">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="email" className="text-text-light">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-text-light">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="vehicleType" className="text-text-light">
                      Vehicle Type *
                    </Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, vehicleType: value }))}
                    >
                      <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-deep border-red-primary/30">
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vehicleYear" className="text-text-light">
                      Year *
                    </Label>
                    <Input
                      id="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vehicleYear: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleMake" className="text-text-light">
                      Make *
                    </Label>
                    <Input
                      id="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vehicleMake: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                      placeholder="Toyota"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="vehicleModel" className="text-text-light">
                    Model *
                  </Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData((prev) => ({ ...prev, vehicleModel: e.target.value }))}
                    className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    placeholder="Camry"
                  />
                </div>

                {(serviceLocation === "mobile" || serviceLocation === "home") && (
                  <div className="mb-6">
                    <Label htmlFor="address" className="text-text-light">
                      Service Address *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <Label htmlFor="specialRequests" className="text-text-light">
                    Special Requests
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                    placeholder="Any special instructions or requests..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="border-red-primary/30 text-red-primary hover:bg-red-primary/20"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(4)}
                    disabled={
                      !formData.firstName ||
                      !formData.lastName ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.vehicleType ||
                      !formData.vehicleYear ||
                      !formData.vehicleMake ||
                      !formData.vehicleModel
                    }
                    className="flex-1 bg-red-primary hover:bg-red-secondary text-text-warm"
                  >
                    Review Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-red-primary" />
                  Review Your Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Service Summary */}
                  <div className="bg-black-rich/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-text-warm mb-3">Service Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Service:</span>
                        <span className="text-text-warm">{selectedServiceDetails?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Duration:</span>
                        <span className="text-text-warm">{selectedServiceDetails?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Location:</span>
                        <span className="text-text-warm capitalize">{serviceLocation} Service</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Date & Time:</span>
                        <span className="text-text-warm">
                          {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-black-rich/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-text-warm mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Name:</span>
                        <span className="text-text-warm">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Email:</span>
                        <span className="text-text-warm">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Phone:</span>
                        <span className="text-text-warm">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/70">Vehicle:</span>
                        <span className="text-text-warm">
                          {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-black-rich/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-text-warm mb-3">Pricing Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-light/70">{selectedServiceDetails?.name}:</span>
                        <span className="text-text-warm">${selectedServiceDetails?.price}</span>
                      </div>
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId)
                        return addOn ? (
                          <div key={addOnId} className="flex justify-between">
                            <span className="text-text-light/70">{addOn.name}:</span>
                            <span className="text-text-warm">+${addOn.price}</span>
                          </div>
                        ) : null
                      })}
                      {serviceLocation !== "shop" && (
                        <div className="flex justify-between">
                          <span className="text-text-light/70">Service Fee:</span>
                          <span className="text-text-warm">+${serviceLocation === "mobile" ? 25 : 35}</span>
                        </div>
                      )}
                      <div className="border-t border-red-primary/30 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-text-warm">Total:</span>
                          <span className="text-red-primary">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="border-red-primary/30 text-red-primary hover:bg-red-primary/20"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-red-primary hover:bg-red-secondary text-text-warm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-warm mr-2" />
                          Confirming Booking...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 5 && (
            <Card className="bg-black-deep/50 border-red-primary/20 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
                  <CheckCircle className="w-8 h-8 text-red-primary" />
                </div>
                <h2 className="text-3xl font-bold text-text-warm mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-text-light/80 mb-6">
                  Thank you for choosing Apex Auto Detailers. We've sent a confirmation email with all the details.
                </p>
                <div className="bg-black-rich/50 p-4 rounded-lg mb-6">
                  <div className="text-sm text-text-light/70 mb-2">Booking Reference</div>
                  <div className="text-xl font-bold text-red-primary">AAD-{Date.now().toString().slice(-6)}</div>
                </div>
                <div className="space-y-2 text-sm text-text-light/70 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Questions? Call us at +61436920067</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Or email info@apexautodetailers.com</span>
                  </div>
                </div>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-red-primary hover:bg-red-secondary text-text-warm"
                >
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
