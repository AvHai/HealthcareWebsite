import { Button } from "@/components/ui/button"
import { ArrowRight, Users, MapPin, Stethoscope } from "lucide-react"

const Hero = () => {
  return (
    <section id="home" className="relative px-4 py-20 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight ">
                Healthcare for
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                   {""} Everyone, Everywhere 
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
                Bridging the healthcare gap in underserved communities through
                AI-powered assistance, real-time medical information, and
                community-driven support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105">
                Get Medical Help 
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300"
              >
                Find Nearby Camps
              </Button>
            </div>

            
            
          </div>


          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 relative overflow-hidden">
              {/* Floating Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-8 h-8 text-blue-700" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        AI Health Assistant
                      </h3>
                      <p className="text-sm text-gray-700">
                        Instant medical guidance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-8 h-8 text-green-700" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Find Medical Camps
                      </h3>
                      <p className="text-sm text-gray-700">
                        Real-time locations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-purple-700" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Community Support
                      </h3>
                      <p className="text-sm text-gray-700">
                        Connect with experts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-200 rounded-full opacity-50"></div>
            </div>
          </div>

          
        </div>
        
       
      </div>
      {/* Stats */}
       {/* <div className="mt-16 py-16 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Healthcare Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
          </div>
        </div>
        </div> */}
    </section>
  )
}

export default Hero
 