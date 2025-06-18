import React from "react"
//import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import AdminDashboard from "./pages/AdminDashboard"
import BookCamp from "./pages/bookCamp"
import NotFound from "./pages/NotFound"
import CommunityPage from "./pages/CommunityPage"
import MedicalCamp from "./pages/MedicalCamp"
import LoginPage from "./components/LoginPage"
import ChatbotPage from "./pages/Chatbotpage"
import SignUpPage from "./components/SignUp"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/book-camp" element={<MedicalCamp/>} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/signin"element={<SignUpPage/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App