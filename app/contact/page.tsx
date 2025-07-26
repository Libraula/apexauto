"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"
import { createContactSubmission, type ContactFormData } from "@/lib/contact-service"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceInterest: formData.service || undefined,
        message: formData.message,
      }

      const result = await createContactSubmission(contactData)

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll respond to your inquiry within 2 hours.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        toast({
          title: "Failed to Send Message",
          description: result.error || "Please try again or call us directly.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Failed to Send Message",
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

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-apex-dark-blue via-apex-dark-blue to-apex-teal-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4 lg:mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-apex-light-yellow/80 mb-6 lg:mb-8">
              Ready to transform your vehicle? Have questions about our services? We're here to help and provide you
              with a personalized quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-apex-light-yellow mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-apex-bright-red" />
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold mb-1">Phone</h3>
                      <p className="text-apex-light-yellow/80">0412 345 678</p>
                      <p className="text-apex-light-yellow/70 text-sm">Available 7 days a week, 7am - 7pm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-apex-bright-red" />
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold mb-1">Email</h3>
                      <p className="text-apex-light-yellow/80">hello@apexautodetailers.com.au</p>
                      <p className="text-apex-light-yellow/70 text-sm">We'll respond within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-apex-bright-red" />
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold mb-1">Service Area</h3>
                      <p className="text-apex-light-yellow/80">Sunshine Coast, QLD</p>
                      <p className="text-apex-light-yellow/70 text-sm">Caloundra to Noosa and surrounding areas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-apex-bright-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-apex-bright-red" />
                    </div>
                    <div>
                      <h3 className="text-apex-light-yellow font-semibold mb-1">Business Hours</h3>
                      <div className="text-apex-light-yellow/80 space-y-1">
                        <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                        <p>Saturday: 8:00 AM - 5:00 PM</p>
                        <p>Sunday: 9:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-apex-light-yellow">Quick Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-apex-dark-orange hover:bg-apex-dark-orange/90 text-apex-light-yellow justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                  <Button
                    variant="outline"
                    className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent justify-start"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardHeader>
                <CardTitle className="text-apex-light-yellow text-xl lg:text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-apex-light-yellow mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-apex-light-yellow mb-2 block">
                      Service Interest
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                        <SelectValue placeholder="Select a service (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                        <SelectItem value="essential" className="text-apex-light-yellow">
                          Essential Detail
                        </SelectItem>
                        <SelectItem value="premium" className="text-apex-light-yellow">
                          Premium Interior
                        </SelectItem>
                        <SelectItem value="signature" className="text-apex-light-yellow">
                          Signature Detail
                        </SelectItem>
                        <SelectItem value="elite" className="text-apex-light-yellow">
                          Elite Detail
                        </SelectItem>
                        <SelectItem value="showroom" className="text-apex-light-yellow">
                          Showroom Package
                        </SelectItem>
                        <SelectItem value="subscription" className="text-apex-light-yellow">
                          Monthly Subscription
                        </SelectItem>
                        <SelectItem value="franchise" className="text-apex-light-yellow">
                          Franchise Opportunity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-apex-light-yellow mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50 resize-none"
                      placeholder="Tell us about your vehicle, preferred service, timing, or any questions you have..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-apex-light-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-apex-light-yellow mb-4">Frequently Asked Questions</h2>
            <p className="text-apex-light-yellow/80">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical service take?",
                answer:
                  "Service times vary: Essential Detail (1-2 hours), Premium Interior (2-3 hours), Signature Detail (3-4 hours), Elite Detail (4-5 hours), and Showroom Package (5-6 hours).",
              },
              {
                question: "Do you provide all equipment and water?",
                answer:
                  "Yes! We bring everything needed including our own water supply, power equipment, and all cleaning products. You just need to provide access to your vehicle.",
              },
              {
                question: "What areas do you service?",
                answer:
                  "We service the entire Sunshine Coast region from Caloundra to Noosa, including surrounding areas. Contact us to confirm if we service your specific location.",
              },
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking 3-7 days in advance, especially for weekend appointments. However, we often have same-day or next-day availability for urgent requests.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept cash, all major credit cards, and bank transfers. Payment is due upon completion of the service.",
              },
              {
                question: "Do you offer any guarantees?",
                answer:
                  "Yes! We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll return to make it right at no extra cost.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-apex-light-yellow mb-2">{faq.question}</h3>
                  <p className="text-apex-light-yellow/70 text-sm">{faq.answer}</p>
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
