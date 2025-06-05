"use client";

import {
  useMiniKit,
} from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { MintInterface } from "./components/MintInterface";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <main className="flex-1">
          <MintInterface />
        </main>
      </div>
    </div>
  );
}
