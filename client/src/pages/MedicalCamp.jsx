import React from 'react'
import Navigation from '@/components/Navigation'
import MedicalCampsDashboard from '@/components/CampsElement'
import Footer from '@/components/Footer'

const MedicalCamp = () => {
  return (
    <div>
    <Navigation />
    <main>
    <MedicalCampsDashboard />
    </main>
    <Footer/>
    </div>
  )
}

export default MedicalCamp