import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "BaseDrop NFT",
    description: "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse",
    openGraph: {
      title: "BaseDrop NFT",
      description: "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse",
      images: ["https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png"],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': 'https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png',
      'fc:frame:button:1': 'Mint NFT',
      'fc:frame:button:1:action': 'post',
      'fc:frame:post_url': 'https://basedrop-nft.vercel.app/api/frame',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
            <div className="w-full max-w-md mx-auto px-4 py-3">
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
