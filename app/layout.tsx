import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

const defaultUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const defaultTitle = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'BaseDrop NFT';
const defaultDescription = "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse";
const defaultImage = process.env.NEXT_PUBLIC_APP_HERO_IMAGE || '/basedrop-player.png';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  metadataBase: new URL(defaultUrl),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultImage],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": defaultImage,
    "fc:frame:button:1": "Mint NFT",
    "fc:frame:post_url": `${defaultUrl}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
