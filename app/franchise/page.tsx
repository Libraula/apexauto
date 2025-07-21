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
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Briefcase, Star, CheckCircle, DollarSign, Clock, MapPin, Phone, Mail } from "lucide-react"

export default function FranchisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    availability: "",
    transport: "",
    investment: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Franchise application submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 mb-4">Franchise Opportunity</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
              Start Detailing.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Start Earning.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join the Apex Auto Detailers family and build your own profitable mobile detailing business. Complete
              training, equipment, and ongoing support included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Download Info Pack
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Potential */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Earnings Potential</h2>
            <p className="text-slate-300 text-lg">Real numbers from successful Apex franchisees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/30 border-slate-700 text-center">
              <CardContent className="pt-8 pb-6">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">$1,500</div>
                <div className="text-slate-300 mb-2">Weekly Gross</div>
                <div className="text-slate-400 text-sm">10 cars @ $150 average</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 text-center ring-2 ring-blue-500">
              <CardContent className="pt-8 pb-6">
                <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">$6,000</div>
                <div className="text-slate-300 mb-2">Monthly Potential</div>
                <div className="text-slate-400 text-sm">Based on 4 weeks operation</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 text-center">
              <CardContent className="pt-8 pb-6">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">$72K</div>
                <div className="text-slate-300 mb-2">Annual Potential</div>
                <div className="text-slate-400 text-sm">Full-time operation</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              * Earnings potential varies based on location, effort, and market conditions. These figures are examples
              based on successful franchisees.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-12 lg:py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-slate-300 text-lg">Everything you need to start your detailing business</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <Card className="bg-slate-800/30 border-slate-700 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Briefcase className="w-6 h-6 mr-3 text-blue-500" />
                    $1,000 Starter Kit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Professional vacuum cleaner",
                      "Pressure washer and hoses",
                      "Complete chemical kit",
                      "Microfiber towels and applicators",
                      "Brushes and detailing tools",
                      "Branded uniforms and signage",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-slate-800/30 border-slate-700 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Users className="w-6 h-6 mr-3 text-blue-500" />
                    Training & Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "1-week comprehensive training",
                      "Hands-on detailing techniques",
                      "Business operations training",
                      "Marketing and customer service",
                      "Ongoing support and mentoring",
                      "Access to booking system",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Who We're Looking For</h2>
            <p className="text-slate-300 text-lg">Perfect opportunities for various backgrounds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "International Students",
                description: "Flexible work around study schedules",
                icon: Users,
                benefits: ["Flexible hours", "Good income", "Skill development"],
              },
              {
                title: "Side Hustlers",
                description: "Perfect weekend or evening business",
                icon: Clock,
                benefits: ["Part-time income", "Scalable", "Low commitment"],
              },
              {
                title: "Existing Trades",
                description: "Add detailing to your service offering",
                icon: Briefcase,
                benefits: ["Expand services", "Existing customers", "Higher margins"],
              },
            ].map((candidate, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-colors">
                <CardContent className="pt-8 pb-6 text-center">
                  <candidate.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{candidate.title}</h3>
                  <p className="text-slate-400 mb-4">{candidate.description}</p>
                  <ul className="space-y-2">
                    {candidate.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 lg:py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Apply for a Franchise</h2>
              <p className="text-slate-300">Take the first step towards your detailing business</p>
            </div>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardContent className="p-6 lg:p-8">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location" className="text-white mb-2 block">
                        Preferred Location
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder="Suburb or area"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability" className="text-white mb-2 block">
                        Availability
                      </Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => handleInputChange("availability", value)}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="full-time" className="text-white">
                            Full-time
                          </SelectItem>
                          <SelectItem value="part-time" className="text-white">
                            Part-time
                          </SelectItem>
                          <SelectItem value="weekends" className="text-white">
                            Weekends only
                          </SelectItem>
                          <SelectItem value="flexible" className="text-white">
                            Flexible
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transport" className="text-white mb-2 block">
                        Transport Type
                      </Label>
                      <Select
                        value={formData.transport}
                        onValueChange={(value) => handleInputChange("transport", value)}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select transport" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="car" className="text-white">
                            Car
                          </SelectItem>
                          <SelectItem value="ute" className="text-white">
                            Ute/Pickup
                          </SelectItem>
                          <SelectItem value="van" className="text-white">
                            Van
                          </SelectItem>
                          <SelectItem value="trailer" className="text-white">
                            Car + Trailer
                          </SelectItem>
                          <SelectItem value="none" className="text-white">
                            Need to acquire
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-white mb-2 block">
                        Relevant Experience
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="none" className="text-white">
                            No experience
                          </SelectItem>
                          <SelectItem value="hobby" className="text-white">
                            Hobby detailing
                          </SelectItem>
                          <SelectItem value="automotive" className="text-white">
                            Automotive industry
                          </SelectItem>
                          <SelectItem value="cleaning" className="text-white">
                            Cleaning services
                          </SelectItem>
                          <SelectItem value="business" className="text-white">
                            Business owner
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Tell Us About Yourself
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                      placeholder="Why are you interested in an Apex franchise? What are your goals?"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Have Questions?</h2>
            <p className="text-slate-300 text-lg">Get in touch with our franchise team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-slate-800/30 border-slate-700 text-center">
              <CardContent className="pt-8 pb-6">
                <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Call Us</h3>
                <p className="text-slate-300">0412 345 678</p>
                <p className="text-slate-400 text-sm">Mon-Fri 9am-5pm</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 text-center">
              <CardContent className="pt-8 pb-6">
                <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                <p className="text-slate-300">franchise@apexautodetailers.com.au</p>
                <p className="text-slate-400 text-sm">Response within 24hrs</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 text-center">
              <CardContent className="pt-8 pb-6">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Visit Us</h3>
                <p className="text-slate-300">Sunshine Coast, QLD</p>
                <p className="text-slate-400 text-sm">By appointment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
