import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const AdminDashboard = () => {
  const [camps, setCamps] = useState([
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
      type: "free",
      status: "active"
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
      type: "vaccination",
      status: "active"
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCamp, setEditingCamp] = useState(null)
  const [newCamp, setNewCamp] = useState({
    title: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    address: "",
    services: "",
    capacity: "",
    type: "free"
  })

  const handleAddCamp = () => {
    const camp = {
      id: Date.now().toString(),
      title: newCamp.title,
      organizer: newCamp.organizer,
      date: newCamp.date,
      time: newCamp.time,
      location: newCamp.location,
      address: newCamp.address,
      services: newCamp.services.split(",").map(s => s.trim()),
      capacity: parseInt(newCamp.capacity),
      registered: 0,
      type: newCamp.type,
      status: "active"
    }

    setCamps([...camps, camp])
    setNewCamp({
      title: "",
      organizer: "",
      date: "",
      time: "",
      location: "",
      address: "",
      services: "",
      capacity: "",
      type: "free"
    })
    setShowAddForm(false)
  }

  const handleDeleteCamp = id => {
    setCamps(camps.filter(camp => camp.id !== id))
  }

  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hospital Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage medical camps, view bookings, and track registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Camps
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camps.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Registrations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camps.reduce((sum, camp) => sum + camp.registered, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Camps
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camps.filter(camp => camp.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">%</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Occupancy
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (camps.reduce(
                        (sum, camp) => sum + camp.registered / camp.capacity,
                        0
                      ) /
                        camps.length) *
                        100
                    )}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Camp Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Medical Camp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Camp Title</Label>
                  <Input
                    id="title"
                    value={newCamp.title}
                    onChange={e =>
                      setNewCamp({ ...newCamp, title: e.target.value })
                    }
                    placeholder="Enter camp title"
                  />
                </div>
                <div>
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    value={newCamp.organizer}
                    onChange={e =>
                      setNewCamp({ ...newCamp, organizer: e.target.value })
                    }
                    placeholder="Enter organizer name"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newCamp.date}
                    onChange={e =>
                      setNewCamp({ ...newCamp, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={newCamp.time}
                    onChange={e =>
                      setNewCamp({ ...newCamp, time: e.target.value })
                    }
                    placeholder="e.g., 9:00 AM - 4:00 PM"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newCamp.location}
                    onChange={e =>
                      setNewCamp({ ...newCamp, location: e.target.value })
                    }
                    placeholder="Enter location name"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newCamp.capacity}
                    onChange={e =>
                      setNewCamp({ ...newCamp, capacity: e.target.value })
                    }
                    placeholder="Enter maximum capacity"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={newCamp.address}
                  onChange={e =>
                    setNewCamp({ ...newCamp, address: e.target.value })
                  }
                  placeholder="Enter complete address"
                />
              </div>
              <div>
                <Label htmlFor="services">Services (comma-separated)</Label>
                <Textarea
                  id="services"
                  value={newCamp.services}
                  onChange={e =>
                    setNewCamp({ ...newCamp, services: e.target.value })
                  }
                  placeholder="e.g., General Checkup, Blood Pressure, Diabetes Screening"
                />
              </div>
              <div>
                <Label htmlFor="type">Camp Type</Label>
                <Select
                  value={newCamp.type}
                  onValueChange={value =>
                    setNewCamp({ ...newCamp, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free Checkup</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCamp}>Add Camp</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Camp Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Medical Camps Management</CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Camp
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Camp Details</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Registrations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {camps.map(camp => (
                  <TableRow key={camp.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{camp.title}</p>
                        <p className="text-sm text-gray-600">
                          {camp.organizer}
                        </p>
                        <Badge className="mt-1" variant="secondary">
                          {camp.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {new Date(camp.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">{camp.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{camp.location}</p>
                        <p className="text-sm text-gray-600">{camp.address}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {camp.registered}/{camp.capacity}
                        </p>
                        <p className="text-sm text-gray-600">
                          {Math.round((camp.registered / camp.capacity) * 100)}%
                          full
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(camp.status)}>
                        {camp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCamp(camp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard
