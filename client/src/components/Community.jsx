import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Play,
  Clock,
  CheckCircle
} from "lucide-react"

const CommunityHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const communityPosts = [
    {
      id: "1",
      title: "Essential First Aid: What Every Family Should Know",
      description:
        "Learn basic first aid techniques that can save lives. From treating cuts and burns to recognizing heart attack symptoms.",
      author: {
        name: "Dr. Priya Sharma",
        title: "Emergency Medicine Specialist",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "First Aid",
      duration: "12 min",
      views: 15420,
      likes: 892,
      comments: 156,
      postedAt: "2 days ago",
      thumbnail: "/placeholder.svg",
      type: "video"
    },
    {
      id: "2",
      title: "Diabetes Management: Diet and Lifestyle Tips",
      description:
        "Comprehensive guide to managing diabetes through proper diet, exercise, and medication adherence for better health outcomes.",
      author: {
        name: "Dr. Rajesh Kumar",
        title: "Endocrinologist",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Diabetes",
      duration: "18 min",
      views: 8765,
      likes: 534,
      comments: 89,
      postedAt: "1 week ago",
      thumbnail: "/placeholder.svg",
      type: "video"
    },
    {
      id: "3",
      title: "Post-Surgery Care: Recovery Best Practices",
      description:
        "Expert advice on post-operative care, wound management, medication schedules, and when to contact your doctor.",
      author: {
        name: "Dr. Anjali Mehta",
        title: "General Surgeon",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Surgery",
      duration: "8 min read",
      views: 12300,
      likes: 687,
      comments: 78,
      postedAt: "3 days ago",
      thumbnail: "/placeholder.svg",
      type: "article"
    },
    {
      id: "4",
      title: "Maternal Health: Pregnancy Care Essentials",
      description:
        "Complete pregnancy care guide covering nutrition, exercise, regular checkups, and warning signs to watch for.",
      author: {
        name: "Dr. Sunita Rao",
        title: "Obstetrician & Gynecologist",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Maternal Health",
      duration: "15 min",
      views: 9876,
      likes: 723,
      comments: 134,
      postedAt: "5 days ago",
      thumbnail: "/placeholder.svg",
      type: "video"
    }
  ]

  const categories = [
    "all",
    "First Aid",
    "Diabetes",
    "Surgery",
    "Maternal Health",
    "Cardiology",
    "Mental Health"
  ]

  const filteredPosts =
    selectedCategory === "all"
      ? communityPosts
      : communityPosts.filter(post => post.category === selectedCategory)

  return (
    <section id="community" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Healthcare Community Hub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from verified healthcare professionals. Watch expert videos,
            read articles, and get reliable medical information from trusted
            doctors.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category === "all" ? "All Topics" : category}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <div className="relative">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-white/90 hover:bg-white text-blue-600 rounded-full w-16 h-16"
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                    {post.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                    {post.type === "video" ? (
                      <Clock className="w-3 h-3 mr-1" />
                    ) : (
                      <BookOpen className="w-3 h-3 mr-1" />
                    )}
                    {post.duration}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {post.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Author Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                      {post.author.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {post.author.name}
                      </p>
                      {post.author.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{post.author.title}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>{post.postedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-green-500 hover:bg-green-50"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
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
    </section>
  )
}

export default CommunityHub
