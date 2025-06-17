import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Clock,
  Building
} from "lucide-react"

const MedicalCampsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const medicalCamps = [
    {
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
    },
    {
      id: "2",
      title: "COVID-19 Vaccination Drive",
      organizer: "Primary Health Center",
      date: "2024-06-22",
      time: "10:00 AM - 2:00 PM",
      location: "Government School",
      address: "Village Panchayat, Block - Sohna",
      services: ["COVID Vaccine", "Booster Doses", "Health Card Registration"],
      capacity: 150,
      registered: 89,
      type: "vaccination"
    },
    {
      id: "3",
      title: "Eye Care Specialist Camp",
      organizer: "Aravind Eye Care",
      date: "2024-06-25",
      time: "8:00 AM - 6:00 PM",
      location: "Rural Health Center",
      address: "Main Road, Tauru, Mewat",
      services: [
        "Eye Examination",
        "Cataract Screening",
        "Free Spectacles",
        "Surgery Consultation"
      ],
      capacity: 100,
      registered: 76,
      type: "specialist"
    }
  ]

  const filteredCamps = medicalCamps.filter(camp => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.services.some(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesType = selectedType === "all" || camp.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = type => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-800"
      case "vaccination":
        return "bg-blue-100 text-blue-800"
      case "specialist":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (registered, capacity) => {
    const percentage = (registered / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 70) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <section id="camps" className="px-2 py-2 sm:px-6 lg:px-8 bg-gray-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 py-20">
            Live Medical Camps & Drives
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find free medical camps, vaccination drives, and specialist
            consultations near you. Real-time updates on availability and
            registration.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by camp name, location, or services..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Camps</SelectItem>
              <SelectItem value="free">Free Checkups</SelectItem>
              <SelectItem value="vaccination">Vaccination</SelectItem>
              <SelectItem value="specialist">Specialist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Medical Camps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.map(camp => (
            <Card
              key={camp.id}
              className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md min-w-0"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                    {camp.title}
                  </CardTitle>
                  <Badge className={`${getTypeColor(camp.type)} font-medium`}>
                    {camp.type === "free"
                      ? "Free"
                      : camp.type === "vaccination"
                      ? "Vaccine"
                      : "Specialist"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {camp.organizer}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Date and Time */}
                <div className="flex flex-wrap items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(camp.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {camp.time}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{camp.location}</p>
                    <p className="text-gray-600">{camp.address}</p>
                  </div>
                </div>

                {/* Services */}
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

                {/* Capacity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span
                      className={`font-medium ${getCapacityColor(
                        camp.registered,
                        camp.capacity
                      )}`}
                    >
                      {camp.registered}/{camp.capacity}
                    </span>
                    <span className="text-gray-600">registered</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((camp.registered / camp.capacity) * 100)}% full
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(camp.registered / camp.capacity) * 100}%`
                    }}
                  ></div>
                </div>

                {/* Register Button */}
                <Link to={`/book-camp?campId=${camp.id}`}>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={camp.registered >= camp.capacity}
                  >
                    {camp.registered >= camp.capacity
                      ? "Camp Full"
                      : "Register Now"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCamps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No medical camps found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default MedicalCampsDashboard
