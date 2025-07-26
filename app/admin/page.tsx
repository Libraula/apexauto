"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, MapPin, Phone, Mail, User, Car, DollarSign, ImageIcon, MessageSquare } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { getBookings, updateBookingStatus, type Booking } from "@/lib/booking-service"
import { getContactSubmissions, updateContactStatus, type ContactSubmission } from "@/lib/contact-service"
import { getGalleryImages, type GalleryImage } from "@/lib/gallery-service"

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [bookingsResult, contactsResult, galleryResult] = await Promise.all([
        getBookings(),
        getContactSubmissions(),
        getGalleryImages(),
      ])

      if (bookingsResult.success && bookingsResult.data) {
        setBookings(bookingsResult.data)
      }
      if (contactsResult.success && contactsResult.data) {
        setContacts(contactsResult.data)
      }
      if (galleryResult.success && galleryResult.data) {
        setGalleryImages(galleryResult.data)
      }
    } catch (error) {
      toast({
        title: "Failed to Load Data",
        description: "Unable to load dashboard data. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookingStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const result = await updateBookingStatus(bookingId, newStatus)
      if (result.success) {
        setBookings((prev) =>
          prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
        )
        toast({
          title: "Status Updated",
          description: "Booking status has been updated successfully.",
        })
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update booking status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }

  const handleContactStatusUpdate = async (contactId: string, newStatus: string) => {
    try {
      const result = await updateContactStatus(contactId, newStatus)
      if (result.success) {
        setContacts((prev) =>
          prev.map((contact) => (contact.id === contactId ? { ...contact, status: newStatus } : contact)),
        )
        toast({
          title: "Status Updated",
          description: "Contact status has been updated successfully.",
        })
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update contact status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-apex-orange-yellow text-apex-dark-blue"
      case "confirmed":
        return "bg-apex-teal-blue text-apex-light-yellow"
      case "completed":
        return "bg-apex-bright-red text-apex-light-yellow"
      case "cancelled":
        return "bg-apex-light-yellow/20 text-apex-light-yellow"
      default:
        return "bg-apex-teal-blue/20 text-apex-light-yellow"
    }
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter((c) => c.status === "new").length,
    totalRevenue: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.totalPrice, 0),
    galleryImages: galleryImages.length,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-apex-dark-blue">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-apex-light-yellow">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-apex-light-yellow mb-2">Admin Dashboard</h1>
          <p className="text-apex-light-yellow/70">Manage bookings, contacts, and gallery content</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">{stats.pendingBookings}</p>
                </div>
                <Clock className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Contacts</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">{stats.totalContacts}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">{stats.unreadContacts}</p>
                </div>
                <Mail className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-yellow/70 text-sm">Gallery</p>
                  <p className="text-2xl font-bold text-apex-light-yellow">{stats.galleryImages}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-apex-orange-yellow" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-apex-bright-red data-[state=active]:text-apex-light-yellow"
            >
              Bookings ({stats.totalBookings})
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-apex-bright-red data-[state=active]:text-apex-light-yellow"
            >
              Contacts ({stats.totalContacts})
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-apex-bright-red data-[state=active]:text-apex-light-yellow"
            >
              Gallery ({stats.galleryImages})
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-apex-light-yellow flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>{booking.name}</span>
                        </CardTitle>
                        <CardDescription className="text-apex-light-yellow/70">
                          {booking.serviceType} • ${booking.totalPrice}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleBookingStatusUpdate(booking.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                            <SelectItem value="pending" className="text-apex-light-yellow">
                              Pending
                            </SelectItem>
                            <SelectItem value="confirmed" className="text-apex-light-yellow">
                              Confirmed
                            </SelectItem>
                            <SelectItem value="completed" className="text-apex-light-yellow">
                              Completed
                            </SelectItem>
                            <SelectItem value="cancelled" className="text-apex-light-yellow">
                              Cancelled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <Mail className="w-4 h-4" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {booking.address}, {booking.suburb} {booking.postcode}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <Car className="w-4 h-4" />
                        <span>
                          {booking.vehicleType} • {booking.vehicleCondition}
                        </span>
                      </div>
                      {booking.preferredDate && (
                        <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {booking.preferredDate} {booking.preferredTime && `at ${booking.preferredTime}`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <DollarSign className="w-4 h-4" />
                        <span>${booking.totalPrice}</span>
                      </div>
                    </div>
                    {booking.addOns && booking.addOns.length > 0 && (
                      <div className="mt-4">
                        <p className="text-apex-light-yellow/70 text-sm mb-2">Add-ons:</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.addOns.map((addOn, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-apex-teal-blue text-apex-light-yellow/80"
                            >
                              {addOn}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {booking.specialInstructions && (
                      <div className="mt-4">
                        <p className="text-apex-light-yellow/70 text-sm mb-1">Special Instructions:</p>
                        <p className="text-apex-light-yellow/80 text-sm">{booking.specialInstructions}</p>
                      </div>
                    )}
                    <div className="mt-4 text-xs text-apex-light-yellow/50">
                      Created: {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-apex-light-yellow flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>{contact.name}</span>
                        </CardTitle>
                        <CardDescription className="text-apex-light-yellow/70">
                          {contact.serviceInterest && `Interested in: ${contact.serviceInterest}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => handleContactStatusUpdate(contact.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-yellow">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                            <SelectItem value="new" className="text-apex-light-yellow">
                              New
                            </SelectItem>
                            <SelectItem value="contacted" className="text-apex-light-yellow">
                              Contacted
                            </SelectItem>
                            <SelectItem value="resolved" className="text-apex-light-yellow">
                              Resolved
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-yellow/80">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-apex-light-yellow/70 text-sm mb-2">Message:</p>
                      <p className="text-apex-light-yellow/80 text-sm bg-apex-dark-blue/30 p-3 rounded">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-xs text-apex-light-yellow/50">
                      Submitted: {new Date(contact.createdAt).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <Card key={image.id} className="bg-apex-teal-blue/20 border-apex-teal-blue">
                  <CardHeader>
                    <CardTitle className="text-apex-light-yellow text-lg">{image.title}</CardTitle>
                    <CardDescription className="text-apex-light-yellow/70">
                      Category: {image.category} • {new Date(image.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-apex-light-yellow/70 text-xs mb-1">Before</p>
                        <div className="aspect-video bg-apex-dark-blue/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-apex-light-yellow/50" />
                        </div>
                      </div>
                      <div>
                        <p className="text-apex-light-yellow/70 text-xs mb-1">After</p>
                        <div className="aspect-video bg-apex-dark-blue/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-apex-light-yellow/50" />
                        </div>
                      </div>
                    </div>
                    {image.description && <p className="text-apex-light-yellow/80 text-sm">{image.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
