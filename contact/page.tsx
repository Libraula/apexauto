"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "../navigation"
import { Footer } from "../footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react"
import { createContactSubmission, type ContactFormData } from "@/lib/contact-service"

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createContactSubmission(formData)

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceInterest: "",
          message: "",
        })
      } else {
        toast({
          title: "Message Failed",
          description: result.error || "Please try again or call us directly.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Message Failed",
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
      <section className="py-16 bg-gradient-to-br from-apex-dark-blue via-apex-teal-blue to-apex-dark-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-apex-light-grey mb-6">Get In Touch</h1>
          <p className="text-xl text-apex-light-grey/80 max-w-2xl mx-auto">
            Have questions about our services? Need a custom quote? We're here to help you get the premium detailing
            experience you deserve.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-apex-light-grey mb-8">Contact Information</h2>

              <div className="space-y-8">
                <Card className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-apex-red/20 to-apex-gold/20 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-apex-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apex-light-grey mb-1">Phone</h3>
                      <p className="text-apex-light-grey/70">(555) 123-4567</p>
                      <p className="text-apex-light-grey/50 text-sm mt-1">Available 7 days a week, 8am-6pm</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-apex-red/20 to-apex-gold/20 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-apex-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apex-light-grey mb-1">Email</h3>
                      <p className="text-apex-light-grey/70">info@apexautodetailers.com</p>
                      <p className="text-apex-light-grey/50 text-sm mt-1">We respond within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-apex-red/20 to-apex-gold/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-apex-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apex-light-grey mb-1">Service Area</h3>
                      <p className="text-apex-light-grey/70">Sunshine Coast, QLD</p>
                      <p className="text-apex-light-grey/50 text-sm mt-1">
                        From Caloundra to Noosa and surrounding areas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-apex-red/20 to-apex-gold/20 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-apex-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apex-light-grey mb-1">Business Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 text-apex-light-grey/70">
                        <p>Monday - Friday:</p>
                        <p>8:00 AM - 6:00 PM</p>
                        <p>Saturday:</p>
                        <p>8:00 AM - 4:00 PM</p>
                        <p>Sunday:</p>
                        <p>9:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-8">
                <MessageSquare className="h-6 w-6 text-apex-gold mr-3" />
                <h2 className="text-3xl font-bold text-apex-light-grey">Send Us a Message</h2>
              </div>

              <Card className="bg-apex-teal-blue/20 border-apex-gold/20 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-apex-light-grey">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-apex-light-grey">
                        Service Interest
                      </Label>
                      <Input
                        id="service"
                        placeholder="What service are you interested in?"
                        value={formData.serviceInterest}
                        onChange={(e) => handleInputChange("serviceInterest", e.target.value)}
                        className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-apex-light-grey">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="bg-apex-dark-blue/50 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50 focus-visible:ring-apex-gold resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-apex-red hover:bg-apex-red/90 text-apex-light-grey py-6 shadow-lg shadow-apex-red/20 border-2 border-apex-red font-semibold"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-apex-teal-blue/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-apex-light-grey mb-4">Frequently Asked Questions</h2>
            <p className="text-apex-light-grey/70">Find quick answers to common questions about our services</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking at least 3-5 days in advance for standard services, and 1-2 weeks for premium services like ceramic coating. For same-day service, please call us directly to check availability.",
              },
              {
                question: "Do I need to provide water or electricity?",
                answer:
                  "No, our mobile detailing vans are fully self-contained with water tanks, generators, and all necessary equipment. We bring everything needed to deliver a premium detailing experience.",
              },
              {
                question: "How long does a typical detail take?",
                answer:
                  "An exterior detail typically takes 1-2 hours, while a full interior and exterior detail can take 3-5 hours depending on the vehicle size and condition. Premium services like paint correction may take longer.",
              },
              {
                question: "Do you offer any guarantees?",
                answer:
                  "Yes, we stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with any aspect of our service, we'll make it right at no additional cost.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-apex-gold mb-2">{faq.question}</h3>
                  <p className="text-apex-light-grey/70">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-apex-dark-blue to-apex-teal-blue/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-apex-light-grey mb-6">Ready to Experience the Apex Difference?</h2>
          <p className="text-xl text-apex-gold mb-8">
            Book your premium detailing service today and see why we're the Sunshine Coast's top choice
          </p>
          <Button
            asChild
            size="lg"
            className="bg-apex-red hover:bg-apex-red/90 text-apex-light-grey px-8 py-6 shadow-lg shadow-apex-red/20 border-2 border-apex-red font-semibold"
          >
            <a href="/book">Book Your Detail Now</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
