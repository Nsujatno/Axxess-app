import React, { useState } from 'react';
import { useRouter } from 'expo-router';


const HomePage = () => {
  const router = useRouter();
  // Track hover state for button interactions
  const [isHovered, setIsHovered] = useState(false);


  const goToSurvey = () => {
    router.push('/survey');
  };


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, white 0%, rgba(213, 0, 42, 0.1) 100%)',
      padding: '20px',
      fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '24px',
          fontWeight: 'normal',
          letterSpacing: '2px',
          background: 'linear-gradient(135deg, #d5002a 0%, #d3058b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          Healthcare Assistant
        </h1>
       
        <p style={{
          fontSize: '20px',
          marginBottom: '40px',
          lineHeight: '1.6',
          letterSpacing: '0.5px',
          color: '#4A4A4A'
        }}>
          Welcome to our healthcare portal. Take our health assessment survey to help us understand your needs.
        </p>
       
        {/* Enhanced button with hover effects and shadow */}
        <button
          onClick={goToSurvey}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '16px 32px',
            fontSize: '20px',
            background: 'linear-gradient(135deg, #d5002a 0%, #d3058b 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '32px',
            // Dynamic shadow that changes on hover
            boxShadow: isHovered
              ? '0 8px 20px rgba(213, 0, 42, 0.3)'
              : '0 4px 10px rgba(213, 0, 42, 0.2)',
            // Smooth transitions for hover effects
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.3s ease',
            // Subtle brightness adjustment on hover
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
          }}
        >
          Start Health Survey
        </button>
       
        <div style={{
          backgroundColor: 'rgba(213, 0, 42, 0.05)',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#d5002a',
            margin: 0,
            opacity: '0.8'
          }}>
            If you are experiencing a medical emergency, please call 911 immediately.
          </p>
        </div>
      </div>
    </div>
  );
};


export default HomePage;