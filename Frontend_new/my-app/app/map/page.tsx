'use client';
// Import necessary libraries and components
import React from 'react';
import HomePage from '@/components/Map/Map';
import Sidebar from '@/components/Map/items/Sidebar';

// Define the page component
const Page = () => {
  // Your initial position array
  const position = [51.505, -0.09];

  // Render the page
  return (
    <>


      <div className="container relative h-[98vh] ">
        <div
          className="absolute h-screen top-0 left-0" style={{ zIndex: 10000 }}
        >
          {/* <Sidebar></Sidebar> */}
        </div>
        <HomePage></HomePage>
      </div>
    </>
  );
};

// Export the component
export default Page;
