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
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">Get In Touch</h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 lg:mb-8">
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
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <p className="text-slate-300">0412 345 678</p>
                      <p className="text-slate-400 text-sm">Available 7 days a week, 7am - 7pm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <p className="text-slate-300">hello@apexautodetailers.com.au</p>
                      <p className="text-slate-400 text-sm">We'll respond within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Service Area</h3>
                      <p className="text-slate-300">Sunshine Coast, QLD</p>
                      <p className="text-slate-400 text-sm">Caloundra to Noosa and surrounding areas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                      <div className="text-slate-300 space-y-1">
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
                <h3 className="text-xl font-bold text-white">Quick Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent justify-start"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl lg:text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder="0412 345 678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">
                      Service Interest
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="essential" className="text-white">
                          Essential Detail
                        </SelectItem>
                        <SelectItem value="premium" className="text-white">
                          Premium Interior
                        </SelectItem>
                        <SelectItem value="signature" className="text-white">
                          Signature Detail
                        </SelectItem>
                        <SelectItem value="elite" className="text-white">
                          Elite Detail
                        </SelectItem>
                        <SelectItem value="showroom" className="text-white">
                          Showroom Package
                        </SelectItem>
                        <SelectItem value="subscription" className="text-white">
                          Monthly Subscription
                        </SelectItem>
                        <SelectItem value="franchise" className="text-white">
                          Franchise Opportunity
                        </SelectItem>
                        <SelectItem value="other" className="text-white">
                          Other/General Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                      placeholder="Tell us about your vehicle, preferred timing, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 lg:py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">We Service These Areas</h2>
            <p className="text-slate-300 text-lg">Mobile detailing across the Sunshine Coast</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[
              "Caloundra",
              "Kawana",
              "Maroochydore",
              "Mooloolaba",
              "Noosa",
              "Nambour",
              "Buderim",
              "Sippy Downs",
              "Coolum",
              "Peregian",
              "Tewantin",
              "Pomona",
            ].map((area) => (
              <Card
                key={area}
                className="bg-slate-800/30 border-slate-700 text-center hover:bg-slate-800/50 transition-colors"
              >
                <CardContent className="p-4">
                  <p className="text-white font-medium text-sm lg:text-base">{area}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              Don't see your area? <span className="text-blue-400 cursor-pointer hover:text-blue-300">Contact us</span>{" "}
              - we may still be able to help!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking 2-3 days in advance, especially during peak times. However, we often have same-day availability for urgent requests.",
              },
              {
                question: "What do I need to provide?",
                answer:
                  "Just access to power and water if possible. We bring all equipment, but can work with portable gear if needed. Please ensure your car is unlocked and accessible.",
              },
              {
                question: "How long does a typical detail take?",
                answer:
                  "Essential Details take 1-2 hours, while our comprehensive Showroom Package can take 5-6 hours. We'll provide an accurate time estimate when you book.",
              },
              {
                question: "Do you work in all weather conditions?",
                answer:
                  "We work in most conditions but may reschedule during heavy rain or extreme weather for quality and safety reasons. We'll always contact you in advance.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept cash, card, and bank transfer. Payment is due upon completion of service, with deposits required for first-time customers.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
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
