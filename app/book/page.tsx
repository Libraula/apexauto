"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [vehicleType, setVehicleType] = useState("")
  const [condition, setCondition] = useState("")
  const [step, setStep] = useState(1)

  const services = [
    { id: "essential", name: "Essential Detail", price: 95, description: "Quick maintenance clean" },
    { id: "premium", name: "Premium Interior", price: 250, description: "Deep interior reset" },
    { id: "signature", name: "Signature Detail", price: 290, description: "Most popular full service", popular: true },
    { id: "elite", name: "Elite Detail", price: 345, description: "Enhanced shine with machine polish" },
    { id: "showroom", name: "Showroom Package", price: 395, description: "Photo-ready perfection" },
  ]

  const addOns = [
    { id: "pet-hair", name: "Pet Hair Removal", price: 25 },
    { id: "odour", name: "Odour Neutraliser Treatment", price: 35 },
    { id: "fabric-protection", name: "Fabric/Upholstery Protection", price: 45 },
    { id: "premium-scent", name: "Premium Air Freshener Upgrade", price: 20 },
    { id: "headlight", name: "Headlight Restoration", price: 60 },
    { id: "steam", name: "Steam Sanitation", price: 50 },
  ]

  const vehicleTypes = [
    { id: "sedan", name: "Sedan/Hatchback", surcharge: 0 },
    { id: "suv", name: "SUV", surcharge: 15 },
    { id: "large", name: "7-seater/Ute/Van", surcharge: 25 },
  ]

  const conditions = [
    { id: "light", name: "Light soil", surcharge: 0 },
    { id: "medium", name: "Medium soil", surcharge: 20 },
    { id: "heavy", name: "Heavy soil", surcharge: 40 },
  ]

  const calculateTotal = () => {
    const service = services.find((s) => s.id === selectedService)
    const vehicle = vehicleTypes.find((v) => v.id === vehicleType)
    const conditionSurcharge = conditions.find((c) => c.id === condition)
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    const basePrice = service?.price || 0
    const vehicleSurcharge = vehicle?.surcharge || 0
    const conditionFee = conditionSurcharge?.surcharge || 0

    return basePrice + vehicleSurcharge + conditionFee + addOnTotal
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <Navigation />

      {/* Booking Form */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Book Your Detailing Service</h1>
            <p className="text-xl text-slate-300">Get your car professionally detailed at your location</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNum ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-12 h-0.5 ${step > stepNum ? "bg-blue-600" : "bg-slate-700"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Choose Your Service</h2>
                        <div className="space-y-4">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedService === service.id
                                  ? "border-blue-500 bg-blue-500/10"
                                  : "border-slate-600 hover:border-slate-500"
                              }`}
                              onClick={() => setSelectedService(service.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                                    {service.popular && (
                                      <Badge className="bg-blue-600 text-white text-xs">Popular</Badge>
                                    )}
                                  </div>
                                  <p className="text-slate-400 text-sm">{service.description}</p>
                                </div>
                                <div className="text-lg font-bold text-blue-400">From ${service.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!selectedService}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Continue to Vehicle Details
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vehicle Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-white mb-2 block">Vehicle Type</Label>
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                {vehicleTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id} className="text-white">
                                    {type.name} {type.surcharge > 0 && `(+$${type.surcharge})`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white mb-2 block">Vehicle Condition</Label>
                            <Select value={condition} onValueChange={setCondition}>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select condition level" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                {conditions.map((cond) => (
                                  <SelectItem key={cond.id} value={cond.id} className="text-white">
                                    {cond.name} {cond.surcharge > 0 && `(+$${cond.surcharge})`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Add-on Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {addOns.map((addOn) => (
                            <div key={addOn.id} className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedAddOns.includes(addOn.id)}
                                onChange={() => toggleAddOn(addOn.id)}
                                className="cursor-pointer"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-white">{addOn.name}</h4>
                                <p className="text-slate-400 text-xs">{`+$${addOn.price}`}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(3)}
                        disabled={!vehicleType || !condition}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Continue to Review
                      </Button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Review Your Booking</h2>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Selected Service</h3>
                            <p className="text-lg font-bold text-blue-400">
                              {services.find((s) => s.id === selectedService)?.name}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Vehicle Type</h3>
                            <p className="text-lg font-bold text-blue-400">
                              {vehicleTypes.find((v) => v.id === vehicleType)?.name}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Vehicle Condition</h3>
                            <p className="text-lg font-bold text-blue-400">
                              {conditions.find((c) => c.id === condition)?.name}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Add-on Services</h3>
                            <ul className="list-disc list-inside">
                              {selectedAddOns.map((addOnId) => (
                                <li key={addOnId} className="text-slate-400">
                                  {addOns.find((a) => a.id === addOnId)?.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Total Cost</h3>
                            <p className="text-lg font-bold text-blue-400">${calculateTotal()}</p>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => setStep(4)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Confirm Booking
                      </Button>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Thank You for Booking!</h2>
                        <p className="text-slate-400 text-sm">
                          Your booking has been confirmed. We will contact you shortly to finalize the details.
                        </p>
                      </div>
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/">Back to Home</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Your Booking Summary</h2>
                  {step === 1 && <p className="text-slate-400 text-sm">Please select a service to proceed.</p>}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Selected Service</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {services.find((s) => s.id === selectedService)?.name}
                        </p>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Selected Service</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {services.find((s) => s.id === selectedService)?.name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Vehicle Type</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {vehicleTypes.find((v) => v.id === vehicleType)?.name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Vehicle Condition</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {conditions.find((c) => c.id === condition)?.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Add-on Services</h3>
                        <ul className="list-disc list-inside">
                          {selectedAddOns.map((addOnId) => (
                            <li key={addOnId} className="text-slate-400">
                              {addOns.find((a) => a.id === addOnId)?.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Total Cost</h3>
                        <p className="text-lg font-bold text-blue-400">${calculateTotal()}</p>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Selected Service</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {services.find((s) => s.id === selectedService)?.name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Vehicle Type</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {vehicleTypes.find((v) => v.id === vehicleType)?.name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Vehicle Condition</h3>
                        <p className="text-lg font-bold text-blue-400">
                          {conditions.find((c) => c.id === condition)?.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Add-on Services</h3>
                        <ul className="list-disc list-inside">
                          {selectedAddOns.map((addOnId) => (
                            <li key={addOnId} className="text-slate-400">
                              {addOns.find((a) => a.id === addOnId)?.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Total Cost</h3>
                        <p className="text-lg font-bold text-blue-400">${calculateTotal()}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
