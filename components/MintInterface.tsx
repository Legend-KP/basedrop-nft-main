'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseEther } from 'viem';
import { WalletAdvancedDefault } from '@coinbase/onchainkit/wallet';
import Image from 'next/image';

// Contract configuration
const CONTRACT_ADDRESS = "0xb96e24FE96AfF9088749d9bB2F6195ba886e7FD8" as const;
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalMinted",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PRICE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const MintInterface = () => {
  // State management
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isConnected } = useAccount();

  // Contract reads
  const { data: price } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'PRICE',
  });

  // Contract writes
  const { 
    data: mintData,
    isPending: isMinting,
    writeContract: mint
  } = useContractWrite();

  // Reset success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Watch for successful mint
  useEffect(() => {
    if (mintData) {
      setIsSuccess(true);
    }
  }, [mintData]);

  // Handle mint action
  const handleMint = async () => {
    try {
      setError(null);
      if (!mint) throw new Error("Minting not available");
      await mint({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'mint' as const,
        args: [] as const,
        value: price || parseEther('0.01')
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint NFT");
      console.error("Mint error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <div className="relative w-64 h-64">
          <Image
            src="/basedrop-player.png"
            alt="BaseDrop NFT"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-center text-lg px-4">
          If you loved BaseDrop, mint the exclusive BaseDrop NFT and unlock perks in future games by Trenchverse.
        </p>

        <div className="w-full">
          {!isConnected ? (
            <WalletAdvancedDefault buttonClassName="w-full px-6 py-3 rounded-lg font-semibold text-center bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200" />
          ) : (
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={`
                w-full px-6 py-3 rounded-lg font-semibold text-center
                transition-all duration-200
                ${isMinting
                  ? 'bg-gray-400/50 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
                }
              `}
            >
              {isMinting ? 'Processing...' : 'Mint Your BaseDrop NFT!'}
            </button>
          )}

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
        </div>
      </div>
    </div>
  );
};

export { MintInterface }; 