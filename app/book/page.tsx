"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, DollarSign, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createBooking, type BookingFormData } from "@/lib/booking-service"
import { useToast } from "@/hooks/use-toast"

const services = [
  {
    id: "custom-detail",
    name: "Custom Detail",
    basePrice: 150,
    description: "Tailored detailing service for your specific needs",
  },
  {
    id: "interior-detail",
    name: "Interior Detail",
    basePrice: 120,
    description: "Deep cleaning and protection for your vehicle's interior",
  },
  {
    id: "full-detail",
    name: "Full Detail",
    basePrice: 250,
    description: "Complete interior and exterior detailing service",
  },
  {
    id: "pre-sale-detail",
    name: "Pre-Sale Detail",
    basePrice: 200,
    description: "Prepare your vehicle for sale with our comprehensive service",
  },
]

const addOns = [
  { id: "ceramic-coating", name: "Ceramic Coating", price: 100 },
  { id: "paint-protection", name: "Paint Protection Film", price: 150 },
  { id: "engine-cleaning", name: "Engine Bay Cleaning", price: 50 },
  { id: "headlight-restoration", name: "Headlight Restoration", price: 75 },
  { id: "leather-conditioning", name: "Leather Conditioning", price: 40 },
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
  "5:00 PM",
]

export default function BookingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Vehicle Information
    vehicleType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",

    // Service Details
    serviceType: "",
    serviceLocation: "shop", // 'shop', 'mobile', 'home'
    selectedAddOns: [] as string[],

    // Location & Scheduling
    address: "",
    preferredDate: undefined as Date | undefined,
    preferredTime: "",

    // Additional Information
    specialRequests: "",
  })

  const calculateTotal = () => {
    const selectedService = services.find((s) => s.id === formData.serviceType)
    const basePrice = selectedService?.basePrice || 0
    const addOnPrice = formData.selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    // Add mobile service fee if applicable
    const mobileServiceFee = formData.serviceLocation === "mobile" ? 25 : 0

    return basePrice + addOnPrice + mobileServiceFee
  }

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddOns: checked ? [...prev.selectedAddOns, addOnId] : prev.selectedAddOns.filter((id) => id !== addOnId),
    }))
  }

  const handleSubmit = async () => {
    if (!formData.preferredDate) {
      toast({
        title: "Error",
        description: "Please select a preferred date",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const bookingData: BookingFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        vehicleType: formData.vehicleType,
        vehicleYear: formData.vehicleYear,
        vehicleMake: formData.vehicleMake,
        vehicleModel: formData.vehicleModel,
        serviceType: formData.serviceType,
        serviceLocation: formData.serviceLocation,
        selectedAddOns: formData.selectedAddOns,
        address: formData.serviceLocation !== "shop" ? formData.address : undefined,
        preferredDate: format(formData.preferredDate, "yyyy-MM-dd"),
        preferredTime: formData.preferredTime,
        specialRequests: formData.specialRequests,
        totalPrice: calculateTotal(),
      }

      const result = await createBooking(bookingData)

      if (result.success) {
        toast({
          title: "Booking Confirmed!",
          description: "Your booking has been submitted successfully. We'll contact you soon to confirm the details.",
        })

        // Redirect to a success page or home
        router.push("/?booking=success")
      } else {
        toast({
          title: "Booking Failed",
          description: result.error || "There was an error submitting your booking. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.vehicleType && formData.vehicleYear && formData.vehicleMake && formData.vehicleModel
      case 3:
        return formData.serviceType && (formData.serviceLocation === "shop" || formData.address)
      case 4:
        return formData.preferredDate && formData.preferredTime
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-warm mb-2">Book Your Service</h1>
            <p className="text-text-light/70">Schedule your premium car detailing service</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                      step <= currentStep
                        ? "bg-red-primary text-white"
                        : "bg-black-deep border-2 border-red-primary/30 text-text-light/60",
                    )}
                  >
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={cn("w-16 h-1 mx-2", step < currentStep ? "bg-red-primary" : "bg-red-primary/30")} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-black-deep/50 border-red-primary/20">
            <CardHeader>
              <CardTitle className="text-text-warm">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Vehicle Information"}
                {currentStep === 3 && "Service Selection"}
                {currentStep === 4 && "Schedule & Review"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-text-light">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="Enter your first name"
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
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-text-light">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-text-light">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Information */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleType" className="text-text-light">
                      Vehicle Type *
                    </Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, vehicleType: value }))}
                    >
                      <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="wagon">Wagon</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
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
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="e.g., 2020"
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
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="e.g., Toyota"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleModel" className="text-text-light">
                      Model *
                    </Label>
                    <Input
                      id="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vehicleModel: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="e.g., Camry"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Service Selection */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <Label className="text-text-light text-lg font-medium mb-4 block">Select Service *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <Card
                          key={service.id}
                          className={cn(
                            "cursor-pointer transition-all border-2",
                            formData.serviceType === service.id
                              ? "border-red-primary bg-red-primary/10"
                              : "border-red-primary/20 bg-black-rich/50 hover:border-red-primary/40",
                          )}
                          onClick={() => setFormData((prev) => ({ ...prev, serviceType: service.id }))}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-text-warm">{service.name}</h3>
                              <span className="text-red-primary font-bold">${service.basePrice}</span>
                            </div>
                            <p className="text-sm text-text-light/70">{service.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Service Location */}
                  <div>
                    <Label className="text-text-light text-lg font-medium mb-4 block">Service Location *</Label>
                    <RadioGroup
                      value={formData.serviceLocation}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceLocation: value }))}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border border-red-primary/20 rounded-lg bg-black-rich/50">
                        <RadioGroupItem value="shop" id="shop" />
                        <Label htmlFor="shop" className="text-text-light cursor-pointer">
                          <div>
                            <div className="font-medium">At Our Shop</div>
                            <div className="text-sm text-text-light/60">Drop off your vehicle</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-red-primary/20 rounded-lg bg-black-rich/50">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Label htmlFor="mobile" className="text-text-light cursor-pointer">
                          <div>
                            <div className="font-medium">Mobile Service</div>
                            <div className="text-sm text-text-light/60">We come to you (+$25)</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-red-primary/20 rounded-lg bg-black-rich/50">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home" className="text-text-light cursor-pointer">
                          <div>
                            <div className="font-medium">At Your Home</div>
                            <div className="text-sm text-text-light/60">Residential service</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Address (if mobile or home service) */}
                  {(formData.serviceLocation === "mobile" || formData.serviceLocation === "home") && (
                    <div>
                      <Label htmlFor="address" className="text-text-light">
                        Service Address *
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        className="bg-black-rich border-red-primary/30 text-text-light"
                        placeholder="Enter your address"
                      />
                    </div>
                  )}

                  {/* Add-ons */}
                  <div>
                    <Label className="text-text-light text-lg font-medium mb-4 block">Add-ons (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addOns.map((addOn) => (
                        <div
                          key={addOn.id}
                          className="flex items-center space-x-3 p-4 border border-red-primary/20 rounded-lg bg-black-rich/50"
                        >
                          <Checkbox
                            id={addOn.id}
                            checked={formData.selectedAddOns.includes(addOn.id)}
                            onCheckedChange={(checked) => handleAddOnChange(addOn.id, checked as boolean)}
                          />
                          <Label htmlFor={addOn.id} className="text-text-light cursor-pointer flex-1">
                            <div className="flex justify-between">
                              <span>{addOn.name}</span>
                              <span className="text-red-primary font-medium">+${addOn.price}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Schedule & Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-text-light text-lg font-medium mb-4 block">Preferred Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-black-rich border-red-primary/30 text-text-light",
                            !formData.preferredDate && "text-text-light/60",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-black-deep border-red-primary/20">
                        <Calendar
                          mode="single"
                          selected={formData.preferredDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, preferredDate: date }))}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-text-light text-lg font-medium mb-4 block">Preferred Time *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={formData.preferredTime === time ? "default" : "outline"}
                          className={cn(
                            "h-12",
                            formData.preferredTime === time
                              ? "bg-red-primary hover:bg-red-secondary"
                              : "bg-black-rich border-red-primary/30 text-text-light hover:border-red-primary/60",
                          )}
                          onClick={() => setFormData((prev) => ({ ...prev, preferredTime: time }))}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="specialRequests" className="text-text-light">
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light"
                      placeholder="Any special requests or notes..."
                      rows={4}
                    />
                  </div>

                  {/* Order Summary */}
                  <Card className="bg-black-rich/50 border-red-primary/20">
                    <CardHeader>
                      <CardTitle className="text-text-warm flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-light">
                          {services.find((s) => s.id === formData.serviceType)?.name}
                        </span>
                        <span className="text-text-warm">
                          ${services.find((s) => s.id === formData.serviceType)?.basePrice}
                        </span>
                      </div>
                      {formData.selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId)
                        return (
                          <div key={addOnId} className="flex justify-between">
                            <span className="text-text-light">{addOn?.name}</span>
                            <span className="text-text-warm">+${addOn?.price}</span>
                          </div>
                        )
                      })}
                      {formData.serviceLocation === "mobile" && (
                        <div className="flex justify-between">
                          <span className="text-text-light">Mobile Service Fee</span>
                          <span className="text-text-warm">+$25</span>
                        </div>
                      )}
                      <div className="border-t border-red-primary/20 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-text-warm">Total</span>
                          <span className="text-red-primary">${calculateTotal()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-transparent border-red-primary/30 text-text-light hover:border-red-primary/60"
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="bg-red-primary hover:bg-red-secondary"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className="bg-red-primary hover:bg-red-secondary"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
