"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, Car, Sparkles, Droplets, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { createBooking, type BookingFormData } from "@/lib/booking-service"

export default function BookingPage() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    serviceType: "",
    date: "",
    time: "",
    location: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createBooking({
        ...formData,
        date: date ? format(date, "yyyy-MM-dd") : "",
      })

      if (result.success) {
        toast({
          title: "Booking Confirmed!",
          description: "We'll contact you shortly to confirm your appointment.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicleType: "",
          serviceType: "",
          date: "",
          time: "",
          location: "",
          notes: "",
        })
        setDate(undefined)
      } else {
        toast({
          title: "Booking Failed",
          description: result.error || "Please try again or call us directly.",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const services = [
    {
      id: "exterior",
      title: "Exterior Detail",
      description: "Complete exterior wash, wax, and protection",
      price: "From $89",
      icon: Car,
    },
    {
      id: "interior",
      title: "Interior Detail",
      description: "Deep clean and protection for your interior",
      price: "From $79",
      icon: Sparkles,
    },
    {
      id: "full",
      title: "Full Detail",
      description: "Complete interior and exterior detailing",
      price: "From $149",
      icon: Droplets,
    },
    {
      id: "premium",
      title: "Premium Detail",
      description: "Our most comprehensive detailing package",
      price: "From $249",
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-apex-dark-blue via-apex-teal-blue to-apex-dark-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-apex-light-grey mb-6">Book Your Detail</h1>
          <p className="text-xl text-apex-light-grey/80 max-w-2xl mx-auto">
            Schedule your premium mobile detailing service in just a few simple steps. We'll come to you at a time that
            works for your schedule.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Selection */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-apex-light-grey mb-6">Select Your Service</h2>

              <div className="space-y-4">
                <RadioGroup
                  value={formData.serviceType}
                  onValueChange={(value) => handleInputChange("serviceType", value)}
                >
                  {services.map((service) => (
                    <div key={service.id}>
                      <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                      <Label
                        htmlFor={service.id}
                        className="flex flex-col p-4 bg-apex-teal-blue/20 border border-apex-teal-blue rounded-lg cursor-pointer hover:bg-apex-teal-blue/30 transition-all peer-data-[state=checked]:border-apex-gold peer-data-[state=checked]:bg-apex-teal-blue/40 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-apex-gold"
                      >
                        <div className="flex items-start">
                          <div className="mr-4">
                            <service.icon className="h-6 w-6 text-apex-gold" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-apex-light-grey">{service.title}</span>
                              <span className="text-apex-gold text-sm font-medium">{service.price}</span>
                            </div>
                            <p className="text-sm text-apex-light-grey/70">{service.description}</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-apex-light-grey mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-apex-gold mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-apex-light-grey/80 text-sm">
                      Fully mobile service - we come to your home or office
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-apex-gold mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-apex-light-grey/80 text-sm">
                      Professional, fully-insured detailers with years of experience
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-apex-gold mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-apex-light-grey/80 text-sm">
                      Premium products and equipment for showroom-quality results
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-apex-gold mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-apex-light-grey/80 text-sm">100% satisfaction guarantee on all our services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details Form */}
            <div className="lg:col-span-2">
              <Card className="bg-apex-teal-blue/20 border-apex-gold/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-apex-teal-blue/40 to-apex-dark-blue rounded-t-lg">
                  <CardTitle className="text-apex-light-grey text-2xl">Your Booking Details</CardTitle>
                  <CardDescription className="text-apex-gold">
                    Fill out the form below to schedule your detailing appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-apex-light-grey">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-apex-light-grey">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-apex-light-grey">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-apex-light-grey">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                        />
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-apex-light-grey">Vehicle Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType" className="text-apex-light-grey">
                          Vehicle Type
                        </Label>
                        <Select
                          value={formData.vehicleType}
                          onValueChange={(value) => handleInputChange("vehicleType", value)}
                          required
                        >
                          <SelectTrigger
                            id="vehicleType"
                            className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                          >
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="luxury">Luxury Vehicle</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-apex-light-grey">Appointment Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-apex-light-grey">
                            Preferred Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey hover:bg-apex-teal-blue/20 hover:text-apex-light-grey",
                                  !date && "text-apex-light-grey/50",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-apex-dark-blue border-apex-teal-blue">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className="bg-apex-dark-blue text-apex-light-grey"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-apex-light-grey">
                            Preferred Time
                          </Label>
                          <Select
                            value={formData.time}
                            onValueChange={(value) => handleInputChange("time", value)}
                            required
                          >
                            <SelectTrigger
                              id="time"
                              className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                            >
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                              <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                              <SelectItem value="evening">Evening (4pm - 6pm)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-apex-light-grey">
                          Service Location
                        </Label>
                        <Input
                          id="location"
                          placeholder="Your address"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          required
                          className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-apex-light-grey">
                          Special Requests or Notes
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special instructions or requests"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold resize-none"
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-apex-red hover:bg-apex-red/90 text-apex-light-grey py-6 shadow-lg shadow-apex-red/20 border-2 border-apex-red font-semibold text-lg"
                    >
                      {isSubmitting ? "Processing..." : "Book Your Detail"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-apex-teal-blue/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-apex-light-grey mb-4">What Our Customers Say</h2>
            <p className="text-apex-light-grey/70">
              Join hundreds of satisfied customers who trust Apex Auto Detailers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "Caloundra",
                text: "Absolutely amazing service! My car looks brand new. The team was professional and thorough.",
              },
              {
                name: "Mike Chen",
                location: "Noosa",
                text: "Best car detailing service on the Sunshine Coast. They come to you and do incredible work.",
              },
              {
                name: "Emma Wilson",
                location: "Maroochydore",
                text: "Outstanding attention to detail. My car has never looked better. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-apex-teal-blue/20 border-apex-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-apex-gold fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-apex-light-grey/80 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-apex-light-grey">{testimonial.name}</p>
                    <p className="text-apex-light-grey/60 text-sm">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
