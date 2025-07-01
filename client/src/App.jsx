import React from "react"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import AdminDashboard from "./pages/AdminDashboard"
import BookCamp from "./pages/BookCamp"
import NotFound from "./pages/NotFound"
import CommunityPage from "./pages/CommunityPage"
import MedicalCamp from "./pages/MedicalCamp"
import LoginPage from "./components/LoginPage"
import ChatbotPage from "./pages/Chatbotpage"
import SignUpPage from "./components/SignUp"
import PrivateRoute from "./components/PrivateRoute"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignUpPage />} />
          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute> 
            }
          />
          <Route
            path="/book-camp"
            element={
              <PrivateRoute>
                <MedicalCamp />
              </PrivateRoute>
            }
          />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <CommunityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatbotPage />
              </PrivateRoute>
            }
          />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App