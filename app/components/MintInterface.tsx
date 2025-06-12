'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
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

  const { data: price } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'PRICE',
  });

  const { writeContractAsync, isPending: isMinting } = useWriteContract();

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint NFT");
      console.error("Mint error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white p-6">
      <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
        <div className="relative w-96 h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/basedrop-player.png"
            alt="BaseDrop NFT"
            layout="fill"
            objectFit="contain"
            priority
            className="transform hover:scale-105 transition-transform duration-300"
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

        <div className="w-full max-w-md">
          {isConnected ? (
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={`w-full px-8 py-4 rounded-lg font-semibold text-lg text-center transition-all duration-200 ${
                isMinting
                  ? 'bg-gray-400/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-emerald-900'
              }`}
            >
              {isMinting ? 'Processing...' : 'Mint Your BaseDrop NFT!'}
            </button>
          ) : (
            <div className="w-full flex justify-center">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 p-[2px] rounded-lg w-full">
                <div className="flex justify-center">
                  <WalletAdvancedDefault />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { MintInterface };
