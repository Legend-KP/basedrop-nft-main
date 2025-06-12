'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { WalletAdvancedDefault } from '@coinbase/onchainkit/wallet';

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
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">BaseDrop NFT</h2>
          <WalletAdvancedDefault />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span>Total Minted</span>
            <span className="font-mono">{totalMinted?.toString() || '0'} / {maxSupply?.toString() || '0'}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span>Price</span>
            <span className="font-mono">{price ? formatEther(price) : '0.01'} ETH</span>
          </div>
        </div>

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

        {isConnected && (
          <button
            onClick={handleMint}
            disabled={isMinting || isSoldOut}
            className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 ${
              isMinting || isSoldOut
                ? 'bg-gray-400/50 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            {isMinting ? 'Processing...' : isSoldOut ? 'Sold Out' : 'Mint NFT'}
          </button>
        )}
      </div>
    </div>
  );
};

export { MintInterface };
