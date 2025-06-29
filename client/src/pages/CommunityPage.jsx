import CommunityHub from '@/components/CommunityElement'
import Navigation from '@/components/Navigation'
import React from 'react'

const CommunityPage = () => {
  return (
    <div min-h-screen bg-gradient-to-b from-blue-50 to-white>

    <Navigation /> 

    <main className="space-y-16 py-16">
        <CommunityHub />
      </main>

    </div>
  )
}

export default CommunityPage