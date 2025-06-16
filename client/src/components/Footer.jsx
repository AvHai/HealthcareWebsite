import {
  HeartHandshake,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HeartHandshake className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">CareLink</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bridging the healthcare gap in underserved communities through
              technology, connecting people with medical care when they need it
              most.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#camps"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Medical Camps
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Community Hub
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-300">AI Medical Assistant</span>
              </li>
              <li>
                <span className="text-gray-300">Find Hospitals</span>
              </li>
              <li>
                <span className="text-gray-300">Medical Camp Locator</span>
              </li>
              <li>
                <span className="text-gray-300">Health Community</span>
              </li>
              <li>
                <span className="text-gray-300">Emergency Support</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 1800-CARE-LINK</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@carelink.health</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  Healthcare Innovation Hub
                  <br />
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 CareLink. All rights reserved. Built with ❤️ for healthier
            communities.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#accessibility"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
