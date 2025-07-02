import React, { useEffect, useRef, useState } from 'react'
import Chatbotmain from "../components/Chatbotmain.jsx";
import Navigation from '../components/Navigation.jsx'
import Footer from '../components/Footer.jsx'
import { useNavigate } from 'react-router-dom';
// import getAiResponse from '...'; // Make sure to import this

const Chatbotpage = () => {
  const navigate = useNavigate();
  const [listen, setListen] = useState(false);
  const isSpeaking = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognitioning = useRef(false);
  const isMounted = useRef(true); // Track mount status
  const noSpeechCount = useRef(0);
  const MAX_NO_SPEECH = 3;

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListen(true);
    } catch (error) {
      if (!error.message.includes('start')) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const speak = (text) => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    isSpeaking.current = true;
    utterance.onend = () => {
      isSpeaking.current = false;
      if (isMounted.current) startRecognition();
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    isMounted.current = true; // Set as mounted

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognitionRef.current = recognition;

    const safeRecognitionStart = () => {
      if (!isSpeaking.current && !isRecognitioning.current && isMounted.current) {
        try {
          recognition.start();
          console.log('Speech recognition started');
        } catch (error) {
          if (!error.message.includes('start')) {
            console.error('Error starting speech recognition:', error);
          }
        }
      }
    };

    recognition.onstart = () => {
      if (!isMounted.current) return;
      console.log('Speech recognition started');
      isRecognitioning.current = true;
      setListen(true);
    };

    recognition.onend = () => {
      if (!isMounted.current) return;
      console.log('Speech recognition ended');
      isRecognitioning.current = false;
      setListen(false);
      if (!isSpeaking.current) {
        setTimeout(() => {
          if (isMounted.current) safeRecognitionStart();
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      if (!isMounted.current) return;
      console.error('Speech recognition error:', event.error);
      isRecognitioning.current = false;
      setListen(false);

      if (event.error === "no-speech") {
        noSpeechCount.current += 1;
        if (noSpeechCount.current >= MAX_NO_SPEECH) {
          alert("No speech detected. Please check your microphone and try again.");
          return; // Stop trying
        }
      } else {
        noSpeechCount.current = 0; // Reset on other errors
      }

      if (event.error !== "aborted" && !isSpeaking.current) {
        setTimeout(() => {
          if (isMounted.current) safeRecognitionStart();
        }, 1000);
      }
    };

    recognition.onresult = async (event) => {
      if (!isMounted.current) return;
      noSpeechCount.current = 0; // Reset on successful speech
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log('Transcript:', transcript);
      if (transcript.toLowerCase().includes('hello')) {
        recognition.stop();
        isRecognitioning.current = false;
        setListen(false);
        const data = await getAiResponse(transcript);
        console.log('AI Response:', data);
        speak(data.response);
      }
    };

    const fallback = setInterval(() => {
      if (!isRecognitioning.current && !isSpeaking.current && isMounted.current) {
        safeRecognitionStart();
      }
    }, 10000);

    safeRecognitionStart();

    return () => {
      isMounted.current = false; // Mark as unmounted
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
      recognition.stop();
      setListen(false);
      isRecognitioning.current = false;
      clearInterval(fallback);
    };
  }, []);

  return (
    <div>
      <Navigation />
      <Chatbotmain />
      <Footer />
    </div>
  );
};

export default Chatbotpage;