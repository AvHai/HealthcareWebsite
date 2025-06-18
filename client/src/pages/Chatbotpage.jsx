import React from 'react'
import  Chatbotmain   from "../components/Chatbotmain.jsx";
import Navigation from '../components/Navigation.jsx'
import Footer from '../components/Footer.jsx'
const Chatbotpage = () => {
  return (
    <div>
        <Navigation />
        <Chatbotmain/>
        <Footer />
    </div>
  )
}

export default Chatbotpage