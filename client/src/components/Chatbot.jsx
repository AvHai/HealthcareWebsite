import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send, Bot, User, Mic, MicOff } from "lucide-react"

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text:
        "Hello! I'm your AI Medical Assistant. I can help you with symptoms, find nearby hospitals, and provide first aid guidance. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText("")

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = userInput => {
    const input = userInput.toLowerCase()

    if (input.includes("fever") || input.includes("temperature")) {
      return "For fever management: 1) Rest and stay hydrated 2) Take paracetamol as per dosage 3) Use cold compress on forehead 4) Seek medical attention if fever exceeds 103°F or persists for more than 3 days. Would you like me to find nearby hospitals?"
    }

    if (input.includes("headache")) {
      return "For headache relief: 1) Rest in a quiet, dark room 2) Apply cold or warm compress 3) Stay hydrated 4) Gently massage temples 5) Consider paracetamol if needed. If severe or persistent, please consult a doctor. Need help finding medical facilities nearby?"
    }

    if (input.includes("hospital") || input.includes("doctor")) {
      return "I can help you find nearby hospitals! Please share your location or PIN code, and I'll show you: • Hospitals with available beds • Emergency services • Specialist departments • Insurance acceptance. What type of medical facility do you need?"
    }

    return "I understand you're looking for medical assistance. Could you please provide more details about your symptoms or medical concern? I can help with first aid guidance, finding healthcare facilities, or connecting you with appropriate medical resources."
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                AI Medical Assistant
              </h3>
              <p className="text-sm text-green-600">Online • Ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && (
                    <Bot className="w-4 h-4 mt-1 text-blue-600" />
                  )}
                  {message.sender === "user" && (
                    <User className="w-4 h-4 mt-1 text-white" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Describe your symptoms or ask for help..."
                onKeyPress={e => e.key === "Enter" && handleSendMessage()}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={toggleVoiceInput}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-500" />
                ) : (
                  <Mic className="w-4 h-4 text-gray-500" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!inputText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🌐 Available in Hindi, English, Tamil, Bengali & more
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ChatBot
