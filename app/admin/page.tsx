"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, MessageSquare, ImageIcon, Settings, Trash2, Edit, Eye, Upload, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getBookings, updateBookingStatus, deleteBooking, type Booking } from "@/lib/booking-service"
import {
  getContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
  type ContactSubmission,
} from "@/lib/contact-service"
import {
  getGalleryImages,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  type GalleryImage,
} from "@/lib/gallery-service"
import {
  getCustomerSubscriptions,
  updateSubscriptionStatus,
  type CustomerSubscription,
} from "@/lib/subscription-service"
import { getHomeContent, deleteHomeContent, type HomeContent } from "@/lib/home-content-service"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>([])
  const [homeContent, setHomeContent] = useState<HomeContent[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)
  const [newGalleryImage, setNewGalleryImage] = useState({
    title: "",
    description: "",
    category: "",
    beforeImage: null as File | null,
    afterImage: null as File | null,
    isFeatured: false,
  })
  const { toast } = useToast()

  const handleLogin = async () => {
    try {
      const response = await fetch("/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        loadData()
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate",
        variant: "destructive",
      })
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [bookingsResult, contactsResult, galleryResult, subscriptionsResult, homeContentResult] = await Promise.all(
        [getBookings(), getContactSubmissions(), getGalleryImages(), getCustomerSubscriptions(), getHomeContent()],
      )

      if (bookingsResult.success) setBookings(bookingsResult.data || [])
      if (contactsResult.success) setContacts(contactsResult.data || [])
      if (galleryResult.success) setGalleryImages(galleryResult.data || [])
      if (subscriptionsResult.success) setSubscriptions(subscriptionsResult.data || [])
      if (homeContentResult.success) setHomeContent(homeContentResult.data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    const result = await updateBookingStatus(bookingId, status)
    if (result.success) {
      toast({
        title: "Success",
        description: "Booking status updated",
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    const result = await deleteBooking(bookingId)
    if (result.success) {
      toast({
        title: "Success",
        description: "Booking deleted",
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleUpdateContactStatus = async (contactId: string, status: string) => {
    const result = await updateContactStatus(contactId, status)
    if (result.success) {
      toast({
        title: "Success",
        description: "Contact status updated",
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleUploadGalleryImage = async () => {
    if (
      !newGalleryImage.title ||
      !newGalleryImage.category ||
      !newGalleryImage.beforeImage ||
      !newGalleryImage.afterImage
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const result = await uploadGalleryImage({
      title: newGalleryImage.title,
      description: newGalleryImage.description,
      category: newGalleryImage.category,
      beforeImage: newGalleryImage.beforeImage,
      afterImage: newGalleryImage.afterImage,
      isFeatured: newGalleryImage.isFeatured,
    })

    if (result.success) {
      toast({
        title: "Success",
        description: "Gallery image uploaded",
      })
      setNewGalleryImage({
        title: "",
        description: "",
        category: "",
        beforeImage: null,
        afterImage: null,
        isFeatured: false,
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleToggleGalleryImageFeatured = async (imageId: string, isFeatured: boolean) => {
    const result = await updateGalleryImage(imageId, { isFeatured: !isFeatured })
    if (result.success) {
      toast({
        title: "Success",
        description: "Gallery image updated",
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleDeleteGalleryImage = async (imageId: string) => {
    const result = await deleteGalleryImage(imageId)
    if (result.success) {
      toast({
        title: "Success",
        description: "Gallery image deleted",
      })
      loadData()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich flex items-center justify-center">
        <Card className="w-full max-w-md bg-black-deep/50 border-red-primary/20">
          <CardHeader>
            <CardTitle className="text-text-warm text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-text-light">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black-rich border-red-primary/30 text-text-light"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <Button onClick={handleLogin} className="w-full bg-red-primary hover:bg-red-secondary">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-rich via-black-deep to-black-rich">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-warm mb-2">Admin Dashboard</h1>
          <p className="text-text-light/70">Manage your car detailing business</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black-deep/50 border border-red-primary/20">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-red-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-red-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-red-primary">
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-red-primary">
              <Users className="w-4 h-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-red-primary">
              <Settings className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Bookings Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-text-light">Customer</TableHead>
                        <TableHead className="text-text-light">Service</TableHead>
                        <TableHead className="text-text-light">Date & Time</TableHead>
                        <TableHead className="text-text-light">Status</TableHead>
                        <TableHead className="text-text-light">Total</TableHead>
                        <TableHead className="text-text-light">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="text-text-light">
                            <div>
                              <div className="font-medium">
                                {booking.firstName} {booking.lastName}
                              </div>
                              <div className="text-sm text-text-light/60">{booking.email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-text-light">
                            <div>
                              <div className="font-medium">{booking.serviceType}</div>
                              <div className="text-sm text-text-light/60">
                                {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-text-light">
                            <div>
                              <div>{booking.preferredDate}</div>
                              <div className="text-sm text-text-light/60">{booking.preferredTime}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : booking.status === "completed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-text-light">${booking.totalPrice}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black-deep border-red-primary/20 max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-text-warm">Booking Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedBooking && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-text-light">Customer Name</Label>
                                          <p className="text-text-warm">
                                            {selectedBooking.firstName} {selectedBooking.lastName}
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-text-light">Email</Label>
                                          <p className="text-text-warm">{selectedBooking.email}</p>
                                        </div>
                                        <div>
                                          <Label className="text-text-light">Phone</Label>
                                          <p className="text-text-warm">{selectedBooking.phone}</p>
                                        </div>
                                        <div>
                                          <Label className="text-text-light">Service Type</Label>
                                          <p className="text-text-warm">{selectedBooking.serviceType}</p>
                                        </div>
                                        <div>
                                          <Label className="text-text-light">Vehicle</Label>
                                          <p className="text-text-warm">
                                            {selectedBooking.vehicleYear} {selectedBooking.vehicleMake}{" "}
                                            {selectedBooking.vehicleModel}
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-text-light">Service Location</Label>
                                          <p className="text-text-warm">{selectedBooking.serviceLocation}</p>
                                        </div>
                                      </div>
                                      {selectedBooking.serviceAddress && (
                                        <div>
                                          <Label className="text-text-light">Service Address</Label>
                                          <p className="text-text-warm">{selectedBooking.serviceAddress}</p>
                                        </div>
                                      )}
                                      {selectedBooking.specialRequests && (
                                        <div>
                                          <Label className="text-text-light">Special Requests</Label>
                                          <p className="text-text-warm">{selectedBooking.specialRequests}</p>
                                        </div>
                                      )}
                                      <div className="flex gap-2">
                                        <Select
                                          onValueChange={(value) =>
                                            handleUpdateBookingStatus(selectedBooking.id, value)
                                          }
                                        >
                                          <SelectTrigger className="bg-black-rich border-red-primary/30">
                                            <SelectValue placeholder="Update Status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-400 bg-transparent"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black-deep border-red-primary/20">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-text-warm">Delete Booking</AlertDialogTitle>
                                    <AlertDialogDescription className="text-text-light/70">
                                      Are you sure you want to delete this booking? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="bg-red-primary hover:bg-red-secondary"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-text-light">Name</TableHead>
                        <TableHead className="text-text-light">Email</TableHead>
                        <TableHead className="text-text-light">Service Interest</TableHead>
                        <TableHead className="text-text-light">Status</TableHead>
                        <TableHead className="text-text-light">Date</TableHead>
                        <TableHead className="text-text-light">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="text-text-light font-medium">{contact.name}</TableCell>
                          <TableCell className="text-text-light">{contact.email}</TableCell>
                          <TableCell className="text-text-light">{contact.serviceInterest || "N/A"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                contact.status === "resolved"
                                  ? "secondary"
                                  : contact.status === "in_progress"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {contact.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-text-light">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedContact(contact)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black-deep border-red-primary/20">
                                  <DialogHeader>
                                    <DialogTitle className="text-text-warm">Contact Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedContact && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="text-text-light">Name</Label>
                                        <p className="text-text-warm">{selectedContact.name}</p>
                                      </div>
                                      <div>
                                        <Label className="text-text-light">Email</Label>
                                        <p className="text-text-warm">{selectedContact.email}</p>
                                      </div>
                                      {selectedContact.phone && (
                                        <div>
                                          <Label className="text-text-light">Phone</Label>
                                          <p className="text-text-warm">{selectedContact.phone}</p>
                                        </div>
                                      )}
                                      <div>
                                        <Label className="text-text-light">Message</Label>
                                        <p className="text-text-warm">{selectedContact.message}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Select
                                          onValueChange={(value) =>
                                            handleUpdateContactStatus(selectedContact.id, value)
                                          }
                                        >
                                          <SelectTrigger className="bg-black-rich border-red-primary/30">
                                            <SelectValue placeholder="Update Status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-400 bg-transparent"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black-deep border-red-primary/20">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-text-warm">Delete Contact</AlertDialogTitle>
                                    <AlertDialogDescription className="text-text-light/70">
                                      Are you sure you want to delete this contact submission? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteContactSubmission(contact.id)}
                                      className="bg-red-primary hover:bg-red-secondary"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="space-y-6">
              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm">Add New Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-text-light">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={newGalleryImage.title}
                        onChange={(e) => setNewGalleryImage((prev) => ({ ...prev, title: e.target.value }))}
                        className="bg-black-rich border-red-primary/30 text-text-light"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-text-light">
                        Category *
                      </Label>
                      <Select
                        value={newGalleryImage.category}
                        onValueChange={(value) => setNewGalleryImage((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="bg-black-rich border-red-primary/30 text-text-light">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Exterior">Exterior</SelectItem>
                          <SelectItem value="Interior">Interior</SelectItem>
                          <SelectItem value="Paint Protection">Paint Protection</SelectItem>
                          <SelectItem value="Full Service">Full Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="description" className="text-text-light">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newGalleryImage.description}
                        onChange={(e) => setNewGalleryImage((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-black-rich border-red-primary/30 text-text-light"
                      />
                    </div>
                    <div>
                      <Label htmlFor="beforeImage" className="text-text-light">
                        Before Image *
                      </Label>
                      <Input
                        id="beforeImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setNewGalleryImage((prev) => ({ ...prev, beforeImage: e.target.files?.[0] || null }))
                        }
                        className="bg-black-rich border-red-primary/30 text-text-light"
                      />
                    </div>
                    <div>
                      <Label htmlFor="afterImage" className="text-text-light">
                        After Image *
                      </Label>
                      <Input
                        id="afterImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setNewGalleryImage((prev) => ({ ...prev, afterImage: e.target.files?.[0] || null }))
                        }
                        className="bg-black-rich border-red-primary/30 text-text-light"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={newGalleryImage.isFeatured}
                        onCheckedChange={(checked) => setNewGalleryImage((prev) => ({ ...prev, isFeatured: checked }))}
                      />
                      <Label htmlFor="featured" className="text-text-light">
                        Featured Image
                      </Label>
                    </div>
                  </div>
                  <Button onClick={handleUploadGalleryImage} className="mt-4 bg-red-primary hover:bg-red-secondary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black-deep/50 border-red-primary/20">
                <CardHeader>
                  <CardTitle className="text-text-warm">Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image) => (
                      <Card key={image.id} className="bg-black-rich/50 border-red-primary/20">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-text-warm">{image.title}</h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleGalleryImageFeatured(image.id, image.isFeatured)}
                                className={image.isFeatured ? "text-yellow-500" : "text-text-light/60"}
                              >
                                <Star className="w-4 h-4" />
                              </Button>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {image.category}
                            </Badge>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-text-light/60 mb-1">Before</p>
                                <img
                                  src={image.beforeImageUrl || "/placeholder.svg"}
                                  alt="Before"
                                  className="w-full h-20 object-cover rounded"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-text-light/60 mb-1">After</p>
                                <img
                                  src={image.afterImageUrl || "/placeholder.svg"}
                                  alt="After"
                                  className="w-full h-20 object-cover rounded"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-400 bg-transparent"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black-deep border-red-primary/20">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-text-warm">Delete Image</AlertDialogTitle>
                                    <AlertDialogDescription className="text-text-light/70">
                                      Are you sure you want to delete this gallery image? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteGalleryImage(image.id)}
                                      className="bg-red-primary hover:bg-red-secondary"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Customer Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-text-light">Customer</TableHead>
                        <TableHead className="text-text-light">Plan</TableHead>
                        <TableHead className="text-text-light">Billing</TableHead>
                        <TableHead className="text-text-light">Status</TableHead>
                        <TableHead className="text-text-light">Next Billing</TableHead>
                        <TableHead className="text-text-light">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="text-text-light">
                            <div>
                              <div className="font-medium">{subscription.customerName}</div>
                              <div className="text-sm text-text-light/60">{subscription.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-text-light">{subscription.planId}</TableCell>
                          <TableCell className="text-text-light capitalize">{subscription.billingType}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                subscription.status === "active"
                                  ? "default"
                                  : subscription.status === "paused"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {subscription.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-text-light">{subscription.nextBillingDate}</TableCell>
                          <TableCell>
                            <Select onValueChange={(value) => updateSubscriptionStatus(subscription.id, value)}>
                              <SelectTrigger className="w-32 bg-black-rich border-red-primary/30">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="paused">Paused</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="bg-black-deep/50 border-red-primary/20">
              <CardHeader>
                <CardTitle className="text-text-warm">Home Page Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homeContent.map((content) => (
                    <Card key={content.id} className="bg-black-rich/50 border-red-primary/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-medium text-text-warm">{content.title || content.contentType}</h3>
                            <Badge variant="outline">{content.contentType}</Badge>
                            {content.description && <p className="text-sm text-text-light/70">{content.description}</p>}
                            {content.imageUrl && (
                              <img
                                src={content.imageUrl || "/placeholder.svg"}
                                alt={content.altText}
                                className="w-32 h-20 object-cover rounded"
                              />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-400 bg-transparent"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-black-deep border-red-primary/20">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-text-warm">Delete Content</AlertDialogTitle>
                                  <AlertDialogDescription className="text-text-light/70">
                                    Are you sure you want to delete this content? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteHomeContent(content.id)}
                                    className="bg-red-primary hover:bg-red-secondary"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
