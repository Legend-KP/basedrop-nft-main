"use client";

import { type ReactNode, useState, useEffect } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'BaseDrop NFT',
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || "test_key"}
          projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "test_id"}
          chain={base}
        >
          {mounted ? children : null}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
