import React, { useEffect } from 'react';
import { driver } from 'driver.js';
import "driver.js/dist/driver.css";

const OnboardingTour: React.FC = () => {
  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem('hasSeenTourV2');
    
    if (!hasSeenTour) {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        steps: [
          { 
            element: '#generator-tabs', 
            popover: { 
              title: 'Choose Your Mode', 
              description: 'Start by typing your name, drawing manually, scanning a paper signature, or signing a PDF document.',
              side: "bottom", 
              align: 'start' 
            } 
          },
          { 
            element: '#input-area', 
            popover: { 
              title: 'Enter Your Name', 
              description: 'Type your name here to see real-time previews in dozens of professional fonts.',
              side: "bottom", 
              align: 'center' 
            } 
          },
          { 
            element: '.style-controls-panel', 
            popover: { 
              title: 'Customize Styles', 
              description: 'Adjust slant, weight, and spacing. Toggle "Ink Texture" for realistic grunge effects.',
              side: "left", 
              align: 'start' 
            } 
          },
          { 
            element: '#history-section', 
            popover: { 
              title: 'History & Export', 
              description: 'Your recent signatures appear here. Download them as high-quality PNGs or SVGs.',
              side: "top", 
              align: 'start' 
            } 
          }
        ],
        onDestroyStarted: () => {
            // Set flag in local storage
            localStorage.setItem('hasSeenTourV2', 'true');
            driverObj.destroy();
        }
      });

      // Small delay to ensure DOM is ready
      setTimeout(() => {
          driverObj.drive();
      }, 1000);
    }
  }, []);

  return null; // Logic only component
};

export default OnboardingTour;