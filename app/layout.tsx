import "./globals.css";
import "./theme.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

const defaultUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const defaultTitle = 'BaseDrop NFT';
const defaultDescription = "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse";
const defaultImage = '/basedrop-player.png';

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
    "fc:frame:button:1": "Connect Wallet",
    "fc:frame:post_url": `${defaultUrl}/api/frame`,
    "fc:frame:image:aspect_ratio": "1:1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-src 'self' https:;" />
      </head>
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
