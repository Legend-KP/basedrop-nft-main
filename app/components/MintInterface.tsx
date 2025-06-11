'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseEther, formatEther } from 'viem';

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
    watch: true,
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
  const { writeAsync: mint, isLoading: isMinting } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mint',
    args: [],
    value: price || parseEther('0.01'),
  });

  // Reset success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Handle mint action
  const handleMint = async () => {
    try {
      setError(null);
      if (!mint) throw new Error("Minting not available");
      const tx = await mint();
      if (tx) {
        setIsSuccess(true);
        refetchTotal();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint NFT");
      console.error("Mint error:", err);
    }
  };

  // Calculate if minting is sold out
  const isSoldOut = maxSupply && totalMinted && totalMinted >= maxSupply;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">BaseDrop NFT</h2>
      
      <div className="mb-6 text-center">
        <p className="text-lg mb-2 font-medium">
          Minted: {totalMinted?.toString() || '0'} / {maxSupply?.toString() || '0'}
        </p>
        <p className="text-md text-gray-600">
          Price: {price ? formatEther(price) : '0.01'} ETH
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

      <button
        onClick={handleMint}
        disabled={!isConnected || isMinting || isSoldOut}
        className={`
          px-6 py-3 rounded-lg text-white font-semibold
          transition-all duration-200
          ${!isConnected || isMinting || isSoldOut
            ? 'bg-gray-400 cursor-not-allowed opacity-60'
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
          }
        `}
      >
        {!isConnected ? 'Connect Wallet' :
         isMinting ? 'Processing...' :
         isSoldOut ? 'Sold Out' :
         'Mint NFT'}
      </button>
    </div>
  );
};

export { MintInterface }; 