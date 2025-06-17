import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  HeartHandshake,
  MapPin,
  Users,
  MessageCircle
} from "lucide-react"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/", icon: HeartHandshake },
    { name: "Medical Camps", href: "book-camp", icon: MapPin },
    { name: "Community", href: "community", icon: Users },
    { name: "AI Assistant", href: "chat", icon: MessageCircle }
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">CareLink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">
              Find Help Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="px-3 pt-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Find Help Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
