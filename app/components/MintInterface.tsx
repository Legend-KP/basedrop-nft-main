'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { WalletAdvancedDefault } from '@coinbase/onchainkit/wallet';
import Image from 'next/image';

const CONTRACT_ADDRESS = "0xb96e24FE96AfF9088749d9bB2F6195ba886e7FD8" as const;
const CONTRACT_ABI = [{
  inputs: [],
  name: 'mint',
  outputs: [],
  stateMutability: 'payable',
  type: 'function',
}] as const;

const MintInterface = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isConnected } = useAccount();
  const { writeContract, isPending: isMinting } = useWriteContract();

  const handleMint = async () => {
    try {
      setError(null);
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'mint',
        value: parseEther('0.01'),
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint NFT");
      console.error("Mint error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 p-4">
      <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
        <div className="relative w-96 h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/basedrop-player.png"
            alt="BaseDrop NFT"
            width={384}
            height={384}
            priority
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="text-xl text-center font-medium text-white max-w-lg">
          If you loved BaseDrop, mint the exclusive BaseDrop NFT and unlock perks in future games by Trenchverse.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-500/20 text-green-200 rounded-lg text-sm">
            NFT minted successfully!
          </div>
        )}

        <div className="w-full max-w-md">
          {isConnected ? (
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={`w-full px-8 py-4 rounded-lg font-semibold text-lg text-center transition-all duration-200 ${
                isMinting
                  ? 'bg-gray-400/50 cursor-not-allowed'
                  : 'bg-white hover:bg-orange-50 text-orange-600'
              }`}
            >
              {isMinting ? 'Processing...' : 'Mint Your BaseDrop NFT!'}
            </button>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full bg-white hover:bg-orange-50 rounded-lg transition-all duration-200">
                <WalletAdvancedDefault />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { MintInterface };
