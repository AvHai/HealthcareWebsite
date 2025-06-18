import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Send,
  Bot,
  User,
  Heart,
  Mic,
  AlertTriangle,
  Phone,
  MapPin
} from "lucide-react"

const Chatbotmain = ({ onPageChange }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text:
        "Hello! I'm MedMate AI, your healthcare assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const messagesEndRef = useRef(null)

  const categories = [
    {
      id: "first-aid",
      title: "First Aid",
      icon: Heart,
      description: "Emergency first aid guidance",
      color: "text-red-600 bg-red-50 border-red-200"
    },
    {
      id: "emergency",
      title: "Emergency Help",
      icon: AlertTriangle,
      description: "Immediate emergency assistance",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      id: "facilities",
      title: "Nearby Facilities",
      icon: MapPin,
      description: "Find healthcare facilities",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    }
  ]

  const quickResponses = {
    "first-aid": [
      "How to treat a cut or wound?",
      "What to do for burns?",
      "CPR instructions",
      "Choking emergency steps"
    ],
    emergency: [
      "Call emergency services",
      "Heart attack symptoms",
      "Stroke warning signs",
      "Poison control help"
    ],
    facilities: [
      "Nearest hospital",
      "Pharmacy locations",
      "Urgent care centers",
      "Specialized clinics"
    ]
  }

  const botResponses = {
    hello:
      "Hi there! I'm here to help with your health questions. What would you like to know?",
    appointment:
      "To book an appointment, I can guide you through the process. Would you like me to help you find available doctors or hospitals?",
    emergency:
      "🚨 If this is a medical emergency, please call 911 immediately. For non-emergency help, I can assist you with first aid guidance or finding nearby facilities.",
    "first aid cut":
      "For minor cuts: 1) Clean your hands 2) Stop bleeding with pressure 3) Clean the wound 4) Apply antibiotic ointment 5) Cover with bandage. Seek medical help if deep or won't stop bleeding.",
    "first aid burn":
      "For minor burns: 1) Cool with cold water for 10-20 minutes 2) Remove jewelry/tight items 3) Don't break blisters 4) Apply moisturizer 5) Cover loosely. Seek help for severe burns.",
    cpr:
      "CPR Steps: 1) Check responsiveness 2) Call 911 3) Place heel of hand on center of chest 4) Push hard and fast at least 2 inches deep 5) 30 compressions, then 2 rescue breaths 6) Repeat. Get professional training for proper technique.",
    hospital:
      "I can help you find nearby hospitals. Based on your location, here are some options: City General Hospital (2 miles), Metro Health Center (3.5 miles), Community Clinic (1.8 miles). Would you like directions or contact information?",
    pharmacy:
      "Nearby pharmacies include: CVS Pharmacy (0.5 miles), Walgreens (0.8 miles), City Pharmacy (1.2 miles). Most are open 24/7 or have extended hours.",
    symptoms:
      "I can provide general health information, but I cannot diagnose conditions. If you're experiencing concerning symptoms, please consult with a healthcare professional or visit an urgent care center."
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = userMessage => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return botResponses["hello"]
    } else if (
      lowerMessage.includes("appointment") ||
      lowerMessage.includes("book")
    ) {
      return botResponses["appointment"]
    } else if (lowerMessage.includes("emergency")) {
      return botResponses["emergency"]
    } else if (lowerMessage.includes("cut") || lowerMessage.includes("wound")) {
      return botResponses["first aid cut"]
    } else if (lowerMessage.includes("burn")) {
      return botResponses["first aid burn"]
    } else if (lowerMessage.includes("cpr")) {
      return botResponses["cpr"]
    } else if (lowerMessage.includes("hospital")) {
      return botResponses["hospital"]
    } else if (lowerMessage.includes("pharmacy")) {
      return botResponses["pharmacy"]
    } else if (
      lowerMessage.includes("symptom") ||
      lowerMessage.includes("pain") ||
      lowerMessage.includes("hurt")
    ) {
      return botResponses["symptoms"]
    } else {
      return (
        "I understand you're asking about " +
        userMessage +
        ". While I can provide general health information, for specific medical concerns, I recommend consulting with a healthcare professional. Is there something specific I can help you with like first aid, finding facilities, or general health guidance?"
      )
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickResponse = response => {
    setInputMessage(response)
  }

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Talk to MedMate AI
          </h1>
          <p className="text-gray-600">
            Get instant medical guidance and find healthcare resources
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Bot className="w-6 h-6 text-purple-600" />
                  <span>Help Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category.id ? null : category.id
                        )
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                        activeCategory === category.id
                          ? category.color
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">{category.title}</p>
                          <p className="text-xs text-gray-500">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Responses */}
                {activeCategory && (
                  <div className="mt-6 space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Quick Questions:
                    </h4>
                    {quickResponses[activeCategory]?.map((response, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickResponse(response)}
                        className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                )}

                {/* Emergency Button */}
                <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-red-600">
                      Emergency Contact
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    If this is a medical emergency, please call emergency
                    services immediately.
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                    Call 911
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-blue-100 h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Bot className="w-6 h-6 text-blue-600" />
                  <span>MedMate AI Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden flex flex-col p-0">
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] md:max-w-[70%] ${
                          message.isUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            message.isUser
                              ? "bg-blue-500 ml-2"
                              : "bg-gradient-to-br from-purple-500 to-blue-500 mr-2"
                          }`}
                        >
                          {message.isUser ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.isUser
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <div className="text-sm">{message.text}</div>
                          <div
                            className={`text-xs mt-1 ${
                              message.isUser ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] md:max-w-[70%] flex-row">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 mr-2">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 rounded-tl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      aria-label="Voice input"
                    >
                      <Mic className="h-5 w-5 text-gray-400" />
                    </Button>
                    <Input
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your health question here..."
                      className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      size="icon"
                      className="rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500">
                      MedMate AI provides general information, not medical
                      diagnosis. Always consult a healthcare professional for
                      medical advice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbotmain
