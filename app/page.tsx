// app/page.tsx
"use client";

import * as React from 'react';
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { MintInterface } from "./components/MintInterface";

export default function Page() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  React.useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        <MintInterface />
      </main>
    </div>
  );
}
