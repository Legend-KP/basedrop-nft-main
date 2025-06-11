'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseEther, formatEther } from 'viem';
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
  const { data: totalMinted, refetch: refetchTotal } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalMinted',
  });

  const { data: maxSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'MAX_SUPPLY',
  });

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

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchTotal();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetchTotal]);

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
      refetchTotal();
    }
  }, [mintData, refetchTotal]);

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

  // Calculate if minting is sold out
  const isSoldOut = Boolean(maxSupply && totalMinted && totalMinted >= maxSupply);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="relative w-full aspect-square">
          <Image
            src="/basedrop-player.png"
            alt="BaseDrop NFT"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-6 text-[#1e293b]">
            If you loved BaseDrop, mint the exclusive BaseDrop NFT and unlock perks in future games by Trenchverse.
          </h1>

          <div className="space-y-2 mb-6">
            <p className="text-xl font-medium text-gray-700">
              Total Minted: {totalMinted?.toString() || '0'} / {maxSupply?.toString() || '10000'}
            </p>
            <p className="text-lg text-gray-600">
              Price: {price ? formatEther(price) : '0.001'} ETH on Base
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              NFT minted successfully!
            </div>
          )}

          <p className="text-red-500 mb-4">
            Please make sure you are connected to Base network
          </p>

          <div className="flex justify-center">
            <WalletAdvancedDefault />
          </div>

          {isConnected && (
            <button
              onClick={handleMint}
              disabled={isMinting || isSoldOut}
              className={`
                w-full mt-4 px-6 py-4 rounded-lg text-white font-semibold text-lg
                transition-all duration-200
                ${isMinting || isSoldOut
                  ? 'bg-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-[#f4442e] hover:bg-[#e33d29]'
                }
              `}
            >
              {isMinting ? 'Processing...' :
               isSoldOut ? 'Sold Out' :
               'Approve USDC'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { MintInterface };
