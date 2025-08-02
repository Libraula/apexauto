"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { createContactSubmission, type ContactFormData } from "@/lib/contact-service"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        serviceInterest: formData.serviceInterest || undefined,
        message: formData.message,
      }

      const result = await createContactSubmission(contactData)

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceInterest: "",
          message: "",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "There was an error sending your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-warm mb-4">Get In Touch</h1>
            <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
              Ready to give your vehicle the premium treatment it deserves? Contact us today for a consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-primary" />
                    Visit Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-light mb-4">
                    123 Auto Detail Lane
                    <br />
                    Premium District
                    <br />
                    City, State 12345
                  </p>
                  <div className="aspect-video bg-black-rich rounded-lg flex items-center justify-center">
                    <p className="text-text-light/60">Interactive Map Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black-deep/50 border-red-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Phone className="w-5 h-5 text-red-primary mr-3" />
                      <h3 className="font-semibold text-text-warm">Call Us</h3>
                    </div>
                    <p className="text-text-light">(555) 123-4567</p>
                    <p className="text-sm text-text-light/60 mt-1">Mon-Sat: 8AM-6PM</p>
                  </CardContent>
                </Card>

                <Card className="bg-black-deep/50 border-red-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Mail className="w-5 h-5 text-red-primary mr-3" />
                      <h3 className="font-semibold text-text-warm">Email Us</h3>
                    </div>
                    <p className="text-text-light">info@apexautodetailers.com</p>
                    <p className="text-sm text-text-light/60 mt-1">24/7 Response</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-light">Monday - Friday</span>
                      <span className="text-text-warm">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Saturday</span>
                      <span className="text-text-warm">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Sunday</span>
                      <span className="text-text-warm">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-text-light">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-black-rich border-red-primary/30 text-text-light"
                        placeholder="Enter your full name"
                        required
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
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-text-light">
                        Phone Number
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
                    <div>
                      <Label htmlFor="serviceInterest" className="text-text-light">
                        Service Interest
                      </Label>
                      <Select
                        value={formData.serviceInterest}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceInterest: value }))}
                      >
                        <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom-detail">Custom Detail</SelectItem>
                          <SelectItem value="interior-detail">Interior Detail</SelectItem>
                          <SelectItem value="full-detail">Full Detail</SelectItem>
                          <SelectItem value="pre-sale-detail">Pre-Sale Detail</SelectItem>
                          <SelectItem value="subscription">Subscription Plans</SelectItem>
                          <SelectItem value="franchise">Franchise Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-text-light">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="bg-black-rich border-red-primary/30 text-text-light min-h-[120px]"
                      placeholder="Tell us about your vehicle and what services you're interested in..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-primary hover:bg-red-secondary"
                  >
                    {isSubmitting ? (
                      "Sending..."
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
          </div>
        </div>
      </div>
    </div>
  )
}
