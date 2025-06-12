'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { WalletAdvancedDefault } from '@coinbase/onchainkit/wallet';
import Image from 'next/image';

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
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PRICE",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const MintInterface = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isConnected } = useAccount();

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

  const { writeContractAsync, isPending: isMinting } = useWriteContract();

  useEffect(() => {
    const interval = setInterval(() => {
      refetchTotal();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchTotal]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = async () => {
    try {
      setError(null);
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        value: price ?? parseEther('0.01'),
      });
      console.log('Mint TX:', tx);
      setIsSuccess(true);
      refetchTotal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint NFT");
      console.error("Mint error:", err);
    }
  };

  const isSoldOut = Boolean(maxSupply && totalMinted && totalMinted >= maxSupply);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] bg-gradient-to-br from-purple-900 to-blue-900 text-white p-6">
      <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
        <div className="relative w-96 h-96">
          <Image
            src="/basedrop-player.png"
            alt="BaseDrop NFT"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <p className="text-xl text-center font-medium max-w-lg">
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

        {isConnected ? (
          <button
            onClick={handleMint}
            disabled={isMinting || isSoldOut}
            className={`w-full max-w-md px-8 py-4 rounded-lg font-semibold text-lg text-center transition-all duration-200 ${
              isMinting || isSoldOut
                ? 'bg-gray-400/50 cursor-not-allowed'
                : 'bg-white text-blue-900 hover:bg-blue-50'
            }`}
          >
            {isMinting ? 'Processing...' : isSoldOut ? 'Sold Out' : 'Mint Your BaseDrop NFT!'}
          </button>
        ) : (
          <WalletAdvancedDefault />
        )}
      </div>
    </div>
  );
};

export { MintInterface };
