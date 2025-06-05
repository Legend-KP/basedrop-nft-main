/** @jsxImportSource react */
"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SharePage() {
  const searchParams = useSearchParams();
  const txHash = searchParams.get("tx");

  const shareMessage = `I've minted my BaseDrop NFT! 🎮\nMint yours too and unlock perks in future games by Trenchverse\n\nView my NFT: ${window.location.origin}/share?tx=${txHash}`;

  const handleShare = async () => {
    try {
      await navigator.share({
        text: shareMessage,
        url: window.location.origin
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">
                Your BaseDrop NFT has been minted!
              </h2>

              <div className="mb-6">
                <Image
                  src="/basedrop-player.png"
                  alt="Your BaseDrop NFT"
                  width={300}
                  height={300}
                  className="rounded-lg mx-auto"
                />
              </div>

              <p className="text-[var(--app-foreground-muted)] mb-6">
                Share your achievement with friends and invite them to join the BaseDrop community.
              </p>

              {txHash && (
                <div className="mb-6 text-sm">
                  <p className="text-[var(--app-foreground-muted)]">Transaction Hash:</p>
                  <a
                    href={`https://basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 break-all"
                  >
                    {txHash}
                  </a>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleShare}
                  className="w-full px-6 py-3 text-lg font-medium bg-[#0052FF] hover:bg-[#0047E1] text-white rounded-lg transition-colors"
                >
                  Share Achievement
                </button>

                <Link
                  href="/"
                  className="block w-full px-6 py-3 text-lg font-medium border-2 border-[#0052FF] text-[#0052FF] hover:bg-[#0052FF] hover:text-white rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 