import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Heart,
  Share2,
  BookOpen,
  Play,
  Clock,
  CheckCircle
} from "lucide-react"

const CommunityHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [posts, setPosts] = useState([])
  const isDoctor = true

  const categories = [
    "all",
    "First Aid",
    "Diabetes",
    "Surgery",
    "Maternal Health",
    "Cardiology",
    "Mental Health"
  ]

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.reverse())
        } else {
          // Show demo articles if no posts from backend
          setPosts([
            {
              title: "How to Handle a Choking Emergency",
              description: "Quick steps to help someone who is choking. A must-know for every household.",
              category: "First Aid",
              type: "video",
              mediaUrl: "https://youtu.be/Ef5wRT11dNI?si=opCf8DaCzd91d7Bu",
              thumbnail: "https://img.youtube.com/vi/Ef5wRT11dNI/0.jpg",
              duration: "5 min",
              views: 3250,
              likes: 213,
              postedAt: "1 day ago",
              author: {
                name: "Dr. Ravi Malhotra",
                title: "ER Specialist",
                avatar: "/placeholder.svg",
                verified: true
              }
            },
            {
              title: "Managing Stress for Heart Patients",
              description: "Understand how stress impacts your heart and how to reduce it effectively.",
              category: "Cardiology",
              type: "article",
              mediaUrl: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
              thumbnail: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
              duration: "6 min read",
              views: 1340,
              likes: 87,
              postedAt: "3 days ago",
              author: {
                name: "Dr. Meera Banerjee",
                title: "Cardiologist",
                avatar: "/placeholder.svg",
                verified: true
              }
            },
            {
              title: "Daily Diet Tips for Diabetes Control",
              description: "Get practical advice on what to eat and what to avoid for steady sugar levels.",
              category: "Diabetes",
              type: "article",
              mediaUrl: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
              thumbnail: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
              duration: "7 min read",
              views: 2480,
              likes: 104,
              postedAt: "2 days ago",
              author: {
                name: "Dr. Rahul Sen",
                title: "Endocrinologist",
                avatar: "/placeholder.svg",
                verified: true
              }
            },
            {
              title: "C-Section Recovery: What to Expect",
              description: "Guidance on pain management, movement, and hygiene after cesarean delivery.",
              category: "Maternal Health",
              type: "video",
              mediaUrl: "https://youtu.be/Ef5wRT11dNI?si=opCf8DaCzd91d7Bu",
              thumbnail: "https://img.youtube.com/vi/Ef5wRT11dNI/0.jpg",
              duration: "10 min",
              views: 1876,
              likes: 134,
              postedAt: "1 week ago",
              author: {
                name: "Dr. Swati Das",
                title: "OB-GYN",
                avatar: "/placeholder.svg",
                verified: true
              }
            }
          ])
        }
      })
      .catch(() => {
        // On fetch error, show demo articles
        setPosts([
          {
            title: "How to Handle a Choking Emergency",
            description: "Quick steps to help someone who is choking. A must-know for every household.",
            category: "First Aid",
            type: "video",
            mediaUrl: "https://youtu.be/Ef5wRT11dNI?si=opCf8DaCzd91d7Bu",
            thumbnail: "https://img.youtube.com/vi/Ef5wRT11dNI/0.jpg",
            duration: "5 min",
            views: 3250,
            likes: 213,
            postedAt: "1 day ago",
            author: {
              name: "Dr. Ravi Malhotra",
              title: "ER Specialist",
              avatar: "/placeholder.svg",
              verified: true
            }
          },
          {
            title: "Managing Stress for Heart Patients",
            description: "Understand how stress impacts your heart and how to reduce it effectively.",
            category: "Cardiology",
            type: "article",
            mediaUrl: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
            thumbnail: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
            duration: "6 min read",
            views: 1340,
            likes: 87,
            postedAt: "3 days ago",
            author: {
              name: "Dr. Meera Banerjee",
              title: "Cardiologist",
              avatar: "/placeholder.svg",
              verified: true
            }
          },
          {
            title: "Daily Diet Tips for Diabetes Control",
            description: "Get practical advice on what to eat and what to avoid for steady sugar levels.",
            category: "Diabetes",
            type: "article",
            mediaUrl: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
            thumbnail: "https://drvanitaarora.com/images/blog/2025/stress-and-heart-health-effective-management-techniques.JPG?tr=w-1200,h-381,fo-auto",
            duration: "7 min read",
            views: 2480,
            likes: 104,
            postedAt: "2 days ago",
            author: {
              name: "Dr. Rahul Sen",
              title: "Endocrinologist",
              avatar: "/placeholder.svg",
              verified: true
            }
          },
          {
            title: "C-Section Recovery: What to Expect",
            description: "Guidance on pain management, movement, and hygiene after cesarean delivery.",
            category: "Maternal Health",
            type: "video",
            mediaUrl: "https://youtu.be/Ef5wRT11dNI?si=opCf8DaCzd91d7Bu",
            thumbnail: "https://img.youtube.com/vi/Ef5wRT11dNI/0.jpg",
            duration: "10 min",
            views: 1876,
            likes: 134,
            postedAt: "1 week ago",
            author: {
              name: "Dr. Swati Das",
              title: "OB-GYN",
              avatar: "/placeholder.svg",
              verified: true
            }
          }
        ])
      })
  }, [])

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter(post => post.category === selectedCategory)

  const extractYouTubeID = url => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    )
    return match ? match[1] : null
  }

  const handlePostSubmit = async e => {
    e.preventDefault()
    const form = new FormData(e.target)

    const mediaUrl = form.get("mediaUrl")
    const type = form.get("type")

    const post = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      mediaUrl,
      type,
      thumbnail:
        type === "video" && extractYouTubeID(mediaUrl)
          ? `https://img.youtube.com/vi/${extractYouTubeID(mediaUrl)}/0.jpg`
          : mediaUrl,
      duration: type === "video" ? "10 min" : "5 min read",
      views: 0,
      likes: 0,
      postedAt: "Just now",
      author: {
        name: "Dr. John Doe",
        title: "General Physician",
        avatar: "/placeholder.svg",
        verified: true
      }
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer doctor-token" },
      body: JSON.stringify(post)
    })

    if (res.ok) {
      setShowForm(false)
      setPosts([post, ...posts])
    } else {
      alert("Failed to add post. Please try again.")
    }
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-gray-900">Healthcare Community Hub</h2>
            <p className="text-gray-600 text-sm mt-2">
              Verified doctors share expert advice. Videos & articles you can trust.
            </p>
          </div>
          {isDoctor && (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowForm(true)}
            >
              + Add Post
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category === "all" ? "All Topics" : category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="shadow border-0 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                    {post.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                    {post.type === "video" ? <Clock className="w-3 h-3 mr-1" /> : <BookOpen className="w-3 h-3 mr-1" />}
                    {post.duration}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-1 pt-4 px-4">
                <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
              </CardHeader>

              <CardContent className="px-4 pb-4 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      {post.author.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{post.author.name}</span>
                      {post.author.verified && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-gray-500">{post.author.title}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{post.views.toLocaleString()} views</span>
                  <span>{post.postedAt}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span>{post.likes}</span>
                    <Share2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {post.type === "video" ? "Watch Now" : "Read Article"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-700">Create New Post</h3>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <input name="title" placeholder="Title" required className="w-full border px-3 py-2 rounded" />
              <textarea name="description" placeholder="Description" required className="w-full border px-3 py-2 rounded" />
              <input name="mediaUrl" placeholder="Video/Image URL" required className="w-full border px-3 py-2 rounded" />
              <select name="category" required className="w-full border px-3 py-2 rounded">
                {categories.filter(c => c !== "all").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select name="type" required className="w-full border px-3 py-2 rounded">
                <option value="video">Video</option>
                <option value="article">Article</option>
              </select>
              <div className="flex gap-2 justify-end">
                <Button type="submit" className="bg-blue-600 text-white">Submit</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default CommunityHub
