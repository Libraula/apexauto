"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+61436920067",
    description: "Call us for immediate assistance",
    available: "Mon-Sat 8AM-6PM",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@apexautodetailers.com",
    description: "Send us a detailed message",
    available: "24/7 Response",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "123 Detail Street, City, ST 12345",
    description: "Visit our premium facility",
    available: "By Appointment",
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Mon-Sat: 8AM-6PM",
    description: "Sunday: By Appointment",
    available: "Extended Hours Available",
  },
]

const serviceAreas = [
  { name: "Downtown District", coverage: "Full Service", response: "Same Day" },
  { name: "Metro North", coverage: "Mobile Service", response: "Next Day" },
  { name: "Coastal Region", coverage: "Full Service", response: "Same Day" },
  { name: "Tech Corridor", coverage: "Mobile Service", response: "Next Day" },
  { name: "Suburban Areas", coverage: "Mobile Service", response: "2-3 Days" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/20 to-red-secondary/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/20 rounded-full mb-6">
            <MessageSquare className="w-8 h-8 text-red-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-warm mb-6">Get In Touch</h1>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto">
            Ready to transform your vehicle? Contact our team of premium car detailing experts. We're here to answer
            your questions and schedule your service.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-black-deep/50 border-red-primary/20 hover:border-red-primary/40 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-primary/20 rounded-full mb-4 group-hover:bg-red-primary/30 transition-colors">
                    <info.icon className="w-6 h-6 text-red-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-warm mb-2">{info.title}</h3>
                  <div className="text-red-primary font-medium mb-2">{info.details}</div>
                  <p className="text-sm text-text-light/70 mb-2">{info.description}</p>
                  <Badge variant="outline" className="border-red-primary/30 text-red-primary text-xs">
                    {info.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm flex items-center gap-2">
                  <Send className="w-6 h-6 text-red-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-text-light">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-light">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-text-light">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-text-light">
                        Service Interest
                      </Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-black-deep border-red-primary/30">
                          <SelectItem value="exterior">Exterior Detailing</SelectItem>
                          <SelectItem value="interior">Interior Detailing</SelectItem>
                          <SelectItem value="full">Full Service Detail</SelectItem>
                          <SelectItem value="paint">Paint Protection</SelectItem>
                          <SelectItem value="ceramic">Ceramic Coating</SelectItem>
                          <SelectItem value="mobile">Mobile Service</SelectItem>
                          <SelectItem value="subscription">Subscription Plan</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-text-light">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-black-rich border-red-primary/30 text-text-light focus:border-red-primary min-h-[120px]"
                      placeholder="Tell us about your vehicle and what service you're interested in..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-primary hover:bg-red-secondary text-text-warm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-warm mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <div className="space-y-8">
              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-red-primary" />
                    Service Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceAreas.map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-black-rich/50 rounded-lg">
                        <div>
                          <div className="font-medium text-text-warm">{area.name}</div>
                          <div className="text-sm text-text-light/70">{area.coverage}</div>
                        </div>
                        <Badge variant="outline" className="border-red-primary/30 text-red-primary">
                          {area.response}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-red-primary/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-primary mt-0.5" />
                      <div className="text-sm text-text-light/80">
                        Don't see your area listed? Contact us to check availability for mobile service in your
                        location.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm">Emergency Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-red-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-text-warm">24/7 Emergency Line</div>
                        <div className="text-sm text-text-light/70">For urgent detailing needs</div>
                        <div className="text-red-primary font-medium">+61436920067</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-text-warm">Same-Day Service</div>
                        <div className="text-sm text-text-light/70">Available for premium clients</div>
                        <div className="text-red-primary font-medium">Subject to availability</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-primary/20 to-red-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-warm mb-6">Ready to Book Your Service?</h2>
          <p className="text-lg text-text-light/80 max-w-2xl mx-auto mb-8">
            Skip the contact form and book your premium car detailing service directly. Choose your preferred time and
            service package.
          </p>
          <Button size="lg" className="bg-red-primary hover:bg-red-secondary text-text-warm">
            Book Service Now
          </Button>
        </div>
      </section>
    </div>
  )
}
