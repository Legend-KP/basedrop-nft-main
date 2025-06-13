"use client";

import * as React from 'react';
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { MintInterface } from "./components/MintInterface";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeFrame = async () => {
      try {
        if (!isFrameReady) {
          await setFrameReady();
        }
      } catch (error) {
        console.error('Failed to initialize MiniKit frame:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFrame();
  }, [setFrameReady, isFrameReady]);

  // Show loading state while frame is initializing
  if (isLoading || !isFrameReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <MintInterface />
      </div>
    </div>
  );
} 