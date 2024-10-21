'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { ConnectButton } from '../../components/Wallets';
import Link from 'next/link';
import { useAccount } from 'wagmi';

interface Deal {
  id: number;
  country: string;
  description: string;
  category: string;
  votes: number;
}

export default function ViewDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  // New state for sorting and filtering
  const [sortBy, setSortBy] = useState('votes');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_EASE_URL}/general/deals`);
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }
      const data = await response.json();
      setDeals(data.data);
    } catch (err) {
      setError('Error fetching deals. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async (id: number) => {
    if (!isConnected) {
      alert('Please connect your wallet to upvote deals.');
      return;
    }

    try {
      const response = await fetch(`/general/deals/${id}/upvote`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to upvote deal');
      }
      fetchDeals();
    } catch (err) {
      console.error(err);
      alert('Failed to upvote deal. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">View Deals</h1>
          <ConnectButton />
        </div>
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors">
          ← Back to Home
        </Link>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white bg-opacity-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="votes">Sort by Votes</option>
              <option value="date">Sort by Date</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white bg-opacity-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Coupon Codes">Coupon Codes</option>
              <option value="Referral Deals">Referral Deals</option>
              <option value="Educational Discounts">Educational Discounts</option>
              <option value="General">General</option>
            </select>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-4 py-2 bg-white bg-opacity-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="Ghana">Ghana</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500 bg-opacity-20 border-l-4 border-blue-500 p-4 rounded-md mb-6"
          >
            <p className="font-bold text-lg mb-2">Connect your wallet to upvote!</p>
            <p>
              You need to connect your wallet to upvote deals. It&apos;s quick, easy, and helps support the best deals!
            </p>
          </motion.div>
        )}
        {isLoading && <p className="text-center text-xl">Loading deals...</p>}
        {error && <p className="text-center text-red-400 text-xl">{error}</p>}
        <AnimatePresence>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {deals.map(deal => (
              <motion.div 
                key={deal.id}
                className="bg-white bg-opacity-10 rounded-xl shadow-lg overflow-hidden backdrop-filter backdrop-blur-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="p-6">
                  <p className="text-sm font-medium text-blue-400 mb-1">{deal.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{deal.country}</h3>
                  <p className="text-gray-300 mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">Votes: {deal.votes}</span>
                    <button
                      onClick={() => handleUpvote(deal.id)}
                      className={`px-4 py-2 rounded-full text-white font-medium transition-colors ${
                        isConnected 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!isConnected}
                    >
                      Upvote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
