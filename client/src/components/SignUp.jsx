import React, { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeartHandshake, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {useToast,toast} from "@/hooks/use-toast"


// future reference redux : { onPageChange, onLogin }
const SignUpPage = () => {
  const [userType, setUserType] = useState("patient")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient" // initialize with default userType
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Update userType and formData.role together
  const handleUserTypeChange = (type) => {
    setUserType(type)
    setFormData((prev) => ({
      ...prev,
      role: type
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Success",
        description: `Account created successfully! Welcome to MedMate, ${formData.name}`
      })
      navigate("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
           <Link to={"/"}>
           <HeartHandshake className="w-8 h-8 text-white" />
           </Link> 
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Create Your MedMate Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join thousands of users improving healthcare access
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Toggle */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Register as:
              </Label>
              <div className="flex rounded-xl bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => handleUserTypeChange("patient")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === "patient"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange("hospital")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === "hospital"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  Hospital
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                {userType === "patient" ? "Full Name" : "Hospital Name"}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder={
                  userType === "patient"
                    ? "Enter your full name"
                    : "Enter hospital name"
                }
              />
            </div>

            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* User Type Display */}
            <div className="text-sm text-gray-500 mt-1">
              You are registering as{" "}
              <span className="font-semibold text-blue-600">
                {userType === "patient" ? "Patient" : "Hospital"}
              </span>
            </div>
            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                  }
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                userType === "patient"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              }`}
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
