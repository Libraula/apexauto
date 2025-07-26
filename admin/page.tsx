"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Car,
  DollarSign,
  ImageIcon,
  MessageSquare,
  Upload,
  LogOut,
} from "lucide-react"
import { Navigation } from "../navigation"
import { getBookings, updateBookingStatus, type Booking } from "@/lib/booking-service"
import { getContactSubmissions, updateContactStatus, type ContactSubmission } from "@/lib/contact-service"
import { getGalleryImages, uploadGalleryImage, type GalleryImage } from "@/lib/gallery-service"
import { isAdminAuthenticated, setAdminAuthenticated } from "@/lib/auth"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "",
    beforeImage: null as File | null,
    afterImage: null as File | null,
  })

  const categories = [
    { value: "exterior", label: "Exterior Details" },
    { value: "interior", label: "Interior Details" },
    { value: "engine", label: "Engine Bay" },
    { value: "wheels", label: "Wheels & Tires" },
    { value: "paint", label: "Paint Correction" },
    { value: "ceramic", label: "Ceramic Coating" },
  ]

  useEffect(() => {
    const authenticated = isAdminAuthenticated()
    setIsAuthenticated(authenticated)
    if (authenticated) {
      loadData()
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setAdminAuthenticated(true)
        setIsAuthenticated(true)
        loadData()
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    setAdminAuthenticated(false)
    setIsAuthenticated(false)
    setPassword("")
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

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

  const handleFileChange = (field: "beforeImage" | "afterImage", file: File | null) => {
    setUploadForm((prev) => ({ ...prev, [field]: file }))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.beforeImage || !uploadForm.afterImage) {
      toast({
        title: "Missing Images",
        description: "Please select both before and after images.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const result = await uploadGalleryImage({
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
        beforeImage: uploadForm.beforeImage,
        afterImage: uploadForm.afterImage,
      })

      if (result.success) {
        toast({
          title: "Images Uploaded!",
          description: "Your before/after images have been added to the gallery.",
        })
        setUploadForm({
          title: "",
          description: "",
          category: "",
          beforeImage: null,
          afterImage: null,
        })
        loadData()
      } else {
        toast({
          title: "Upload Failed",
          description: result.error || "Failed to upload images. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-apex-orange text-apex-dark-blue"
      case "confirmed":
        return "bg-apex-teal-blue text-apex-light-grey"
      case "completed":
        return "bg-apex-red text-apex-light-grey"
      case "cancelled":
        return "bg-apex-light-grey/20 text-apex-light-grey"
      default:
        return "bg-apex-teal-blue/20 text-apex-light-grey"
    }
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-apex-dark-blue flex items-center justify-center">
        <Card className="w-full max-w-md bg-apex-teal-blue/20 border-apex-teal-blue">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-apex-light-grey">Admin Login</CardTitle>
            <CardDescription className="text-apex-light-grey/70">
              Enter your password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-apex-light-grey">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-apex-red hover:bg-apex-red/90 text-white">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
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
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-apex-light-grey">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-apex-dark-blue">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-apex-light-grey mb-2">Admin Dashboard</h1>
            <p className="text-apex-light-grey/70">Manage bookings, contacts, and gallery content</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-apex-red text-apex-red hover:bg-apex-red/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-apex-light-grey">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-apex-light-grey">{stats.pendingBookings}</p>
                </div>
                <Clock className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Contacts</p>
                  <p className="text-2xl font-bold text-apex-light-grey">{stats.totalContacts}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-apex-light-grey">{stats.unreadContacts}</p>
                </div>
                <Mail className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-apex-light-grey">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-apex-light-grey/70 text-sm">Gallery</p>
                  <p className="text-2xl font-bold text-apex-light-grey">{stats.galleryImages}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-apex-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-apex-teal-blue/20 border-apex-teal-blue">
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-apex-red data-[state=active]:text-apex-light-grey"
            >
              Bookings ({stats.totalBookings})
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-apex-red data-[state=active]:text-apex-light-grey"
            >
              Contacts ({stats.totalContacts})
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-apex-red data-[state=active]:text-apex-light-grey"
            >
              Gallery ({stats.galleryImages})
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-apex-red data-[state=active]:text-apex-light-grey"
            >
              Upload Images
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
                        <CardTitle className="text-apex-light-grey flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>{booking.name}</span>
                        </CardTitle>
                        <CardDescription className="text-apex-light-grey/70">
                          {booking.serviceType} • ${booking.totalPrice}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleBookingStatusUpdate(booking.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                            <SelectItem value="pending" className="text-apex-light-grey">
                              Pending
                            </SelectItem>
                            <SelectItem value="confirmed" className="text-apex-light-grey">
                              Confirmed
                            </SelectItem>
                            <SelectItem value="completed" className="text-apex-light-grey">
                              Completed
                            </SelectItem>
                            <SelectItem value="cancelled" className="text-apex-light-grey">
                              Cancelled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <Mail className="w-4 h-4" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {booking.address}, {booking.suburb} {booking.postcode}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <Car className="w-4 h-4" />
                        <span>
                          {booking.vehicleType} • {booking.vehicleCondition}
                        </span>
                      </div>
                      {booking.preferredDate && (
                        <div className="flex items-center space-x-2 text-apex-light-grey/80">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {booking.preferredDate} {booking.preferredTime && `at ${booking.preferredTime}`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-apex-gold font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>${booking.totalPrice}</span>
                      </div>
                    </div>
                    {booking.addOns && booking.addOns.length > 0 && (
                      <div className="mt-4">
                        <p className="text-apex-light-grey/70 text-sm mb-2">Add-ons:</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.addOns.map((addOn, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-apex-teal-blue text-apex-light-grey/80"
                            >
                              {addOn}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {booking.specialInstructions && (
                      <div className="mt-4">
                        <p className="text-apex-light-grey/70 text-sm mb-1">Special Instructions:</p>
                        <p className="text-apex-light-grey/80 text-sm bg-apex-dark-blue/30 p-3 rounded">
                          {booking.specialInstructions}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 text-xs text-apex-light-grey/50">
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
                        <CardTitle className="text-apex-light-grey flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>{contact.name}</span>
                        </CardTitle>
                        <CardDescription className="text-apex-light-grey/70">
                          {contact.serviceInterest && `Interested in: ${contact.serviceInterest}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => handleContactStatusUpdate(contact.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                            <SelectItem value="new" className="text-apex-light-grey">
                              New
                            </SelectItem>
                            <SelectItem value="contacted" className="text-apex-light-grey">
                              Contacted
                            </SelectItem>
                            <SelectItem value="resolved" className="text-apex-light-grey">
                              Resolved
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-apex-light-grey/80">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-apex-light-grey/70 text-sm mb-2">Message:</p>
                      <p className="text-apex-light-grey/80 text-sm bg-apex-dark-blue/30 p-3 rounded">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-xs text-apex-light-grey/50">
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
                    <CardTitle className="text-apex-light-grey text-lg">{image.title}</CardTitle>
                    <CardDescription className="text-apex-light-grey/70">
                      Category: {image.category} • {new Date(image.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-apex-light-grey/70 text-xs mb-1">Before</p>
                        <div className="aspect-video bg-apex-dark-blue/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-apex-light-grey/50" />
                        </div>
                      </div>
                      <div>
                        <p className="text-apex-light-grey/70 text-xs mb-1">After</p>
                        <div className="aspect-video bg-apex-dark-blue/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-apex-light-grey/50" />
                        </div>
                      </div>
                    </div>
                    {image.description && <p className="text-apex-light-grey/80 text-sm">{image.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-apex-teal-blue/20 border-apex-teal-blue">
              <CardHeader>
                <CardTitle className="text-apex-light-grey">Upload Gallery Images</CardTitle>
                <CardDescription className="text-apex-light-grey/70">
                  Add new before/after images to the gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-apex-light-grey mb-2 block">Title *</Label>
                      <Input
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50"
                        placeholder="e.g., BMW Interior Detail"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label className="text-apex-light-grey mb-2 block">Category *</Label>
                      <Select
                        value={uploadForm.category}
                        onValueChange={(value) => setUploadForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-apex-dark-blue border-apex-teal-blue">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-apex-light-grey">
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-apex-light-grey mb-2 block">Description</Label>
                    <Input
                      className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50"
                      placeholder="Brief description of the work done"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-apex-light-grey mb-2 block">Before Image *</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey file:bg-apex-red file:text-apex-light-grey file:border-0 file:rounded file:px-3 file:py-1"
                        onChange={(e) => handleFileChange("beforeImage", e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Label className="text-apex-light-grey mb-2 block">After Image *</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        required
                        className="bg-apex-dark-blue/30 border-apex-teal-blue text-apex-light-grey file:bg-apex-red file:text-apex-light-grey file:border-0 file:rounded file:px-3 file:py-1"
                        onChange={(e) => handleFileChange("afterImage", e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="bg-apex-red hover:bg-apex-red/90 text-apex-light-grey"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload Images"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
