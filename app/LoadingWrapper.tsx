'use client';
// LoadingWrapper.tsx
import React, { useState, useEffect } from 'react';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Change this to the desired loading time

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  return children;
}