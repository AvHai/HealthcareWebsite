import { useState } from "react"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import ChatBot from "@/components/ChatBot"
import MedicalCampsDashboard from "@/components/CampsElement"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <Hero />
      
      {/* Main Content Sections */}
      {/* <main className="space-y-16 py-1">
         <MedicalCampsDashboard />
      </main> */}

        <div className="my-16 py-10 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">AI Assistant</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-100">Medical Camps</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Users Helped</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-100">Doctors</div>
              </div>
            </div>
          </div>
      </div>


      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open AI Medical Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Emergency Call"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>


      {/* AI Chatbot Modal */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default Index
