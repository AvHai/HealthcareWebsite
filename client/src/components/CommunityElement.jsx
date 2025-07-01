import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Play } from "lucide-react";
import { useSelector } from "react-redux";

const CommunityHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.user); // Redux state
  const isDoctor = user?.role === "hospital";
  
  
  const categories = [
    "all",
    "First Aid",
    "Diabetes",
    "Surgery",
    "Maternal Health",
    "Cardiology",
    "Mental Health"
  ];

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/communityinfo");
      const data = await res.json();
      if (Array.isArray(data?.data)) {
        setPosts(data.data.reverse());
      } else {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts(); // Load posts on mount
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const post = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      videoLink: form.get("videoLink"),
      createdBy: user?.id || user?._id
    };

    const res = await fetch("http://localhost:4000/api/communityinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });

    if (res.ok) {
      setShowForm(false);
      fetchPosts(); // Refresh posts after submission
    } else {
      alert("Failed to add post. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await fetch(`http://localhost:4000/api/communityinfo/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete post.");
      }
    }
  };

  function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
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
          {categories.map((category) => (
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
          {filteredPosts.map((post, index) => {
            const videoId = getYouTubeId(post.videoLink);
            const createdById = post.createdBy?._id || post.createdBy?.id;

            return (
              <Card key={index} className="shadow border-0 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                    {videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Play className="w-10 h-10 text-blue-600" />
                      </div>
                    )}
                    <a
                      href={post.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition"
                      style={{ zIndex: 2 }}
                    >
                      <Play className="w-14 h-14 text-white" />
                    </a>
                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white z-10">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-1 pt-4 px-4">
                  <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                </CardHeader>

                <CardContent className="px-4 pb-4 pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {post.createdBy?.name
                          ? post.createdBy.name.split(" ").map((n) => n[0]).join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1 text-sm">
                        <span>{post.createdBy?.name || "Unknown"}</span>
                      </div>
                      <p className="text-xs text-gray-500">{post.createdBy?.email || ""}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      asChild
                    >
                      <a href={post.videoLink} target="_blank" rel="noopener noreferrer">
                        Watch Video
                      </a>
                    </Button>
                    {user?.id === createdById || user?._id === createdById ? (
                      <Button
                      className={"bg-red-600 hover:bg-red-700 text-white"}
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
              <input name="videoLink" placeholder="YouTube Video URL" required className="w-full border px-3 py-2 rounded" />
              <select name="category" required className="w-full border px-3 py-2 rounded">
                {categories.filter((c) => c !== "all").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
  );
};

export default CommunityHub;
