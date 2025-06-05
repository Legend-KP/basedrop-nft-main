"use client";

import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { sdk } from '@farcaster/frame-sdk';

export const ShareCard: React.FC = () => {
  const searchParams = useSearchParams();
  const txHash = searchParams.get("tx");

  const shareMessage = `I've minted my BaseDrop NFT! 🎮\nMint yours too and unlock perks in future games by Trenchverse\n\nView my NFT: ${window.location.origin}/share?tx=${txHash}`;

  const handleShare = async () => {
    try {
      // Try to compose a Farcaster cast first
      try {
        await sdk.actions.composeCast({
          text: shareMessage,
          embeds: [`${window.location.origin}`]
        });
      } catch {
        console.log("Farcaster cast not available, falling back to native share");
        // Fall back to native share if Farcaster is not available
        await navigator.share({
          text: shareMessage,
          url: window.location.origin
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Card title="Congratulations! 🎉">
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
        </div>
      </div>
    </Card>
  );
}; 