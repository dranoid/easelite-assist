'use client';

import { Suspense, useEffect, useState } from 'react';

import { ConnectButton } from '../../components/Wallets';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useSearchParams } from 'next/navigation';

async function getGrantDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EASE_URL}/general/grants/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch grant details');
  }
  return res.json();
}

function ApplyForGrantContent() {
  const searchParams = useSearchParams();
  const grantId = searchParams.get('id');
  const { isConnected, address } = useAccount();
  const [grantDetails, setGrantDetails] = useState<any>(null);
  const [easeliteId, setEaseliteId] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (grantId) {
      getGrantDetails(grantId).then(data => setGrantDetails(data.data));
    }
  }, [grantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement the API call to submit the application
    console.log('Submitting application:', {
      grantId,
      easeliteId,
      reason,
      walletAddress: address
    });
    // After submission, you might want to redirect or show a success message
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2d3250] to-[#503e9d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Connect Your Wallet</h1>
          <p className="text-xl mb-8">Please connect your wallet to apply for a grant.</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d3250] to-[#503e9d] text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Apply for a Grant</h1>
        {grantDetails && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Applying for: {grantDetails.title}</h2>
            <p className="text-[#f9cb5c]">{grantDetails.description}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="mb-6">
            <label htmlFor="easeliteId" className="block text-sm font-medium mb-2">Easelite ID</label>
            <input
              type="text"
              id="easeliteId"
              value={easeliteId}
              onChange={(e) => setEaseliteId(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9cb5c]"
              placeholder="Enter your Easelite ID"
              required
            />
            <p className="mt-2 text-xs text-gray-300">Your Easelite ID helps us verify your student status.</p>
          </div>
          <div className="mb-6">
            <label htmlFor="reason" className="block text-sm font-medium mb-2">Reason for Application</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9cb5c]"
              placeholder="Why are you applying for this grant?"
              rows={4}
              required
            />
          </div>
          <div className="mb-6 text-sm text-gray-300">
            <p>No Easelite ID? <Link href="https://app.easelite.com" className="text-[#f9cb5c] hover:underline" target="_blank" rel="noopener noreferrer">Get verified as a student on app.easelite.com</Link></p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#f9cb5c] text-[#2d3250] font-semibold py-3 px-4 rounded-lg hover:bg-[#e6b84d] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f9cb5c]"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ApplyForGrant() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyForGrantContent />
    </Suspense>
  );
}
