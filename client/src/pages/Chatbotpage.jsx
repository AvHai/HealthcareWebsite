import React, { useEffect, useRef, useState } from 'react'
import Chatbotmain from "../components/Chatbotmain.jsx";
import Navigation from '../components/Navigation.jsx'
import Footer from '../components/Footer.jsx'
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';
import { is, se } from 'date-fns/locale.js';

const Chatbotpage = () => {

const navigate = useNavigate();
cosnt [listen, setListen] = useState(false);
const isSpeaking = useRef(false);
const recognitionRef = useRef(null);

 const startRecognition = () => {
  try{
    recognitionRef.current?.start();
    setListen(true);
  }catch (error) {
    if(!error.message.includes('start')){
      console.error('Error starting speech recognition:', error);
  }
  }
}
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    isSpeaking.current = true;
    utterance.onend = () => {
      isSpeaking.current = false
      startRecognition();
    }
    window.speechSynthesis.speak(utterance);
  }

  
    useEffect(() => {
      const speechrecognition = window.speechRecognition || window.webkitSpeechRecognition;

      const recognition = new speechrecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognitionRef.current = recognition;
      const isRecognitioning ={current: false};

      const safeRecognitionStart = () => {
        if (!isSpeaking.current && !isRecognitioning.current) {
          try {
            recognition.start();
            console.log('Speech recognition started');
          } catch (error) {
            console.error('Error starting speech recognition:', error);
            
          }
        }
      };
      recognition.onstart = () => {
        console.log('Speech recognition started');
        isRecognitioning.current = true;
        setListen(true);
      };
      recognition.onend = () => {
        console.log('Speech recognition ended');
        isRecognitioning.current = false;
        setListen(false);
        if(!isSpeaking.current) {
          setTimeout(()=>{
            safeRecognitionStart();
        },1000);
        }
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isRecognitioning.current = false;
        setListen(false);
        if(event.error !== "aborted" && !isSpeaking.current) {
          setTimeout(() => {
            safeRecognitionStart();
          }, 1000);
        }
      }

      recognition.onresult = async (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log('Transcript:', transcript);
        // You can handle the transcript here, e.g., send it to your chatbot
        if (transcript.toLowerCase().includes('medmate')) {
          recognition.stop();
          isRecognitioning.current = false;
          setListen(false);
          const data = await getAiResponse(transcript);
          console.log('AI Response:', data);
          speak(data.response);
        }
      }

      const fallback = setInterval(() => {
        if(!isRecognitioning.current && !isSpeaking.current) {
          safeRecognitionStart();
        }
    }, [10000]); 
    safeRecognitionStart()

      return () => {
        recognition.stop()
        setListen(false)
        isRecognitioning.current = false;
        clearInterval(fallback)
      }


    return (
      <div>
        <Navigation />
        <Chatbotmain />
        <Footer />
      </div>
    )
  }

  export default Chatbotpage