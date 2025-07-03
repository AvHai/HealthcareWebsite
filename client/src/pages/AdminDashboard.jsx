import { useEffect, useState } from "react"
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
import { useSelector } from "react-redux"
import Loading from "@/components/Loading"
import{ DeletePopup} from "@/components/deletepopup"
const AdminDashboard = () => {
  const user = useSelector(state => state.user.user);
  console.log("main : ",user);
  
  const [camps, setCamps] = useState([])

  const [showAddForm, setShowAddForm] = useState(false)
  // const [editingCamp, setEditingCamp] = useState(null)
  const [deletePopup, setDeletePopup] = useState({ open: false, id: null, title: "" });
  const [newCamp, setNewCamp] = useState({
    title: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    address: "",
    services: "",
    capacity: "",
    type: "free",
    applyLink: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchCamps = async () => {
      if (!user || !user.id) return;
      try {
        const res = await fetch(`http://localhost:4000/api/medicalcamp?userId=${user.id}`);
        const data = await res.json();
        if (res.ok && data.data) {
          setCamps(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch camps", err);
      }
    };
    fetchCamps();
  }, [user]);

  const handleAddCamp = async () => {
    setLoading(true)
    setError("")
    if (!user || !user.id) {
      console.log("hC: ",user);
      
      setError("User not found. Please log in again.")
      setLoading(false)
      return
    }
    try {
      const campData = {
        title: newCamp.title,
        organizer: newCamp.organizer,
        date: newCamp.date,
        time: newCamp.time,
        location: newCamp.location,
        address: newCamp.address,
        services: newCamp.services.split(",").map(s => s.trim()),
        capacity: parseInt(newCamp.capacity),
        campType:
          newCamp.type === "free"
            ? "Free Checkup"
            : newCamp.type === "vaccination"
            ? "Vaccination"
            : newCamp.type === "specialist"
            ? "Specialist"
            : newCamp.type,
        applyLink: newCamp.applyLink,
        userId: user.id 
      }

      const response = await fetch("http://localhost:4000/api/medicalcamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(campData)
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.message || "Failed to add camp")
        setLoading(false)
        return
      }

      setCamps([...camps, data.data])
      setNewCamp({
        title: "",
        organizer: "",
        date: "",
        time: "",
        location: "",
        address: "",
        services: "",
        capacity: "",
        type: "free",
        applyLink: ""
      })
      setShowAddForm(false)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteCamp = (id,title) => {
    console.log("delete camp id: ",id);
    setDeletePopup({ open: true, id, title});

  }
    const confirmDelete = async () => {
    const { id, title } = deletePopup;
    try {
      const response = await fetch(
        `http://localhost:4000/api/medicalcamp/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete camp");
      setCamps(prev => prev.filter(camp => camp._id !== id));
      // Optionally show toast here
    } catch (error) {
      console.error("Error deleting camp:", error);
      // Optionally show toast here
    } finally {
      setDeletePopup({ open: false, id: null, title: "" });
    }
  };

  // const getStatusColor = status => {
  //   switch (status) {
  //     case "active":
  //       return "bg-green-100 text-green-800"
  //     case "completed":
  //       return "bg-blue-100 text-blue-800"
  //     case "cancelled":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  if (!user) {
    return <div><Loading/></div>
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
              <div>
                <Label htmlFor="applyLink">Apply Link</Label>
                <Input
                  id="applyLink"
                  value={newCamp.applyLink}
                  onChange={e =>
                    setNewCamp({ ...newCamp, applyLink: e.target.value })
                  }
                  placeholder="https://example.com/apply"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCamp} disabled={loading}>
                  {loading ? "Adding..." : "Add Camp"}
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
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
                          onClick={() => handleDeleteCamp(camp._id, camp.title)}
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
        <DeletePopup
        open={deletePopup.open}
        title="Delete Camp Details"
        message={`Are you sure you want to delete ${deletePopup.title}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeletePopup({ open: false, id: null, title: "" })}
      />
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard
