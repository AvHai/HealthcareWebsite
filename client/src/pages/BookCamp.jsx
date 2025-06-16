import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Phone,
  User,
  FileText
} from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
//import { useToast } from "@/hooks/use-toast"

const BookCamp = () => {
  const [searchParams] = useSearchParams()
  const { toast } = useToast()
  const campId = searchParams.get("campId") || "1"

  // Mock camp data - in real app, this would come from database
  const camp = {
    id: "1",
    title: "Free General Health Checkup",
    organizer: "District Health Department",
    date: "2024-06-20",
    time: "9:00 AM - 4:00 PM",
    location: "Community Center, Sector 15",
    address: "Near Bus Stand, Sector 15, Gurugram",
    services: [
      "General Checkup",
      "Blood Pressure",
      "Diabetes Screening",
      "BMI Check"
    ],
    capacity: 200,
    registered: 147,
    type: "free"
  }

  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    medicalHistory: "",
    emergencyContact: "",
    emergencyPhone: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const bookingNumber = `BK${Date.now()
        .toString()
        .slice(-6)}`

      toast({
        title: "Booking Confirmed!",
        description: `Your booking number is ${bookingNumber}. Please save this for your records.`
      })

      // Reset form
      setBookingForm({
        fullName: "",
        phone: "",
        email: "",
        age: "",
        gender: "",
        address: "",
        medicalHistory: "",
        emergencyContact: "",
        emergencyPhone: ""
      })

      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid =
    bookingForm.fullName &&
    bookingForm.phone &&
    bookingForm.email &&
    bookingForm.age

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Medical Camp Appointment
          </h1>
          <p className="text-gray-600">
            Fill out the form below to secure your spot at the medical camp
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Camp Details Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Camp Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{camp.title}</h3>
                  <p className="text-sm text-gray-600">{camp.organizer}</p>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {new Date(camp.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{camp.time}</span>
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">{camp.location}</p>
                    <p className="text-gray-600">{camp.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>
                    {camp.registered}/{camp.capacity} registered
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Services Available:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {camp.services.map((service, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={bookingForm.fullName}
                          onChange={e =>
                            handleInputChange("fullName", e.target.value)
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          value={bookingForm.age}
                          onChange={e =>
                            handleInputChange("age", e.target.value)
                          }
                          placeholder="Enter your age"
                          min="1"
                          max="120"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingForm.phone}
                          onChange={e =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingForm.email}
                          onChange={e =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={bookingForm.gender}
                        onChange={e =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={bookingForm.address}
                        onChange={e =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Medical Information
                    </h3>

                    <div>
                      <Label htmlFor="medicalHistory">
                        Medical History / Current Conditions
                      </Label>
                      <Textarea
                        id="medicalHistory"
                        value={bookingForm.medicalHistory}
                        onChange={e =>
                          handleInputChange("medicalHistory", e.target.value)
                        }
                        placeholder="Please mention any chronic conditions, allergies, current medications, or specific health concerns"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Emergency Contact
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">
                          Emergency Contact Name
                        </Label>
                        <Input
                          id="emergencyContact"
                          value={bookingForm.emergencyContact}
                          onChange={e =>
                            handleInputChange(
                              "emergencyContact",
                              e.target.value
                            )
                          }
                          placeholder="Name of emergency contact"
                        />
                      </div>

                      <div>
                        <Label htmlFor="emergencyPhone">
                          Emergency Contact Phone
                        </Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={bookingForm.emergencyPhone}
                          onChange={e =>
                            handleInputChange("emergencyPhone", e.target.value)
                          }
                          placeholder="Emergency contact phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? "Booking..." : "Confirm Booking"}
                    </Button>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      * Required fields. You will receive a confirmation email
                      with your booking details.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BookCamp
